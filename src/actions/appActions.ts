import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../reducers';
import { setUser } from '../actions/userActions';
import axios, { AxiosResponse } from 'axios';
import { UserState } from '../store/types/user';
import { AppActionTypes } from '../enums/app';

export interface SetAppStateAction {
    type: AppActionTypes.SET_APP_STATE,
    payload: boolean,
}

export type AppActions = SetAppStateAction;

export const setAppState = (isLoaded: boolean): SetAppStateAction => ({
    type: AppActionTypes.SET_APP_STATE,
    payload: isLoaded,
});

export const loadApp = (): ThunkAction<void, RootState, void, Action> => {
    return (dispatch, getState) => {
        axios.get('/api/user/', {
            headers: {
                'Authorization': `Bearer ${getState().auth.token}`,
            },
        })
            .then((response: AxiosResponse<{
                user: UserState,
            }>) => {
                dispatch(setUser(response.data.user));
                dispatch(setAppState(true));
            })
            .catch(err => {
                console.log(err);
            })
    }
}