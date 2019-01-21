import { Action } from 'redux';
import { AuthState } from '../store/types/auth';

const initialState = {
    token: localStorage.getItem('token') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
}

const authReducer = (state: AuthState = initialState, action: Action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default authReducer;