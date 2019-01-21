import { EducationsState, EducationActions, EducationActionTypes } from '../store/types/education';

const initialState = {
    data: [],
    error: '',
    isFetching: false,
}

const educationReducer = (state: EducationsState = initialState, action: EducationActions) => {
    switch (action.type) {
        case EducationActionTypes.FETCH_EDUCATIONS_REQUEST:
            return { ...state, error: '', isFetching: true };
        
        case EducationActionTypes.FETCH_EDUCATIONS_REQUEST_SUCCESS:
            return { ...state, isFetching: false, data: action.payload };

        case EducationActionTypes.FETCH_EDUCATIONS_REQUEST_FAILURE:
            return { ...state, isFetching: false, error: action.payload };

        default:
            return state;
    }
}

export default educationReducer;