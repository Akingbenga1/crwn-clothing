import {useContext, useState} from "react";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

import "./sign-in-form.styles.scss";
import {
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import {emailSignInStart, googleSignInStart} from "../../store/user/user.action";
import {useDispatch} from "react-redux";


const SignInForm = () =>
{
    const dispatch = useDispatch();
    const defaultFormFields =   {
                                email: '',
                                password: '',
                             };

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password}  = formFields;

    console.log("formFields ===> ",  formFields);
    const resetFormFields = () =>
    {
        setFormFields(defaultFormFields);
    }

    // const signInWithGoogle = async () =>
    // {
    //     const { user } =  await  signInWithGooglePopup();
    //     // await  createUserDocumentFromAuth(user);
    // }

    const signInWithGoogle = async () =>
    {
        try
        {
            dispatch(googleSignInStart());
            resetFormFields();
        }
        catch(e)
        {
            console.log("User sign in failed", e);
        }
    }

    const handleChange  = (event ) =>
    {
                const  {name, value} =  event.target;

                setFormFields({...formFields, [name] : value});
    };

    const handleSubmit  = async (event ) =>
    {
        event.preventDefault();

        // try
        // {
        //     const response = await signInAuthUserWithEmailAndPassword(email,password);
        //     console.log(response);
        //     // setCurrentUser(response.user);
        //     resetFormFields();
        // }
        // catch(error)
        // {
        //     console.log(error);
        //     switch(error.code)
        //     {
        //         case 'auth/wrong-password':
        //             alert('incorrect password for email');
        //             break;
        //         case 'auth/user-not-found':
        //             alert('no user associated with this email.');
        //             break;
        //         default:
        //             console.log(error);
        //     }
        // }


        // try
        // {
        //     dispatch(emailSignInStart(email, password));
        //     resetFormFields()
        // }
        // catch(e)
        // {
        //     console.log("User sign in failed", e);
        // }
    };

    return (
        <div className="sign-up-container">
            <h2> Already have an account? </h2>
            <span> Sign in with your email and password.</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Email"
                    type='email'
                    onChange={handleChange}
                    name='email'
                    value={email}
                     required />

                <FormInput
                    label="Password"
                    type='password'
                    onChange={handleChange}
                    name='password'
                    value={password}
                    required />


                    <div className='buttons-container'>
                        <Button type='submit' > Sign In </Button>
                        <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle} > Google Sign In </Button>
                    </div>

            </form>

        </div>
    )
}

export default SignInForm;