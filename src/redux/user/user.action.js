import UserActionTypes from "./user.types";


export const googleSigninStart = () => ({
    type : UserActionTypes.GOOGLE_SIGN_IN_START
});

export const emailSigninStart = (emailAndPassword)=> ({
    type : UserActionTypes.EMAIL_SIGN_IN_START,
    payload : emailAndPassword
});

export const signInSuccess = (user) => ({
    type : UserActionTypes.SIGN_IN_SUCCESS,
    payload : user
});

export const signInFailure = (errorMessage) => ({
    type : UserActionTypes.SIGN_IN_FAILURE,
    payload : errorMessage
});

export const signOutSuccess = () => ({
    type : UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = () => ({
    type : UserActionTypes.SIGN_OUT_FAILURE
})

export const toggleForm = () => ({
    type: UserActionTypes.TOGGLE_FORM
})

export const toogleTextField = () =>({
    type : UserActionTypes.TEXT_FIELD_TOGGLE
})