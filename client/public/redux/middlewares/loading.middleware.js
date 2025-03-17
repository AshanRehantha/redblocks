"use strict";
import { addPendingActions, removePendingActions } from "../actions";
export const loadingMiddleware = (store) => (next) => (action) => {
    if(typeof action.type != "undefined") {
        let isRequest = action.type.includes("REQUEST");
        let isComplete = action.type.includes("SUCCESS");
        let isError = action.type.includes("ERROR");
        if (isRequest) {
            store.dispatch(addPendingActions(action.type));
        }
        if (isComplete) {
            let actionType = action.type.split("SUCCESS")[0] + "REQUEST";
            store.dispatch(removePendingActions(actionType));
        }
    
        if (isError) {
            let actionType = action.type.split("ERROR")[0] + "REQUEST";
            store.dispatch(removePendingActions(actionType));
        }
    }
    next(action);
}