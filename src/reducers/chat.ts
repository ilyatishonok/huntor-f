import { Action } from "redux";

export interface ChatState {
    chatRooms: string[];
    openChatRoom: string;
    messages: {
        [key: string]: {
            items: string[];
            error: string;
        };
    };
}

const chatReducer = (state: ChatState, action: Action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default chatReducer;