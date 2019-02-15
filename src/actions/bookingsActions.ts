import { ThunkAction } from "redux-thunk";
import axios, { AxiosResponse } from "axios";
import { normalize  } from 'normalizr';
import { bookingListSchema } from '../schemas/booking';
import { BookingsActionTypes } from "../enums/bookings";
import { RootState } from "../reducers";
import { mergeEntites, MergeEntitiesAction } from "./entitiesActions";
import { BookingEntity } from "../reducers/entities/bookingEntity";

export interface FetchBookingsRequestAction {
    type: BookingsActionTypes.FETCH_BOOKINGS_REQUEST;
}

export interface FetchBookingsSuccessAction {
    type: BookingsActionTypes.FETCH_BOOKINGS_SUCCESS;
    payload: string[];
}

export interface FetchBookingsFailureAction {
    type: BookingsActionTypes.FETCH_BOOKINGS_FAILURE;
    payload: string;
}

export interface ChangeTabAction {
    type: BookingsActionTypes.CHANGE_TAB;
    payload: string;
}

export interface FetchBookingResponse {
    success: boolean;
    message?: string;
    bookings: BookingEntity;
}

export type BookingsActions = FetchBookingsRequestAction
    | FetchBookingsSuccessAction
    | FetchBookingsFailureAction
    | ChangeTabAction;

export const fetchBookingsRequest = (): FetchBookingsRequestAction => ({
    type: BookingsActionTypes.FETCH_BOOKINGS_REQUEST,
});

export const fetchBookingsSuccess = (bookingsIds: string[]): FetchBookingsSuccessAction => ({
    type: BookingsActionTypes.FETCH_BOOKINGS_SUCCESS,
    payload: bookingsIds,
});

export const fetchBookingsFailure = (error: string): FetchBookingsFailureAction => ({
    type: BookingsActionTypes.FETCH_BOOKINGS_FAILURE,
    payload: error,
});

export const changeTab = (tab: string): ChangeTabAction => ({
    type: BookingsActionTypes.CHANGE_TAB,
    payload: tab,
});

export const fetchBookings = (): ThunkAction<void, RootState, void, BookingsActions | MergeEntitiesAction> => {
    return async (dispatch, getState) => {
        const currentTab = 'abc';
        
        dispatch(fetchBookingsRequest());

        const response: AxiosResponse<FetchBookingResponse> = await axios.get('/api/book/', {
            params: {
                filter: currentTab,
                page: 1,
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });

        const normalizedData = normalize(response.data.bookings, bookingListSchema);

        dispatch(mergeEntites(normalizedData.entities));
        dispatch(fetchBookingsSuccess(normalizedData.result));
    }
}