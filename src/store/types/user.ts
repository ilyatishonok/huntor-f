export enum UserActionTypes {
    SET_USER = '@@user/SET_USER',
}

export interface UserState {
    _id: string;
    firstname: string;
    lastname: string;
    email: string
    isAdmin: boolean;
    role: string;
    wallet: {
        value: number;
    }
}

export interface SetUserAction {
    type: UserActionTypes.SET_USER;
    payload: UserState,
}

export type UserActions = SetUserAction;