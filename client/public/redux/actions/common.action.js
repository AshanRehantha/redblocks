'use strict';

import { authConstants, commonConstants, userConstants } from "../constants";

export const systemError = payload => {
    return {
      type: commonConstants.SYSTEM_ERROR,
      payload,
    };
  };

export function addPendingActions(payload) {
    return {
        type: commonConstants.PENDING_ACTIONS,
        payload,
    };
}

export function removePendingActions(payload) {
    return {
        type: commonConstants.REMOVE_PENDING_ACTIONS,
        payload,
    };
}

export function hideError(code) {
    return {
        type: commonConstants.HIDE_ERROR_SERVER_MESSAGE,
    };
}

export function hideSuccess(code) {
    return {
        type: commonConstants.HIDE_AJAX_SUCCESS,
    };
}

export const loadingSelectArray = [
    userConstants.USER_GET_DETAILS_REQUEST,
    authConstants.AUTH_REGISTER_REQUEST,
    authConstants.AUTH_EMAIL_VERIFY_REQUEST,
    authConstants.UPDATE_PASSWORD_FIRST_TIME_REQUEST,
    userConstants.USER_GET_PERMISSION_REQUEST
];

export const successMessagesList = [
    authConstants.AUTH_REGISTER_SUCCESS,
    authConstants.AUTH_EMAIL_VERIFY_SUCCESS
];

export const frontEndSuccessMessages = {
    [authConstants.AUTH_REGISTER_SUCCESS]: 'Thanks for signing up',
    [authConstants.AUTH_EMAIL_VERIFY_SUCCESS]: 'Thanks for verify your account'
}
