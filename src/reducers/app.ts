import { AppActionTypes } from '../enums/app';
import { AppActions } from '../actions/appActions';

export interface AppState {
    isAppLoaded: boolean; 
}

const initialState = {
    isAppLoaded: !localStorage.getItem('token'),
}

const appReducer = (state: AppState = initialState, action: AppActions) => {
    switch (action.type) {
        case AppActionTypes.SET_APP_STATE:
            return { ...state, isAppLoaded: action.payload };

        default:
            return state;
    }
}

export default appReducer;
