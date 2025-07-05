const ChatMessage = ({ msg, isMe }) => (
  <div className={`chat-message-row ${isMe ? 'me' : 'other'}`}>
    {!isMe && (
      <img src={msg.photoURL} alt="avatar" className="chat-bubble-avatar" />
    )}
    <div className={`chat-bubble ${isMe ? 'me' : 'other'}`}>
      <div className="chat-bubble-name">{msg.displayName || 'User'}</div>
      <div>{msg.text}</div>
      <div className="chat-bubble-time">
        {msg.createdAt?.seconds
          ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString()
          : '...'}
        {isMe && (
          <span style={{ marginLeft: 8, fontSize: 10, color: msg.read ? '#42a5f5' : '#aaa' }}>
            {msg.read ? '✓ Telah dibaca' : '✓ Terkirim'}
          </span>
        )}
      </div>
    </div>
    {isMe && (
      <img src={msg.photoURL} alt="avatar" className="chat-bubble-avatar" />
    )}
  </div>
);

export default ChatMessage;