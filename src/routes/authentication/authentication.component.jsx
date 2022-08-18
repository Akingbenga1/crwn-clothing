import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import './authentication.styles.scss'

function Authentication() {
  return (
      <div className='authentication-container'>
          <h1> Sign in Page  </h1>
          <SignInForm />
          <SignUpForm />
      </div>

  );
}

export default Authentication;
