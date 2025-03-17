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

export const authRegisterRequest = (payload) => {
  return {
    type: authConstants.AUTH_REGISTER_REQUEST,
    payload,
  };
};

export const authRegisterSuccess = payload => {
  return {
    type: authConstants.AUTH_REGISTER_SUCCESS,
    payload,
  };
};

export const authEmailVerifyRequest = (payload) => {
  return {
    type: authConstants.AUTH_EMAIL_VERIFY_REQUEST,
    payload,
  };
};

export const authEmailVerifySuccess = (payload) => {
  return {
    type: authConstants.AUTH_EMAIL_VERIFY_SUCCESS,
    payload,
  };
};

export const authUpdatePasswordRequest = (payload) => {
  return {
    type: authConstants.AUTH_EMAIL_VERIFY_REQUEST,
    payload,
  };
};

export const authUpdatePasswordSuccess = (payload) => {
  return {
    type: authConstants.AUTH_EMAIL_VERIFY_SUCCESS,
    payload,
  };
};

export const authChangePasswordRequest = (payload) => {
  return {
    type: authConstants.AUTH_CHANGE_PASSWORD_REQUEST,
    payload,
  };
};

export const authChangePasswordSuccess = (payload) => {
  return {
    type: authConstants.AUTH_CHANGE_PASSWORD_SUCCESS,
    payload,
  };
};

export const authUpdatePasswordFirstTimeRequest = (payload) => {
  return {
    type: authConstants.UPDATE_PASSWORD_FIRST_TIME_REQUEST,
    payload,
  };
};

export const authUpdatePasswordFirstTimeSuccess = (payload) => {
  return {
    type: authConstants.UPDATE_PASSWORD_FIRST_TIME_SUCCESS,
    payload,
  };
};

