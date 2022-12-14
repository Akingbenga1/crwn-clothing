import {useContext, useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

import "./sign-up.styles.scss";
import {UserContext} from "../../contexts/user.context";
import {useDispatch} from "react-redux";
import {signUpStart} from "../../store/user/user.action";


const SignUpForm = () =>
{
    const defaultFormFields =   {
                                displayName: '',
                                email: '',
                                password: '',
                                confirmPassword: '',
                             };

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword}  = formFields;
    const dispatch  = useDispatch();

    console.log(formFields);
    const resetFormFields = () =>
    {
        setFormFields(defaultFormFields);
    }

    const handleChange  = (event ) =>
    {
                const  {name, value} =  event.target;

                setFormFields({...formFields, [name] : value});
    };

    // const handleSubmit  = async (event ) =>
    // {
    //     event.preventDefault();
    //
    //     if(password !== confirmPassword )
    //     {
    //         alert("Password do not match");
    //         return;
    //     }
    //
    //     try
    //     {
    //         const {user} =  await createAuthUserWithEmailAndPassword(email, password);
    //         console.log(user);
    //
    //
    //
    //         await createUserDocumentFromAuth(user, {displayName })
    //
    //         resetFormFields();
    //     }
    //     catch(error)
    //     {
    //         console.log(error);
    //
    //         if(error.code === "auth/already-in-use")
    //         {
    //            alert("Cannot create user, email already in use.");
    //         }
    //         else
    //         {
    //             console.log("User creation encountered an error ");
    //         }
    //     }
    //
    //
    // };

    const handleSubmit  = async (event ) =>
    {
        event.preventDefault();

        if(password !== confirmPassword )
        {
            alert("Password do not match");
            return;
        }

        try
        {
            dispatch(signUpStart(email, password, displayName ))
            resetFormFields();
        }
        catch(error)
        {
            console.log(error);

            if(error.code === "auth/already-in-use")
            {
               alert("Cannot create user, email already in use.");
            }
            else
            {
                console.log("User creation encountered an error ");
            }
        }


    };

    return (
        <div className="sign-up-container">
            <h2> Don't have an account? </h2>
            <span> Sign up with your email and password.</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type='text'
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}
                    required />

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

                <FormInput
                    label="Confirm Password"
                    type='password'
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                    required />
                <Button type='submit' >
                    Sign Up
                </Button>
                <Button buttonType={BUTTON_TYPE_CLASSES.google} type='submit' >
                    Sign Up with Google
                </Button>
            </form>

        </div>
    )
}

export default SignUpForm;