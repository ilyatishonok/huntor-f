import { RequestsActionTypes } from '../enums/requests';
import { RequestsActions } from '../actions/requestsActions';

export interface RequestsState {
    [key: string]: boolean;
}

const requestsReducer = (state: RequestsState = {}, action: RequestsActions) => {
    switch (action.type) {
        case RequestsActionTypes.SET_REQUEST_STATUS:
            const { status, requestType } = action.payload;

            return { ...state, [requestType]: status };
        default:
            return state;
    }
}

export default requestsReducer;