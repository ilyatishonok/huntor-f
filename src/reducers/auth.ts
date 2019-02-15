import { AuthActionTypes } from '../enums/auth';
import { AuthActions } from '../actions/authActions';

export interface AuthState {
    token: string;
    refreshToken: string;
    refreshTokenPromise?: Promise<void> | null;
}

const initialState = {
    token: localStorage.getItem('token') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
}

const authReducer = (state: AuthState = initialState, action: AuthActions) => {
    switch (action.type) {
        case AuthActionTypes.AUTHENTICATE_USER:
            return { ...state, token: action.payload.token, refreshToken: action.payload.refreshToken };
        case AuthActionTypes.SET_REFRESH_PROMISE:
            return { ...state, refreshTokenPromise: action.payload };
        case AuthActionTypes.REMOVE_REFRESH_PROMISE:
            return { ...state, refreshTokenPromise: null };
        default:
            return state;
    }
}

export default authReducer;