'use strict';

import { hrApprovalConstants } from "../constants";

export const INITIAL_STATE = {
  hrApprovalLeaveList: [],
  hrLeaveDetails:{}
};

export function hrApproval(state = INITIAL_STATE, action) {
  switch (action.type) {
    case hrApprovalConstants.HR_APPROVAL_GET_APPROVAL_LEAVE_LIST_SUCCESS:
        return {
            ...state,
            hrApprovalLeaveList:action?.payload,
          };
    case hrApprovalConstants.HR_APPROVAL_GET_LEAVE_BY_ID_SUCCESS:
      return {
        ...state,
        hrLeaveDetails:action?.payload,
      };
  }
  return state;
}