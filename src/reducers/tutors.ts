import { TutorsActionTypes } from "../enums/tutors";
import { TutorsActions } from "../actions/tutorsActions";

export interface TutorsState {
    items: string[];
    error: string;
    didInvalidate: boolean;
}

const initialState = {
    items: [],
    error: '',
    didInvalidate: false,
};

const tutorsReducer = (state: TutorsState = initialState, action: TutorsActions) => {
    switch (action.type) {
        case TutorsActionTypes.FETCH_TUTORS_REQUEST:
            return { ...state, didInvalidate: false, error: '' };
        
        case TutorsActionTypes.FETCH_TUTORS_SUCCESS:
            return { ...state, items: action.payload.tutors };
        
        case TutorsActionTypes.FETCH_TUTORS_FAILURE:
            return { ...state, error: action.payload };

        default:
            return state;
    }
}

export default tutorsReducer;