import { ThunkAction } from 'redux-thunk';
import axios, { AxiosResponse } from 'axios';
import { normalize } from 'normalizr';
import { batchActions, BatchAction } from 'redux-batched-actions';
import { RootState } from '../reducers';
import { TutoringEntity } from '../reducers/entities/tutoringEntity';
import { TutorsActionTypes } from '../enums/tutors';
import { setRequestStatus } from './requestsActions';
import { mergeEntites } from './entitiesActions';
import { tutorListSchema, tutorSchema } from '../schemas/tutor';

export interface FetchTutorsResponse {
    tutors: TutoringEntity[];
    success: boolean;
    message?: string;
}

export interface FetchTutorResponse {
    tutor: TutoringEntity;
    success: boolean;
    message?: string;
}

export interface FetchTutorsRequestAction {
    type: TutorsActionTypes.FETCH_TUTORS_REQUEST;
}

export interface FetchTutorsSuccessAction {
    type: TutorsActionTypes.FETCH_TUTORS_SUCCESS;
    payload: {
        tutors: string[],
    };
}

export interface FetchTutorsFailureAction {
    type: TutorsActionTypes.FETCH_TUTORS_FAILURE;
    payload: string;
}

export interface FetchTutorRequestAction {
    type: TutorsActionTypes.FETCH_TUTOR_REQUEST;
}

export interface FetchTutorSuccessAction {
    type: TutorsActionTypes.FETCH_TUTOR_SUCCESS;
    payload: {
        id: string;
    };
}

export interface FetchTutorFailureAction {
    type: TutorsActionTypes.FETCH_TUTOR_FAILURE;
    payload: {
        error: string;
    };
}

export type TutorsActions = FetchTutorsRequestAction 
    | FetchTutorsSuccessAction 
    | FetchTutorsFailureAction
    | FetchTutorRequestAction
    | FetchTutorSuccessAction
    | FetchTutorFailureAction;

export const fetchTutorsRequest = (): FetchTutorsRequestAction => ({
    type: TutorsActionTypes.FETCH_TUTORS_REQUEST,
});

export const fetchTutorsSuccess = (tutors: string[]): FetchTutorsSuccessAction => ({
    type: TutorsActionTypes.FETCH_TUTORS_SUCCESS,
    payload: {
        tutors,
    },
});

export const fetchTutorsFailure = (error: string): FetchTutorsFailureAction => ({
    type: TutorsActionTypes.FETCH_TUTORS_FAILURE,
    payload: error,
});

export const fetchTutorRequest = (): FetchTutorRequestAction => ({
    type: TutorsActionTypes.FETCH_TUTOR_REQUEST,
});

export const fetchTutorSuccess = (id: string): FetchTutorSuccessAction => ({
    type: TutorsActionTypes.FETCH_TUTOR_SUCCESS,
    payload: {
        id,
    },
});

export const fetchTutorFailure = (error: string): FetchTutorFailureAction => ({
    type: TutorsActionTypes.FETCH_TUTOR_FAILURE,
    payload: {
        error,
    },
});

export const fetchTutors = (): ThunkAction<void, RootState, void, BatchAction> => {
    return async (dispatch) => {
        dispatch(batchActions([
            fetchTutorsRequest(),
            setRequestStatus('TUTORS', true),
        ]));

        try {
            const response: AxiosResponse<FetchTutorsResponse> = await axios.get(`/api/tutors`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });


            const normalizedData = normalize(response.data.tutors, tutorListSchema);
            console.log(normalizedData);

            dispatch(batchActions([
                mergeEntites(normalizedData.entities),
                fetchTutorsSuccess(normalizedData.result),
                setRequestStatus('TUTORS', false),
            ]));

        } catch(err) {
            dispatch(batchActions([
                fetchTutorsFailure('Failed to load tutors'),
                setRequestStatus('TUTORS', false),
            ]));
        }
    }
}

export const fetchTutor = (tutorId: string): ThunkAction<void, RootState, void, BatchAction> => {
    return async (dispatch) => {
        try {
            dispatch(batchActions([
                fetchTutorRequest(),
                setRequestStatus(`${tutorId}/TUTOR`, true),
            ]));

            const response: AxiosResponse<FetchTutorResponse> = await axios.get(`/api/tutors/${tutorId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const normalizedData = normalize(response.data.tutor, tutorSchema)

            dispatch(batchActions([
                mergeEntites(normalizedData.entities),
                fetchTutorSuccess(tutorId),
                setRequestStatus(`${tutorId}/TUTOR`, false),
            ]));
        } catch(err) {
        }
    }
}