import { combineReducers, Reducer } from 'redux';
import { History } from 'history';
import { reducer as formReducer, FormState } from 'redux-form';
import { connectRouter, RouterState } from 'connected-react-router';
import educationReducer from './education';
import authReducer, { AuthState } from './auth';
import appReducer, { AppState } from './app';
import calendarBookingReducer, { CalendarBookingState } from './calendarBooking';
import calendarReducer, { CalendarState } from './calendar';
import userReducer from './user';
import { UserState } from '../store/types/user';
import { EducationsState } from '../store/types/education';
import tutorsReducer, { TutorsState } from './tutors';
//import bookingsReducer, { BookingsState } from './bookings';
import entitiesReducer, { EntitiesState } from './entities/entities';
import requestsReducer, { RequestsState } from './requests';

export interface RootState {
    app: AppState;
    router: RouterState;
    form: FormState;
    auth: AuthState;
    tutors: TutorsState;
    user: UserState;
    educations: EducationsState;
    //bookings: BookingsState;
    calendarBooking: CalendarBookingState;
    calendar: CalendarState;
    entities: EntitiesState;
    requests: RequestsState;
}

export const createAllReducers = (history: History) => combineReducers({
    app: appReducer,
    router: connectRouter(history),
    form: formReducer,
    auth: authReducer,
    tutors: tutorsReducer,
    educations: educationReducer,
    user: userReducer,
    calendarBooking: calendarBookingReducer,
    calendar: calendarReducer,
    entities: entitiesReducer,
    requests: requestsReducer,
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