import { CalendarBookingActionTypes } from '../enums/calendarBooking';
import { CalendarBookingActions } from '../actions/calendarBookingActions';

export interface ListedBooking {
    _id: string;
    startDate: string;
    endDate: string;
    status: string;
}

export interface CalendarBookingState {
    [key: string]: CalendarBookingByTutorId;
}

const initialDate = new Date();

initialDate.setHours(12);
initialDate.setMinutes(0);
initialDate.setSeconds(0);
initialDate.setMilliseconds(0);

export interface CalendarBookingByTutorId {
    items: ListedBooking[];
    error: string;
    didInvalidate: boolean;
    selectedDate: Date;
}

const initialCalendarBookingByTutorIdState = {
    items: [],
    error: '',
    didInvalidate: true,
    selectedDate: initialDate,
}

const selectedDate = (state: Date = initialDate, action: CalendarBookingActions) => {
    switch (action.type) {
        case CalendarBookingActionTypes.SELECT_DATE:
            return action.payload.selectedDate;
        default:
            return state;
    }
}

const calendarBookingByTutorId = (
    state: CalendarBookingByTutorId = initialCalendarBookingByTutorIdState,
    action: CalendarBookingActions
) => {
    switch (action.type) {
        case CalendarBookingActionTypes.FETCH_SELECTED_DAY_BOOKINGS:
            return { ...state, error: '', didInvalidate: false };
        case CalendarBookingActionTypes.FETCH_SELECTED_DAY_BOOKINGS_SUCCESS:
            return { ...state, items: action.payload.items };
        case CalendarBookingActionTypes.SELECT_DATE:
            return { ...state, didInvalidate: true, selectedDate: selectedDate(state.selectedDate, action)};
        case CalendarBookingActionTypes.CLEAR_DATA:
            return initialCalendarBookingByTutorIdState;
        case CalendarBookingActionTypes.CREATE_BOOKING:
            return { ...state, items: [...state.items, action.payload.booking]};
        default:
            return state;
    }
}

const calendarBookingReducer = (state: CalendarBookingState = {}, action: CalendarBookingActions) => {
    switch (action.type) {
        case CalendarBookingActionTypes.SELECT_DATE:
        case CalendarBookingActionTypes.FETCH_SELECTED_DAY_BOOKINGS:
        case CalendarBookingActionTypes.FETCH_SELECTED_DAY_BOOKINGS_SUCCESS:
        case CalendarBookingActionTypes.CREATE_BOOKING:
            const { tutorId } = action.payload;
            return { ...state, [tutorId]: calendarBookingByTutorId(state[tutorId], action) };
        default:
            return state;

    }
}

export default calendarBookingReducer;