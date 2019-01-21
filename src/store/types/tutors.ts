export enum TutorsActionTypes {
    FETCH_TUTORS_REQUEST = 'FETCH_TURORS_REQUEST',
    FETCH_TUTORS_REQUEST_SUCCESS = 'FETCH_TUTORS_REQUEST_SUCCESS',
    FETCH_TUTORS_REQUEST_FAILURE = 'FETCH_TUTORS_REQUEST_FAILURE',
}

export interface ITutor {
    id: string;
    firstname: string;
    lasname: string;
    prices: string;
    subjects: string[];
    description: string;
}

export interface TutorsState {
    data: ITutor[];
    isFetching: boolean;
    error: string;
    page: number;
}

export interface FetchTutorsRequestAction {
    type: TutorsActionTypes.FETCH_TUTORS_REQUEST;
}

export interface FetchTutorsRequestSuccessAction {
    type: TutorsActionTypes.FETCH_TUTORS_REQUEST_SUCCESS;
    payload: ITutor[];
}

export interface FetchTutorsRequestFailureAction {
    type: TutorsActionTypes.FETCH_TUTORS_REQUEST_FAILURE;
    payload: string;
}

export type TutorsActions = FetchTutorsRequestAction | FetchTutorsRequestSuccessAction | FetchTutorsRequestFailureAction;