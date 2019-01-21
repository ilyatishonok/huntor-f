import { Action } from 'redux';
import { UserState, UserActions, UserActionTypes } from '../store/types/user';

const initialState = {
    id: 'asd',
    role: 'student',
    email: '',
    isAdmin: false,
    firstname: '',
    lastname: '',
};

const authReducer = (state: UserState = initialState, action: UserActions) => {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            return { ...state, ...action.payload };

        default:
            return state;
    }
}

export default authReducer;