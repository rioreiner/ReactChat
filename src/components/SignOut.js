import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const SignOut = ({ className }) => {
  return (
    auth.currentUser && (
      <button
        onClick={() => signOut(auth)}
        className={className ? className : "app-btn"}
        style={{ background: 'linear-gradient(90deg, #42a5f5 60%,rgb(204, 102, 222) 100%)' }}
      >
        Sign Out
      </button>
    )
  );
};

export default SignOut;