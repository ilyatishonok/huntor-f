import { combineReducers, Reducer } from 'redux';
import { Action } from 'redux';
import { History } from 'history';
import { reducer as formReducer, FormState } from 'redux-form';
import { connectRouter, RouterState } from 'connected-react-router';
import tutorsReducer from './tutors';
import authReducer from './auth';
import subjectsReducer from './subjects';
import educationReducer from './education';
import appReducer from './app';
import userReducer from './user';
import { TutorsState } from '../store/types/tutors';
import { SubjectsState } from '../store/types/subjects';
import { UserState } from '../store/types/user';
import { AuthState } from '../store/types/auth';
import { AppState } from '../store/types/app';
import { EducationsState } from '../store/types/education';

export interface RootState {
    app: AppState;
    router: RouterState;
    form: FormState;
    auth: AuthState;
    tutors: TutorsState;
    subjects: SubjectsState;
    user: UserState,
    educations: EducationsState,
}

export const createAllReducers = (history: History) => combineReducers({
    app: appReducer,
    router: connectRouter(history),
    form: formReducer,
    auth: authReducer,
    tutors: tutorsReducer,
    subjects: subjectsReducer,
    educations: educationReducer,
    user: userReducer,
});

export const createRootReducer = (allReducers: Reducer) => {
    return (state: RootState, action: {
        type: string;
    }) => {
        return action.type === 'RESET_APP'
            ? allReducers({ router: state.router }, action)
            : allReducers(state, action);
    }
}