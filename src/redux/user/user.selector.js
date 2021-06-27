import { createSelector } from "reselect";


const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
)

export const selectToggleAction = createSelector(
    [selectUser],
    user => user.toggleAction
) 

export const selectToogleTextField = createSelector(
    [selectUser],
    user => user.toogleTextField
)