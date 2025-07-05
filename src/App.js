import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import ChatRoom from './components/ChatRoom';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="app-root">
      <div className="app-header">
        <h1 className="app-title">RainChat</h1>
        {user ? <SignOut className="app-btn" /> : <SignIn className="app-btn" />}
      </div>
      <div>
        {user ? <ChatRoom /> : (
          <div className="signin-info">
            <p>Sign in to join the chat and start messaging!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;