import { ThunkAction } from 'redux-thunk';
/*import { RootState } from '../reducers';
import { 
    ICourse,
    CoursesActions,
    FetchCoursesRequestAction,
    CoursesActionTypes,
    FetchCourserRequestSuccessAction,
    FetchCourserRequestFailureAction
} from '../store/types/tutors';

export interface FetchCoursesResponse {
    courses: ICourse[],
    success: boolean;
} 

export const fetchCoursesRequest = (): FetchCoursesRequestAction => ({
    type: CoursesActionTypes.FETCH_COURSES_REQUEST,
});

export const fetchCoursesRequestSuccess = (courses: ICourse[]): FetchCourserRequestSuccessAction => ({
    type: CoursesActionTypes.FETCH_COURSES_REQUEST_SUCCESS,
    payload: courses,
});

export const FetchCourserRequestFailure = (error: string): FetchCourserRequestFailureAction => ({
    type: CoursesActionTypes.FETCH_COURSES_REQUEST_FAILURE,
    payload: error,
});

export const fetchCourses = (): ThunkAction<void, RootState, void, CoursesActions> => {
    return (dispatch, getState) => {
        dispatch(fetchCoursesRequest());

        fetch('/api/courses')
            .then(res => res.json())
            .then((response: FetchCoursesResponse) => {
                dispatch(fetchCoursesRequestSuccess(response.courses));
            })
            .catch(err => {
                dispatch(FetchCourserRequestFailure('Error'));
            });
    }
}*/