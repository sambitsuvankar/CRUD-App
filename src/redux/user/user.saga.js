import { takeLatest , put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

import { signInSuccess, signInFailure, signOutSuccess, signOutFailure } from './user.action'



export function* signInWithGoogle(){
    try{
        const { user } = yield auth.signInWithPopup(googleProvider );     
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
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle )   
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

export function* userSaga(){
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignOutStart),
    ])
}