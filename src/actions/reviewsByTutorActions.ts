import { ThunkAction } from "redux-thunk";
import axios, { AxiosResponse } from "axios";
import { batchActions, BatchAction } from 'redux-batched-actions';
import { normalize } from 'normalizr';
import { ReviewsByTutorActionTypes } from "../enums/reviewsByTutor";
import { RootState } from "../reducers";
import { setRequestStatus } from "./requestsActions";
import { ReviewEntity } from "../reducers/entities/reviewEntity";
import { reviewsListSchema } from "../schemas/review";
import { mergeEntites } from "./entitiesActions";

export interface FetchReviewsByTutorSuccessAction {
    type: ReviewsByTutorActionTypes.FETCH_REVIEWS_SUCCESS;
    payload: {
        tutorId: string;
        reviews: string[];
        lastUpdate: Date;
    };
}

export interface FetchReviewsByTutorRequestAction {
    type: ReviewsByTutorActionTypes.FETCH_REVIEWS_REQUEST;
    payload: {
        tutorId: string;
    };
}

export interface FetchReviewsByTutorFailureAction {
    type: ReviewsByTutorActionTypes.FETCH_REVIEWS_FAILURE;
    payload: {
        tutorId: string;
        error: string;
    }
}

export type ReviewsByTutorActions = FetchReviewsByTutorRequestAction
    | FetchReviewsByTutorSuccessAction
    | FetchReviewsByTutorFailureAction;

export interface FetchReviewsResponse {
    success: boolean;
    message?: string;
    reviews: ReviewEntity[];
}

export const fetchReviewsByTutorRequest = (tutorId: string): FetchReviewsByTutorRequestAction => ({
    type: ReviewsByTutorActionTypes.FETCH_REVIEWS_REQUEST,
    payload: {
        tutorId,
    },
});

export const fetchReviewsByTutorSuccess = (
    tutorId: string,
    reviews: string[],
    timeStamp: Date,
): FetchReviewsByTutorSuccessAction => ({
    type: ReviewsByTutorActionTypes.FETCH_REVIEWS_SUCCESS,
    payload: {
        tutorId,
        reviews,
        lastUpdate: timeStamp,
    },
});

export const fetchReviewsByTutorFailure = (
    tutorId: string,
    error: string,
): FetchReviewsByTutorFailureAction => ({
    type: ReviewsByTutorActionTypes.FETCH_REVIEWS_FAILURE,
    payload: {
        tutorId,
        error,
    }
});

export const fetchReviewsByTutor = (tutorId: string): ThunkAction<void, RootState, void, BatchAction> => {
    return async (dispatch) => {
        batchActions([
            fetchReviewsByTutorRequest(tutorId),
            setRequestStatus(`${tutorId}/REVIEWS`, true),
        ]);

        try {
            const response: AxiosResponse<FetchReviewsResponse> = await axios.get(`/api/tutor/reviews/${tutorId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });

            const normalizedData = normalize(response.data.reviews, reviewsListSchema);

            dispatch(batchActions([
                mergeEntites(normalizedData.entities),
                fetchReviewsByTutorSuccess(tutorId, normalizedData.result, new Date()),
                setRequestStatus(`${tutorId}/REVIEWS`, false),
            ]));
        } catch(err) {
            dispatch(batchActions([
                fetchReviewsByTutorFailure(tutorId, 'Failed to load reviews'),
                setRequestStatus(`${tutorId}/REVIEWS`, false),
            ]));
        }
    }
}