import {TutorsState, TutorsActions, TutorsActionTypes } from '../store/types/tutors';

const initialState = {
    data: [],
    isFetching: false,
    error: '',
    page: 0,
};

const coursesReducer = (state: TutorsState = initialState, action: TutorsActions) => {
    switch (action.type) {
        case TutorsActionTypes.FETCH_TUTORS_REQUEST:
            return { ...state, isFetching: true, error: '', page: 0 };
        
        case TutorsActionTypes.FETCH_TUTORS_REQUEST_SUCCESS:
            return { ...state, isFetching: false, data: action.payload };
        
        case TutorsActionTypes.FETCH_TUTORS_REQUEST_FAILURE:
            return { ...state, isFetching: false, error: action.payload };

        default:
            return state;
    }
}

export default coursesReducer;