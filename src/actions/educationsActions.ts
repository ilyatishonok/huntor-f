import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import {
    IEducation,
    EducationActions,
    EducationActionTypes,
    FetchEducationsRequestAction,
    FetchEducationsRequestFailureAction,
    FetchEducationsRequestSuccessAction,
} from '../store/types/education';

export interface FetchEducationsResponse {
    educations: IEducation[],
}

export const fetchEducationsRequest = (): FetchEducationsRequestAction => ({
    type: EducationActionTypes.FETCH_EDUCATIONS_REQUEST,
});

export const fetchEducationsRequestSuccess = (educations: IEducation[]): FetchEducationsRequestSuccessAction => ({
    type: EducationActionTypes.FETCH_EDUCATIONS_REQUEST_SUCCESS,
    payload: educations,
});

export const fetchEducationsRequestFailure = (error: string): FetchEducationsRequestFailureAction => ({
    type: EducationActionTypes.FETCH_EDUCATIONS_REQUEST_FAILURE,
    payload: error,
});

export const fetchEducations = (): ThunkAction<void, RootState, void, EducationActions> => {
    return (dispatch) => {
        dispatch(fetchEducationsRequest());

        fetch('/api/educations')
            .then(res => res.json())
            .then((response: FetchEducationsResponse) => {
                dispatch(fetchEducationsRequestSuccess(response.educations));
            })
            .catch(() => {
                dispatch(fetchEducationsRequestFailure('Error fetching educations'));
            });
    }
}