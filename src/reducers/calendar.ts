import { combineReducers } from 'redux';
import moment from 'moment';
import { CalendarActionTypes, FilterTypes } from '../enums/calendar';
import { CalendarActions } from '../actions/calendarActions';

interface Bookings {
    items: string[];
    error: string;
    didInvalidate: boolean;
}

export interface BookingsByMonthState {
    [key: string]: Bookings;
}

export interface FiltersState {
    [key: string]: boolean;
}

export interface SelectedBookingState {
    booking: string;
}

export interface CalendarState {
    selectedDate: Date | null;
    selectedBooking: SelectedBookingState;
    currentMonth: Date;
    filters: FiltersState;
    bookingsByMonth: BookingsByMonthState;
}

const initialBooking = {
    items: [],
    didInvalidate: false,
    error: '',
}

const initialFilters = {
    [FilterTypes.SHOW_COMPLETED]: true,
    [FilterTypes.SHOW_IN_PROCESS]: true,
    [FilterTypes.SHOW_MOVING_REQUESTS]: true,
    [FilterTypes.SHOW_PENDING]: true,
}

const startOfCurrentMonth = moment(new Date()).startOf('month').toDate();

const selectedBookingInitialState = {
    booking: '',
}

const booking = (state: Bookings = initialBooking, action: CalendarActions) => {
    switch (action.type) {
        case CalendarActionTypes.FETCH_CALENDAR_BOOKINGS_REQUEST:
            return { ...state, didInvalidate: false, error: '' };
        case CalendarActionTypes.FETCH_CALENDAR_BOOKINGS_SUCCESS:
            return { ...state, items: action.payload.bookings };
        case CalendarActionTypes.FETCH_CALENDAR_BOOKINGS_FAILURE:
            return { ...state, error: action.payload.error };
        default:
            return state;
    }
}

const bookingsByMonth = (state: BookingsByMonthState = {}, action: CalendarActions) => {
    switch (action.type) {
        case CalendarActionTypes.FETCH_CALENDAR_BOOKINGS_REQUEST:
        case CalendarActionTypes.FETCH_CALENDAR_BOOKINGS_SUCCESS:
        case CalendarActionTypes.FETCH_CALENDAR_BOOKINGS_FAILURE:
            const time = action.payload.month.getTime();

            return {
                ...state,
                [time]: booking(state[time], action),
            };
        default:
            return state;
    }
}

const selectedDate = (state: Date | null = null, action: CalendarActions) => {
    switch (action.type) {
        case CalendarActionTypes.CHANGE_SELECTED_DATE:
            return action.payload.selectedDate;
        default:
            return state;
    }
}

const currentMonth = (state: Date = startOfCurrentMonth, action: CalendarActions) => {
    switch (action.type) {
        case CalendarActionTypes.CHANGE_MONTH:
            return action.payload.month;
        default:
            return state;
    }
}

const filters = (state: FiltersState = initialFilters, action: CalendarActions) => {
    switch (action.type) {
        case CalendarActionTypes.ADD_FILTER:
            return { ...state, [action.payload.filter]: true };
        case CalendarActionTypes.REMOVE_FILTER:
            return { ...state, [action.payload.filter]: false };
        default:
            return state;
    }
}

const selectedBooking = (state: SelectedBookingState = selectedBookingInitialState, action: CalendarActions) => {
    switch (action.type) {
        case CalendarActionTypes.CHANGE_SELECTED_DATE:
            return selectedBookingInitialState;
        case CalendarActionTypes.SELECT_BOOKING:
            return { ...state, booking: action.payload.booking };
        default:
            return state;
    }
}

export default combineReducers({
    selectedDate,
    bookingsByMonth,
    selectedBooking,
    filters,
    currentMonth,
});