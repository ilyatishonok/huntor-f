import { UserState, UserActions, UserActionTypes } from '../store/types/user';

const initialState = {
    _id: '',
    role: '',
    email: '',
    isAdmin: false,
    firstname: '',
    lastname: '',
    wallet: {
        value: 0,
    }
}

const authReducer = (state: UserState = initialState, action: UserActions) => {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            return { ...state, ...action.payload };

        default:
            return state;
    }
}

export default authReducer;