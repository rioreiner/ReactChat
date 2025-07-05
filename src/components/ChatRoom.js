import { useEffect, useState, useRef } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, query, orderBy, serverTimestamp, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [userInteracted, setUserInteracted] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const newMessages = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
      setMessages(newMessages);

      // Play sound on new message jika user sudah interaksi
      if (
        userInteracted &&
        snapshot.docChanges().some(change => change.type === 'added')
      ) {
        const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-3.mp3');
        audio.play();
      }

      // Tandai pesan sebagai telah dibaca jika belum dan bukan pesan sendiri
      for (const msg of newMessages) {
        if (msg.uid !== auth.currentUser.uid && !msg.read) {
          const msgRef = doc(db, 'messages', msg.id);
          await updateDoc(msgRef, { read: true });
        }
      }
    });
    return () => unsubscribe();
  }, [userInteracted]);

  const handleUserInteract = () => {
    if (!userInteracted) setUserInteracted(true);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL, displayName } = auth.currentUser;
    if (input.trim() === '') return;
    setLoading(true);
    await addDoc(collection(db, 'messages'), {
      text: input,
      uid,
      photoURL,
      displayName: displayName || 'Anonymous',
      createdAt: serverTimestamp(),
      read: false // Tambahkan field read
    });
    setInput('');
    setLoading(false);
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    inputRef.current.focus();
  };

  return (
    <div
      style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f4ff 60%, #fce4ec 100%)' }}
      onClick={handleUserInteract}
      onKeyDown={handleUserInteract}
    >
      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">
          <img
            src={auth.currentUser?.photoURL}
            alt="avatar"
          />
          <div className="chat-header-info">
            <span className="chat-header-title">{auth.currentUser?.displayName || 'You'}</span>
            <span className="chat-header-status">
              <span style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                background: '#4caf50',
                borderRadius: '50%',
                marginRight: 6,
                boxShadow: '0 0 4px #4caf50'
              }}></span>
              Online
            </span>
          </div>
          <span className="chat-header-right">RainChat</span>
        </div>
        {/* Chat Area */}
        <div className="chat-messages">
          {messages.map(msg => (
            <ChatMessage key={msg.id} msg={msg} isMe={msg.uid === auth.currentUser.uid} />
          ))}
          <div ref={bottomRef} />
        </div>
        {/* Input Area */}
        <ChatInput
          input={input}
          setInput={setInput}
          loading={loading}
          sendMessage={sendMessage}
          inputRef={inputRef}
          handleUserInteract={handleUserInteract}
        />
      </div>
    </div>
  );
};

export default ChatRoom;