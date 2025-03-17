'use strict';

import { dashBoardConstants } from '../constants';

export const INITIAL_DASHBOARD_STATE = {
  queryStatus: {},
  successQueryList:[],
  errorQueryList:[],
};

export function dashboard(state = INITIAL_DASHBOARD_STATE, action) {
  switch (action.type) {
    case dashBoardConstants.DASHBOARD_GET_QUERY_STATUS_SUCCESS:
      return {
        ...state,
        queryStatus:action.payload,
      };
    case dashBoardConstants.DASHBOARD_GET_SUCCESS_QUERY_SUCCESS:
    return {
        ...state,
        successQueryList:action.payload,
    };
    case dashBoardConstants.DASHBOARD_GET_ERROR_QUERY_SUCCESS:
      return {
          ...state,
          errorQueryList:action.payload,
      };

  }
  return state;
}
