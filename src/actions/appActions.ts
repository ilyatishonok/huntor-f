import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../reducers';

export const loadApp = (): ThunkAction<void, RootState, void, Action> => {
    return (dispatch, getState) => {
        
    }
}