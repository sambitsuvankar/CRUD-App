import UserActionTypes from "./user.types"


const INITIAL_STATE = {
    currentUser : null,
    errorMessage: undefined,
    toggleAction : false,
    toogleTextField : false
}
const userReducer = (state= INITIAL_STATE, action)=>{
    switch(action.type){
        case UserActionTypes.SIGN_IN_SUCCESS :
            return{
                ...state,
                currentUser : action.payload
            }
            case UserActionTypes.SIGN_OUT_SUCCESS:
                return{
                    ...state,
                    currentUser: null,
                    errorMessage: null
                }
            case UserActionTypes.SIGN_IN_FAILURE :
            case UserActionTypes.SIGN_OUT_FAILURE:
                return{
                    ...state,
                    errorMessage: action.payload
                }
            case UserActionTypes.TOGGLE_FORM:
                return {
                    ...state,
                    toggleAction : !state.toggleAction
                }
            case UserActionTypes.TEXT_FIELD_TOGGLE: 
                return {
                    ...state,
                    toogleTextField : !state.toogleTextField
                }
        default :
         return state;

    }
}

export default userReducer;