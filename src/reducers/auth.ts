import { Action } from 'redux';

export interface AuthState {
    role: string;
}

const initialState = {
    role: 'tutor',
}

const authReducer = (state: AuthState = initialState, action: Action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default authReducer;