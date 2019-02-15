import { ThunkAction } from 'redux-thunk';
import axios, { AxiosResponse } from 'axios';
import moment from 'moment';
import { CalendarBookingActionTypes } from '../enums/calendarBooking';
import { RootState } from '../reducers';
import { ListedBooking } from '../reducers/calendarBooking';
import { BatchAction, batchActions } from 'redux-batched-actions';
import { setRequestStatus } from './requestsActions';

export interface FetchSelectedDayBookingsAction {
    type: CalendarBookingActionTypes.FETCH_SELECTED_DAY_BOOKINGS;
    payload: {
        tutorId: string;
    };
}

export interface FetchSelectedDayBookingsSuccessAction {
    type: CalendarBookingActionTypes.FETCH_SELECTED_DAY_BOOKINGS_SUCCESS;
    payload: {
        tutorId: string;
        items: ListedBooking[];
    };
};

export interface FetchSelectedDayBookingsFailureAction {
    type: CalendarBookingActionTypes.FETCH_SELECTED_DAY_BOOKINGS_FAILURE;
    payload: {
        tutorId: string;
        error: string;
    }
};

export interface CleaDataAction {
    type: CalendarBookingActionTypes.CLEAR_DATA;
    payload: {
        tutorId: string;
    }
}

export interface SelectDateAction {
    type: CalendarBookingActionTypes.SELECT_DATE;
    payload: {
        selectedDate: Date;
        tutorId: string;
    };
}

export interface CreateBookingAction {
    type: CalendarBookingActionTypes.CREATE_BOOKING;
    payload: {
        booking: ListedBooking;
        tutorId: string;
    };
}

export type CalendarBookingActions = FetchSelectedDayBookingsAction
    | FetchSelectedDayBookingsSuccessAction
    | FetchSelectedDayBookingsFailureAction
    | CleaDataAction
    | SelectDateAction
    | CreateBookingAction;

export interface FetchSelectedDayBookingsResponse {
    success: boolean;
    message?: string;
    bookings: ListedBooking[],
}

export const fetchSelectedDayBookingsRequest = (
    tutorId: string,
): FetchSelectedDayBookingsAction => ({
    type: CalendarBookingActionTypes.FETCH_SELECTED_DAY_BOOKINGS,
    payload: {
        tutorId,
    },
})

export const fetchSelectedDayBookingsSuccess = (
    tutorId: string,
    bookings: ListedBooking[]
): FetchSelectedDayBookingsSuccessAction => ({
    type: CalendarBookingActionTypes.FETCH_SELECTED_DAY_BOOKINGS_SUCCESS,
    payload: {
        tutorId,
        items: bookings,
    },
});

export const fetchSelectedDayBookingsFailure = (
    tutorId: string,
    error: string
): FetchSelectedDayBookingsFailureAction => ({
    type: CalendarBookingActionTypes.FETCH_SELECTED_DAY_BOOKINGS_FAILURE,
    payload: {
        error,
        tutorId,
    },
});

export const clearData = (tutorId: string) => ({
    type: CalendarBookingActionTypes.CLEAR_DATA,
    payload: {
        tutorId,
    },
});

export const selectDate = (tutorId: string, selectedDate: Date): SelectDateAction => ({
    type: CalendarBookingActionTypes.SELECT_DATE,
    payload: {
        selectedDate,
        tutorId,
    }
});

export const createBooking = (tutorId: string, booking: ListedBooking): CreateBookingAction => ({
    type: CalendarBookingActionTypes.CREATE_BOOKING,
    payload: {
        tutorId,
        booking,
    },
});

export const shouldFetchBookings = (state: RootState, tutorId: string) => {
    const isFetching = state.requests[`${tutorId}/CALENDAR_BOOKINGS`];
    const calendarBooking = state.calendarBooking[tutorId];

    if (!calendarBooking) {
        return true;
    }
    else if (isFetching) {
        return false;
    } else {
        return calendarBooking.didInvalidate;
    }
}

export const fetchBookings = (selectedDate: Date, tutorId: string): ThunkAction<void, RootState, void, BatchAction>  => {
    return async (dispatch) => {
        try {
            dispatch(batchActions([
                fetchSelectedDayBookingsRequest(tutorId),
                setRequestStatus(`${tutorId}/CALENDAR_BOOKINGS`, true),
            ]));

            const startOfSelectedDate = moment(selectedDate).startOf('day').toString();

            const response: AxiosResponse<FetchSelectedDayBookingsResponse> = await axios.get(`/api/book/${tutorId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                params: {
                    day: startOfSelectedDate,
                }
            });

            dispatch(batchActions([
                fetchSelectedDayBookingsSuccess(tutorId, response.data.bookings),
                setRequestStatus(`${tutorId}/CALENDAR_BOOKINGS`, false),
            ]));
        } catch (err) {
            dispatch(batchActions([
                fetchSelectedDayBookingsFailure(tutorId, 'Failed to load bookings'),
                setRequestStatus(`${tutorId}/CALENDAR_BOOKINGS`, false),
            ]));
        }
    }
}

export const fetchBookingsIfNeeded = (selectedDate: Date, tutorId: string): ThunkAction<void, RootState, void, CalendarBookingActions>  => {
    return async (dispatch, getState) => {
        if (shouldFetchBookings(getState(), tutorId)) {
            dispatch(fetchBookings(selectedDate, tutorId));
        }
    }
}