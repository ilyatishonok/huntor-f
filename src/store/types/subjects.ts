export enum SubjectsActionTypes {
    FETCH_SUBJECTS_REQUEST = 'FETCH_SUBJECTS_REQUEST',
    FETCH_SUBJECTS_REQUEST_SUCCESS = 'FETCH_SUBJECTS_REQUEST_SUCCESS',
    FETCH_SUBJECTS_REQUEST_FAILURE = 'FETCH_SUBJECTS_REQUEST_FAILURE',
}

export interface SubjectsState {
    isFetching: boolean;
    error: string;
    data: ISubject[];
}

export interface ISubject {
    title: string;
}

export interface FetchSubjectsRequestAction {
    type: SubjectsActionTypes.FETCH_SUBJECTS_REQUEST;
}

export interface FetchSubjectsRequestSuccessAction {
    type: SubjectsActionTypes.FETCH_SUBJECTS_REQUEST_SUCCESS;
    payload: ISubject[];
}

export interface FetchSubjectsRequestFailureAction {
    type: SubjectsActionTypes.FETCH_SUBJECTS_REQUEST_FAILURE;
    payload: string;
}

export type SubjectsActions = FetchSubjectsRequestAction | FetchSubjectsRequestSuccessAction | FetchSubjectsRequestFailureAction;