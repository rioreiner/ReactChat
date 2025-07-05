import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const SignIn = ({ className }) => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={signInWithGoogle} className={className ? className : "app-btn"}>
      Sign in with Google
    </button>
  );
};

export default SignIn;