import { takeLatest , put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';
import { auth,  createUserProfileDocument, getCurrentUser, signInWithGoogle } from '../../firebase/firebase.utils';

import { signInSuccess, signInFailure, signOutSuccess, signOutFailure } from './user.action'



export function* googleSignin(){
    try{
        const { user } = yield signInWithGoogle();     
        console.log(user)
        
        const userRef = yield call(createUserProfileDocument,user)      
        const userSnapShot = yield userRef.get();                       
        console.log('I done')
        console.log(userSnapShot)
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }))               

    }catch(error){
        yield put(signInFailure(error))
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, googleSignin )   
};

// Email sign in Process
export function* signInWithEmail({payload: {email,password}}){
    try{
        console.log("hi sign in")
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        console.log(user)
        const userRef = yield call(createUserProfileDocument, user);   
        const userSnapShot = yield userRef.get();
        console.log(userSnapShot)
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }))

    }catch(error){
        yield put(signInFailure(error.message))
    }
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)      
}

export function* signOut(){
    try{
        yield auth.signOut();
        yield put(signOutSuccess())
    }catch(error){
        yield put(signOutFailure(error))
    }
}

export function* onSignOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut )
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();          // The 'getCurrentUser()' function from 'firebase.utils' return the 'userAuth' Object.

        if(!userAuth) return;    // if the 'userAuth' object is null that means user signed out then it will immidiately return.

        const userRef = yield call(createUserProfileDocument,userAuth);       // But if the 'userAuth' exists then it will save as the current user.
        const userSnapShot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }))
    }catch(error){
        yield put(signInFailure(error));
    }
}


export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* userSaga(){
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignOutStart),
    ])
}