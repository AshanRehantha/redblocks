'use strict';

import { userConstants } from "../constants";

export const userGetModuleRequest = payload => {
  return {
    type: userConstants.USER_GET_MODULES_REQUEST,
    payload,
  };
};

export const userGetModuleSuccess = payload => {
  return {
    type: userConstants.USER_GET_MODULES_SUCCESS,
    payload,
  };
};


export const userCreateRequest = payload => {
  return {
    type: userConstants.USER_CREATE_REQUEST,
    payload,
  };
};

export const userCreateSuccess = payload => {
  return {
    type: userConstants.USER_CREATE_SUCCESS,
    payload,
  };
};

export const userGetAnalyticsRequest = payload => {
  return {
    type: userConstants.USER_GET_ANALYTICS_REQUEST,
    payload,
  };
};

export const userGetAnalyticsSuccess = payload => {
  return {
    type: userConstants.USER_GET_ANALYTICS_SUCCESS,
    payload,
  };
};

export const userGetEmployeeListRequest = payload => {
  return {
    type: userConstants.USER_GET_EMPLOYEE_REQUEST,
    payload,
  };
};

export const userGetEmployeeListSuccess = payload => {
  return {
    type: userConstants.USER_GET_EMPLOYEE_SUCCESS,
    payload,
  };
};

export const userDeleteEmployeeRequest = payload => {
  return {
    type: userConstants.USER_DELETE_EMPLOYEE_REQUEST,
    payload,
  };
};

export const userDeleteEmployeeSuccess = payload => {
  return {
    type: userConstants.USER_DELETE_EMPLOYEE_SUCCESS,
    payload,
  };
};

export const userCreateTasksRequest = payload => {
  return {
    type: userConstants.USER_CREATE_TASKS_REQUEST,
    payload,
  };
};

export const userCreateTasksSuccess = payload => {
  return {
    type: userConstants.USER_CREATE_TASKS_SUCCESS,
    payload,
  };
};


export const userGetDetailsRequest = payload => {
  return {
    type: userConstants.USERS_GET_DETAILS_REQUEST,
    payload,
  };
};

export const usersGetDetailsSuccess = payload => {
  return {
    type: userConstants.USERS_GET_DETAILS_SUCCESS,
    payload,
  };
};

export const userGetUserTaskListRequest = payload => {
  return {
    type: userConstants.USERS_GET_USER_TASK_LIST_REQUEST,
    payload,
  };
};

export const userGetUserTaskListSuccess = payload => {
  return {
    type: userConstants.USERS_GET_USER_TASK_LIST_SUCCESS,
    payload,
  };
};

export const userTaskUpdateRequest = payload => {
  return {
    type: userConstants.USERS_TASK_UPDATE_REQUEST,
    payload,
  };
};

export const userTaskUpdateSuccess = payload => {
  return {
    type: userConstants.USERS_TASK_UPDATE_SUCCESS,
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

