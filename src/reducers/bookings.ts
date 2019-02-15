import { BookingsActionTypes } from '../enums/bookings';
import { BookingsActions } from '../actions/bookingsActions';

export interface BookingsState {
    items: string[];
    tab: string;
    isFetching: boolean;
    error: string;
    didInvalidate: boolean;
}

const initialState = {
    items: [],
    tab: '',
    isFetching: false,
    error: '',
    didInvalidate: false,
}

const bookingsReducer = (state: BookingsState = initialState, action: BookingsActions) => {
    switch (action.type) {
        case BookingsActionTypes.FETCH_BOOKINGS_REQUEST:
            return { ...state, isFetching: true, error: '', didInvalidate: false };
        case BookingsActionTypes.FETCH_BOOKINGS_SUCCESS:
            return { ...state, isFetching: false, items: action.payload };
        case BookingsActionTypes.FETCH_BOOKINGS_FAILURE:
            return { ...state, isFetching: false, error: action.payload };
        default:
            return state;
    }
}

export default bookingsReducer;