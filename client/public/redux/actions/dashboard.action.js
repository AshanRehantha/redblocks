'use strict';

import { dashBoardConstants } from '../constants';

  export const dashboardGetQueryStatusRequest = payload => {
    return {
      type: dashBoardConstants.DASHBOARD_GET_QUERY_STATUS_REQUEST,
      payload,
    };
  };
  
  export const dashboardGetQueryStatusSuccess = payload => {
    return {
      type: dashBoardConstants.DASHBOARD_GET_QUERY_STATUS_SUCCESS,
      payload,
    };
  };

  export const dashboardGetSuccessQueryRequest = payload => {
    return {
      type: dashBoardConstants.DASHBOARD_GET_SUCCESS_QUERY_REQUEST,
      payload,
    };
  };
  
  export const dashboardGetSuccessQuerySuccess = payload => {
    return {
      type: dashBoardConstants.DASHBOARD_GET_SUCCESS_QUERY_SUCCESS,
      payload,
    };
  };

  export const dashboardGetErrorQueryRequest = payload => {
    return {
      type: dashBoardConstants.DASHBOARD_GET_ERROR_QUERY_REQUEST,
      payload,
    };
  };
  
  export const dashboardGetErrorQuerySuccess = payload => {
    return {
      type: dashBoardConstants.DASHBOARD_GET_ERROR_QUERY_SUCCESS,
      payload,
    };
  };