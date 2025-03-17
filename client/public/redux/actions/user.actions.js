'use strict';

import { userConstants } from "../constants";

export const userGetDetailsRequest = payload => {
  return {
    type: userConstants.USER_GET_DETAILS_REQUEST,
    payload,
  };
};

export const userGetDetailsSuccess = payload => {
  return {
    type: userConstants.USER_GET_DETAILS_SUCCESS,
    payload,
  };
};

export const userPermissionGetRequest = (payload) => {
  return {
    type: userConstants.USER_GET_PERMISSION_REQUEST,
    payload,
  };
};

export const userPermissionGetSuccess = (payload) => {
  return {
    type: userConstants.USER_GET_PERMISSION_SUCCESS,
    payload,
  };
};

export const userGetPermissionModuleGetRequest = (payload) => {
  return {
    type: userConstants.USER_GET_MODULE_PERMISSION_REQUEST,
    payload,
  };
};

export const userGetPermissionModuleGetSuccess = (payload) => {
  return {
    type: userConstants.USER_GET_MODULE_PERMISSION_SUCCESS,
    payload,
  };
};

export const userGetProfileDetailsRequest = (payload) => {
  return {
    type: userConstants.USER_GET_PROFILE_DETAIL_REQUEST,
    payload,
  };
};

export const userGetProfileDetailsSuccess = (payload) => {
  return {
    type: userConstants.USER_GET_PROFILE_DETAIL_SUCCESS,
    payload,
  };
};

