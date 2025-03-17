"use strict";

import { frontEndSuccessMessages, successMessagesList } from "../actions";
import { commonConstants } from "../constants";


const messageMiddleware = (store) => (next) => (action) => {

    if (
        (action.type === commonConstants.SYSTEM_ERROR) &&
        action.payload != null
    ) {
        let response = action.payload;

        store.dispatch({
            type: commonConstants.SHOW_ERROR_SERVER_MESSAGE,
            payload: response?.message,
            statusCode:response?.status
        });
 
    }

    if (successMessagesList.includes(action.type)) {
        store.dispatch({
            type: commonConstants.AJAX_SUCCESS,
            payload: frontEndSuccessMessages[action.type],
        });
    }

    next(action);
};

export { messageMiddleware };