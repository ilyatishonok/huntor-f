import { SubjectsState, SubjectsActions, SubjectsActionTypes } from '../store/types/subjects';

const initialState = {
    data: [],
    error: '',
    isFetching: false,
}

const subjectsReducer = (state: SubjectsState = initialState, action: SubjectsActions) => {
    switch (action.type) {
        case SubjectsActionTypes.FETCH_SUBJECTS_REQUEST:
            return { ...state, error: '', isFetching: true };
        
        case SubjectsActionTypes.FETCH_SUBJECTS_REQUEST_SUCCESS:
            return { ...state, isFetching: false, data: action.payload };

        case SubjectsActionTypes.FETCH_SUBJECTS_REQUEST_FAILURE:
            return { ...state, isFetching: false, error: action.payload };

        default:
            return state;
    }
}

export default subjectsReducer;