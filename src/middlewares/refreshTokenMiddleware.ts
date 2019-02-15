import { Middleware, MiddlewareAPI, Dispatch, Action } from 'redux';
import jwtDecode from 'jwt-decode';
import axios, { AxiosResponse } from 'axios';
import { RootState } from '../reducers';
import { authenticateUser, setRefreshTokenPromise, removeRefreshTokenPromise } from '../actions/authActions';

export interface TokenData {
    role: string;
    isAdmin: boolean;
    id: string;
    exp: number;
}

export interface RefreshTokenResponse {
    token: string;
    refreshToken: string;
}

const refreshToken = (refreshToken: string, dispatch: Dispatch): Promise<void> => {
    const refreshTokenPromise = axios.post('/api/token/refresh', {
        token: refreshToken,
    }).then((response: AxiosResponse<RefreshTokenResponse>) => {
        dispatch(authenticateUser(response.data.token, response.data.refreshToken));
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        localStorage.setItem('refreshToken', response.data.refreshToken);
        dispatch(removeRefreshTokenPromise());
    }).catch((err) => {
        dispatch(removeRefreshTokenPromise());
        console.log('log out!');
    });

    dispatch(setRefreshTokenPromise(refreshTokenPromise));

    return refreshTokenPromise;
}

const refreshTokenMiddleware: Middleware = ({ getState }: MiddlewareAPI) => (
    next: Dispatch
) => (action)=> {
    if (typeof action === 'function') {
        const state: RootState = getState();

        if (state.auth.token) {
            const tokenExpiration = jwtDecode<TokenData>(state.auth.token).exp;

            if (tokenExpiration < new Date().getTime() / 1000) {
                if (state.auth.refreshTokenPromise) {
                    return state.auth.refreshTokenPromise.then(() => {
                        next(action);
                    })
                } else {
                    return refreshToken(state.auth.refreshToken, next).then(() => next(action));
                }
            }
        }
    }

    next(action);
}

export default refreshTokenMiddleware;
