import {
    UserState,
    UserActionTypes,
    SetUserAction
} from '../store/types/user';

export const setUser = (user: UserState): SetUserAction => ({
    type: UserActionTypes.SET_USER,
    payload: user,
});