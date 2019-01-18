import { ICourse, CoursesState, CoursesActions, CoursesActionTypes } from '../store/types/courses';

const initialState = {
    data: [],
    isFetching: false,
    error: '',
    page: 0,
};

const coursesReducer = (state: CoursesState = initialState, action: CoursesActions) => {
    switch (action.type) {
        case CoursesActionTypes.FETCH_COURSES_REQUEST:
            return { ...state, isFetching: true, error: '', page: 0 };
        
        case CoursesActionTypes.FETCH_COURSES_REQUEST_SUCCESS:
            return { ...state, isFetching: false, data: action.payload };
        
        case CoursesActionTypes.FETCH_COURSES_REQUEST_FAILURE:
            return { ...state, isFetching: false, error: action.payload };

        default:
            return state;
    }
}

export default coursesReducer;