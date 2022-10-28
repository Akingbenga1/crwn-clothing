
import {createContext, useEffect, useReducer, useState} from "react";
import {createUserDocumentFromAuth, onAuthStateChangeListener, signOutUser} from "../utils/firebase/firebase.utils";
import {createAction} from "../utils/reducer/reducer.util";

export const UserContext = createContext({
currentUser: null,
setCurrentUser: () => null
});

export const USER_ACTION_TYPES =  {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
} ;

const userReducer =  (state, action) =>
{
    // console.log("dispatched");
    // console.log("catgoeryReducer  action", action);
    const {type, payload} = action;

    switch(type)
    {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
            currentUser: payload
        }
        case 'increment':
            return {
                currentUser: payload
            }

        default:
            throw new Error(`Unhandled type ${type} in userReducer `);
    }
}


const INITIAL_STATE =
    {
            currentUser: null
    }


export const UserProvider = ({children}) =>
{
    // const [currentUser, setCurrentUser] = useState(null);

    const [{currentUser}, dispatch ] = useReducer(userReducer, INITIAL_STATE  );

    console.log( "UserProvider currentUser ===> ", currentUser);
    const setCurrentUser  = (user) => {
        dispatch( createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user ));
    }
    const value = {currentUser, setCurrentUser};

    // signOutUser();

    useEffect(() => {
         const unsubscribe =    onAuthStateChangeListener((user) => {
        console.log(user);
        if(user)
        {
            createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
    })

        return unsubscribe;
    }, []);

  return  <UserContext.Provider value={value}> {children} </UserContext.Provider>
}
