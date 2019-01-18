import { combineReducers, Reducer } from 'redux';
import { History } from 'history';
import { reducer as formReducer, FormState } from 'redux-form';
import { connectRouter, RouterState, LocationChangeAction } from 'connected-react-router';
import authReducer, { AuthState } from './auth';
import { CoursesState } from '../store/types/courses';
import courserReducer from './courses';

export interface RootState {
    router: RouterState;
    form: FormState;
    auth: AuthState;
    courses: CoursesState;
}

export default (history: History) => combineReducers({
    router: connectRouter(history),
    form: formReducer,
    auth: authReducer,
    courses: courserReducer,
});