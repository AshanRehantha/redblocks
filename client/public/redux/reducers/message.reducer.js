import { commonConstants } from "../constants";

const INITIAL_SERVER_SUCCESS_MESSAGE_STATE = {
    show: false,
    messages: null,

};

const INITIAL_SERVER_ERROR_MESSAGE_STATE = {
    show: false,
    messages: null,
    statusCodes: null,
    customErrors: [],
    showConfirm: false,
};


export function errorMessageReducer(
    state = INITIAL_SERVER_ERROR_MESSAGE_STATE,
    action,
) {
    switch (action.type) {
        case commonConstants.SHOW_ERROR_SERVER_MESSAGE:
            return {
                ...state,
                show: true,
                messages:action.payload,
                statusCodes:action.statusCode
            }
            // case commonConstants.HIDE_ERROR_CUSTOM_SERVER_MESSAGE:    
            // return {
            //     ...state,
            //     customErrors: [
            //         ...state.customErrors.filter(
            //             (item) => !action.payload.includes(item.statusCode),
            //         ),
            //     ],
            // };
        case commonConstants.HIDE_ERROR_SERVER_MESSAGE:
            return INITIAL_SERVER_ERROR_MESSAGE_STATE;
    }
    return state;
}

export function successMessageReducer(
    state = INITIAL_SERVER_SUCCESS_MESSAGE_STATE,
    action,
) {
    switch (action.type) {
        case commonConstants.AJAX_SUCCESS:
            return {
                show: true,
                messages: action.payload,
                //identity: action.identity,
            };

        case commonConstants.HIDE_AJAX_SUCCESS:
            return INITIAL_SERVER_SUCCESS_MESSAGE_STATE;
    }

    return state;
}