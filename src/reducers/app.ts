import { AppState } from '../store/types/app';
import { Action } from 'redux';

const initialState = {
    isAppLoaded: !localStorage.getItem('token'),
}

const appReducer = (state: AppState = initialState, action: Action) => {
    switch (action.type) {
        case 'LOAD_APP':
            return { ...state, isAppLoaded: true };

        default:
            return state;
    }
}

export default appReducer;
