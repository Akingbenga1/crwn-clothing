import {
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInWithGoogleRedirect
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";


function SignIn() {
    const logGoogleUser = async () =>
    {
        const { user } =  await  signInWithGooglePopup();
        const UserDocRef  =  await  createUserDocumentFromAuth(user);
        console.log(UserDocRef);
    }

    const logGoogleRedirectUser = async () =>
    {
        const { user } =  await  signInWithGoogleRedirect();
        // const UserDocRef  =  await  createUserDocumentFromAuth(user);
        console.log(user);
    }

  return (
      <div>
          <h1>Sign in Page  </h1>
          <button onClick={logGoogleUser}>
              Sign in with  Google Popup
          </button>
          <SignUpForm />
      </div>

  );
}

export default SignIn;
