import { CalendarActionTypes } from '../enums/calendar';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { normalize } from 'normalizr';
import axios, { AxiosResponse } from 'axios';
import { BatchAction, batchActions } from 'redux-batched-actions';
import { setRequestStatus } from './requestsActions';
import { BookingEntity } from '../reducers/entities/bookingEntity';
import { bookingListSchema } from '../schemas/booking';
import { mergeEntites } from './entitiesActions';
import getMonthInterval from '../utils/getMonthInterval';

export interface FetchCalendarBookingsResponse {
    success: boolean;
    bookings: BookingEntity[],
    message?: string;
}

export interface FetchCalendarBookingsRequestAction {
    type: CalendarActionTypes.FETCH_CALENDAR_BOOKINGS_REQUEST;
    payload: {
        month: Date;
    }
}

export interface FetchCalendarBookingsSuccessAction {
    type: CalendarActionTypes.FETCH_CALENDAR_BOOKINGS_SUCCESS;
    payload: {
        month: Date;
        bookings: string[];
    };
}

export interface FetchCalendarBookingsFailureAction {
    type: CalendarActionTypes.FETCH_CALENDAR_BOOKINGS_FAILURE;
    payload: {
        month: Date;
        error: string;
    };
}

export interface ChangeSelectedDateAction {
    type: CalendarActionTypes.CHANGE_SELECTED_DATE;
    payload: {
        selectedDate: Date;
    };
}

export interface AddFilterAction {
    type: CalendarActionTypes.ADD_FILTER;
    payload: {
        filter: string;
    };
}

export interface RemoveFilterAction {
    type: CalendarActionTypes.REMOVE_FILTER;
    payload: {
        filter: string;
    };
}

export interface SelectBookingAction {
    type: CalendarActionTypes.SELECT_BOOKING;
    payload: {
        booking: string,
    },
}

export type CalendarActions = FetchCalendarBookingsRequestAction
    | FetchCalendarBookingsSuccessAction
    | FetchCalendarBookingsFailureAction
    | ChangeSelectedDateAction
    | ChangeMonthAction
    | AddFilterAction
    | RemoveFilterAction
    | SelectBookingAction;

export const fetchCalendarBookingsRequest = (month: Date): FetchCalendarBookingsRequestAction => ({
    type: CalendarActionTypes.FETCH_CALENDAR_BOOKINGS_REQUEST,
    payload: {
        month,
    },
});

export const fetchCalendarBookingsSuccess = (month: Date, bookings: string[]): FetchCalendarBookingsSuccessAction => ({
    type: CalendarActionTypes.FETCH_CALENDAR_BOOKINGS_SUCCESS,
    payload: {
        month,
        bookings,
    },
});

export const fetchCalendarBookingsFailure = (month: Date, error: string): FetchCalendarBookingsFailureAction => ({
    type: CalendarActionTypes.FETCH_CALENDAR_BOOKINGS_FAILURE,
    payload: {
        month,
        error,
    },
});

export const changeSelectedDate = (selectedDate: Date): ChangeSelectedDateAction => ({
    type: CalendarActionTypes.CHANGE_SELECTED_DATE,
    payload: {
        selectedDate,
    },
})

export const shouldFetchCalendarBookings = (state: RootState) => {
    const month = state.calendar.currentMonth;
    const bookingsByMonth = state.calendar.bookingsByMonth[month.getTime()];
    const isFetching = state.requests[`${month.getTime()}/CALENDAR`];

    if (!bookingsByMonth) {
        return true;
    } else if (isFetching) {
        return false;
    } else {
        return bookingsByMonth.didInvalidate;
    }
}

export const fetchCalendarBookings = (
    month: Date,
): ThunkAction<void, RootState, void, BatchAction> => {
    return async (dispatch) => {
        dispatch(batchActions([
            fetchCalendarBookingsRequest(month),
            setRequestStatus(`${month.getTime()}/CALENDAR`, true),
        ]));

        const monthInterval = getMonthInterval(month);

        try {
            const response: AxiosResponse<FetchCalendarBookingsResponse> = await axios.get('/api/book/my', {
                params: {
                    startDate: monthInterval.startDate,
                    endDate: monthInterval.endDate,
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const normalizedData = normalize(response.data.bookings, bookingListSchema);

            dispatch(batchActions([
                mergeEntites(normalizedData.entities),
                fetchCalendarBookingsSuccess(month, normalizedData.result),
                setRequestStatus(`${month.getTime()}/CALENDAR`, false),
            ]));
        } catch(err) {
            dispatch(batchActions([
                fetchCalendarBookingsFailure(month, 'Failed to fetch bookings'),
                setRequestStatus(`${month.getTime()}/CALENDAR`, false),
            ]));
        }
    }
}

export const fetchCalendarBookingsIfNeeded = (): ThunkAction<void, RootState, void, CalendarActions> => {
    return async (dispatch, getState) => {
        if (shouldFetchCalendarBookings(getState())) {
            dispatch(fetchCalendarBookings(getState().calendar.currentMonth));
        }
    }
}

export const selectDay = (date: Date): ThunkAction<void, RootState, void, CalendarActions> => {
    return (dispatch) => {
        dispatch(changeSelectedDate(date));
    }
}

export interface ChangeMonthAction {
    type: CalendarActionTypes.CHANGE_MONTH;
    payload: {
        month: Date;
    };
}

export const changeMonthAction = (month: Date): ChangeMonthAction => {
    return {
        type: CalendarActionTypes.CHANGE_MONTH,
        payload: {
            month,
        },
    }
}

export const changeMonth = (month: Date): ThunkAction<void, RootState, void, CalendarActions> => {
    return async (dispatch) => {
        dispatch(changeMonthAction(month));
        dispatch(fetchCalendarBookingsIfNeeded());
    }
}

export const addFilter = (filter: string): AddFilterAction => ({
    type: CalendarActionTypes.ADD_FILTER,
    payload: {
        filter,
    },
});

export const removeFilter = (filter: string): RemoveFilterAction => ({
    type: CalendarActionTypes.REMOVE_FILTER,
    payload: {
        filter,
    },
});

export const selectBooking = (booking: string): SelectBookingAction => ({
    type: CalendarActionTypes.SELECT_BOOKING,
    payload: {
        booking,
    },
})