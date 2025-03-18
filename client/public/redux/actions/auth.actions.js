'use strict';

import { authConstants } from '../constants';

export const loginAuthRequest = payload => {
  return {
    type: authConstants.AUTH_LOGIN_REQUEST,
    payload,
  };
};

export const loginAuthSuccess = payload => {
  return {
    type: authConstants.AUTH_LOGIN_SUCCESS,
    payload,
  };
};

export const loginAuthError = payload => {
  return {
    type: authConstants.AUTH_LOGIN_ERROR,
    payload,
  };
};

export const logOutRequest = payload => {
  return {
    type: authConstants.AUTH_LOGOUT_REQUEST,
    payload,
  };
};

export const logOutSuccess = payload => {
  return {
    type: authConstants.AUTH_LOGOUT_SUCCESS,
    payload,
  };
};


