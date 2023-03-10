import { createReducer, on } from "@ngrx/store";
import * as MessagesActions from "./actions";

import { MessageStateInterface } from "../types/messageState.interface";

export const initialState: MessageStateInterface = {
    isLoading: false,
    messages: [],
    error: null,
    isSuccess: false
};

export const reducers = createReducer(
    initialState,
    on(MessagesActions.getMessages, (state) => ({
        ...state, isLoading: true
    })),
    on(MessagesActions.getMessagesSuccess, (state, action) => ({
        ...state,
        isLoading: false,
        messages: action.messages
    })),
    on(MessagesActions.getMessagesFailure, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error
    })),
    on(MessagesActions.addMessage, (state) => ({
        ...state, isLoading: true
    })),
    on(MessagesActions.addMessageSuccess, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true
    })),
    on(MessagesActions.addMessageFailure, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error
    }))
);