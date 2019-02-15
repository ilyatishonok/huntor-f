import { AuthActionTypes } from '../enums/auth';

export interface AuthenticateUserAction {
    type: AuthActionTypes.AUTHENTICATE_USER;
    payload: {
        token: string;
        refreshToken: string;
    };
};

export interface SetRefreshTokenPromiseAction {
    type: AuthActionTypes.SET_REFRESH_PROMISE;
    payload: Promise<void>;
};

export interface RemoveRefreshTokenPromise {
    type: AuthActionTypes.REMOVE_REFRESH_PROMISE;
}

export type AuthActions = AuthenticateUserAction | SetRefreshTokenPromiseAction | RemoveRefreshTokenPromise;

export const setRefreshTokenPromise = (refreshTokenPromise: Promise<void>) => ({
    type: AuthActionTypes.SET_REFRESH_PROMISE,
    payload: refreshTokenPromise,
});

export const removeRefreshTokenPromise = () => ({
    type: AuthActionTypes.REMOVE_REFRESH_PROMISE,
});

export const authenticateUser = (token: string, refreshToken: string): AuthenticateUserAction => ({
    type: AuthActionTypes.AUTHENTICATE_USER,
    payload: {
        token,
        refreshToken,
    },
});