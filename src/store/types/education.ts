export enum EducationActionTypes {
    FETCH_EDUCATIONS_REQUEST = '@@education/FETCH_EDUCATIONS_REQUEST',
    FETCH_EDUCATIONS_REQUEST_SUCCESS = '@@education/FETCH_EDUCATIONS_REQUEST_SUCCESS',
    FETCH_EDUCATIONS_REQUEST_FAILURE = '@@education/FETCH_EDUCATIONS_REQUEST_FAILURE',
}

export interface EducationsState {
    isFetching: boolean;
    error: string;
    data: IEducation[];
}

export interface IEducation {
    title: string;
    _id: string;
}

export interface FetchEducationsRequestAction {
    type: EducationActionTypes.FETCH_EDUCATIONS_REQUEST;
}

export interface FetchEducationsRequestSuccessAction {
    type: EducationActionTypes.FETCH_EDUCATIONS_REQUEST_SUCCESS;
    payload: IEducation[];
}

export interface FetchEducationsRequestFailureAction {
    type: EducationActionTypes.FETCH_EDUCATIONS_REQUEST_FAILURE;
    payload: string;
}

export type EducationActions = FetchEducationsRequestAction | FetchEducationsRequestSuccessAction | FetchEducationsRequestFailureAction;