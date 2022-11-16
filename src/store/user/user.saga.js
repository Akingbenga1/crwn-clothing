
import {takeLatest, all, call, put} from 'redux-saga/effects';
import {USER_ACTION_TYPES} from "./user.types";
import {
    createUserDocumentFromAuth,
    getCurrentUser,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import {signInFailed, signInSuccess} from "./user.action";

export function* signInWithGoogle()
{
    try
    {
        const { user } = yield call( signInWithGooglePopup);
        yield call(getSnapShotFromUserAuth, user);
    }
    catch(error)
    {
        yield put(signInFailed(error));
    }
}

export function* signInWithEmail({payload : { email, password}})
{
    try
    {
        const { user } = yield call( signInAuthUserWithEmailAndPassword,
            email,
            password);
        yield call(getSnapShotFromUserAuth, user);
    }
    catch(error)
    {
        yield put(signInFailed(error));
    }
}

export function* getSnapShotFromUserAuth(userAuth, additionalDetails)
{
    try
    {
        const userSnapshot = yield call( createUserDocumentFromAuth, userAuth, additionalDetails);
        console.log("userSnapshot.data()  ====> " , userSnapshot.data());

        let snap = userSnapshot.data();
        yield put(signInSuccess({id: userSnapshot.id, ...snap }))
        console.log("userSnapshot ====> ", userSnapshot);

    }
    catch(error)
    {
        yield put(signInFailed(error));
    }
}

export function* onGoogleSignInStart() {
   yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* isUserAuthenticated() {
    try
    {
        const userAuth =  yield call(getCurrentUser);
        if(!userAuth) return;

        yield call( getSnapShotFromUserAuth, userAuth );
    }
    catch(error)
    {
        yield put(signInFailed(error));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated );
}

export function* userSagas(){
    yield all([
                    call(onCheckUserSession),
                    call(onGoogleSignInStart),
                    call(onEmailSignInStart)
              ]);
}