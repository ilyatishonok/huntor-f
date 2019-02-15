import { RequestsActionTypes } from '../enums/requests';

export interface SetRequestStatusAction {
    type: RequestsActionTypes.SET_REQUEST_STATUS;
    payload: {
        requestType: string;
        status: boolean;
    };
}

export type RequestsActions = SetRequestStatusAction;

export const setRequestStatus = (requestType: string, status: boolean): SetRequestStatusAction => ({
    type: RequestsActionTypes.SET_REQUEST_STATUS,
    payload: {
        requestType,
        status,
    },
});