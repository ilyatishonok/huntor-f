import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import {
    ISubject,
    SubjectsActions,
    SubjectsActionTypes,
    FetchSubjectsRequestAction,
    FetchSubjectsRequestFailureAction,
    FetchSubjectsRequestSuccessAction,
} from '../store/types/subjects';

export interface FetchSubjectsResponse {
    subjects: ISubject[],
}

export const fetchSubjectsRequest = (): FetchSubjectsRequestAction => ({
    type: SubjectsActionTypes.FETCH_SUBJECTS_REQUEST,
});

export const fetchSubjectsRequestSuccess = (subjects: ISubject[]): FetchSubjectsRequestSuccessAction => ({
    type: SubjectsActionTypes.FETCH_SUBJECTS_REQUEST_SUCCESS,
    payload: subjects,
});

export const fetchSubjectsRequestFailure = (error: string): FetchSubjectsRequestFailureAction => ({
    type: SubjectsActionTypes.FETCH_SUBJECTS_REQUEST_FAILURE,
    payload: error,
});

export const fetchSubjects = (): ThunkAction<void, RootState, void, SubjectsActions> => {
    return (dispatch) => {
        dispatch(fetchSubjectsRequest());

        fetch('/api/subjects')
            .then(res => res.json())
            .then((response: FetchSubjectsResponse) => {
                dispatch(fetchSubjectsRequestSuccess(response.subjects));
            })
            .catch(() => {
                dispatch(fetchSubjectsRequestFailure('Error fetching subjects'));
            });
    }
}