import { ReviewsByTutorActionTypes } from "../enums/reviewsByTutor";
import { ReviewsByTutorActions } from "../actions/reviewsByTutorActions";

interface ReviewState {
    error: string;
    didInvalidate: boolean;
    items: string[];
    lastUpdate?: Date;
}

export interface ReviewsByTutorState {
    [key: string]: ReviewState;
}

const initialReviewState = {
    error: '',
    didInvalidate: false,
    items: [],
}

const review = (state: ReviewState = initialReviewState, action: ReviewsByTutorActions) => {
    switch (action.type) {
        case ReviewsByTutorActionTypes.FETCH_REVIEWS_REQUEST:
            return { ...state, error: '', didInvalidate: false };
        case ReviewsByTutorActionTypes.FETCH_REVIEWS_SUCCESS:
            return { ...state, items: action.payload.reviews };
        case ReviewsByTutorActionTypes.FETCH_REVIEWS_FAILURE:
            return { ...state, error: action.payload.error };
    }
}

const reviewsByTutorReducer = (state: ReviewsByTutorState = {}, action: ReviewsByTutorActions) => {
    switch (action.type) {
        case ReviewsByTutorActionTypes.FETCH_REVIEWS_REQUEST:
        case ReviewsByTutorActionTypes.FETCH_REVIEWS_SUCCESS:
        case ReviewsByTutorActionTypes.FETCH_REVIEWS_FAILURE:
            const { tutorId } = action.payload;

            return { ...state, [tutorId]: review(state[tutorId], action) };
        default:
            state;
    }
}

export default reviewsByTutorReducer;