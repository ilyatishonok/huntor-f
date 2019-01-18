export enum CoursesActionTypes {
    FETCH_COURSES_REQUEST = 'FETCH_COURSES_REQUEST',
    FETCH_COURSES_REQUEST_SUCCESS = 'FETCH_COURSES_REQUEST_SUCCESS',
    FETCH_COURSES_REQUEST_FAILURE = 'FETCH_COURSES_REQUEST_FAILURE',
}

export interface ICourse {
    title: string;
    tutor: {
        username: string;
    }
    price: string;
    description: string;
}

export interface CoursesState {
    data: ICourse[];
    isFetching: boolean;
    error: string;
    page: number;
}

export interface FetchCoursesRequestAction {
    type: CoursesActionTypes.FETCH_COURSES_REQUEST;
}

export interface FetchCourserRequestSuccessAction {
    type: CoursesActionTypes.FETCH_COURSES_REQUEST_SUCCESS;
    payload: ICourse[];
}

export interface FetchCourserRequestFailureAction {
    type: CoursesActionTypes.FETCH_COURSES_REQUEST_FAILURE;
    payload: string;
}

export type CoursesActions = FetchCoursesRequestAction | FetchCourserRequestSuccessAction | FetchCourserRequestFailureAction;