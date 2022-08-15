

import { initializeApp} from 'firebase/app'

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth'


import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAZfHemb6esWXsMBaxfSB9ZGIM_gqTJiOE",
    authDomain: "crown-clothing-db-be1bb.firebaseapp.com",
    projectId: "crown-clothing-db-be1bb",
    storageBucket: "crown-clothing-db-be1bb.appspot.com",
    messagingSenderId: "335561356734",
    appId: "1:335561356734:web:665a8553c6e91ab1a535ef"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleprovider = new GoogleAuthProvider();
googleprovider.setCustomParameters({
    prompt: "select_account"
});


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleprovider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async ( userAuth, additionalDocument = {} ) => {
          if(!userAuth) return;
          const     userDocRef = doc(db, 'users', userAuth.uid );

          console.log(userDocRef);

          const userSnapShot = await getDoc(userDocRef);
          console.log(userSnapShot);

          if(!userSnapShot.exists())
          {
              const {displayName, name, email} = userAuth;
              const createdAt = new Date();

              try
              {
                  await setDoc(userDocRef, {
                      displayName,
                      email,
                      createdAt,
                  ...additionalDocument
                  });

              }
              catch(error)
              {
                  console.log("Error creating the user ". error.message)
              }
          }

          return userDocRef;
     }

export const createAuthUserWithEmailAndPassword = async (email, password) => {

            if(!email || !password) return ;
            return createUserWithEmailAndPassword(auth, email, password );
     }