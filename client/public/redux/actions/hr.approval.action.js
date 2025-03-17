import { hrApprovalConstants } from "../constants";


export const hrApprovalGetApprovalLeaveListRequest = (payload) => {
    return {
      type: hrApprovalConstants.HR_APPROVAL_GET_APPROVAL_LEAVE_LIST_REQUEST,
      payload,
    };
  };
  
  export const hrApprovalGetApprovalLeaveListSuccess = (payload) => {
    return {
      type: hrApprovalConstants.HR_APPROVAL_GET_APPROVAL_LEAVE_LIST_SUCCESS,
      payload: payload,
    };
  }

  export const hrApprovalGetLeaveByIdRequest = (payload) => {
    return {
      type: hrApprovalConstants.HR_APPROVAL_GET_LEAVE_BY_ID_REQUEST,
      payload,
    };
  };
  
  export const hrApprovalGetLeaveByIdSuccess = (payload) => {
    return {
      type: hrApprovalConstants.HR_APPROVAL_GET_LEAVE_BY_ID_SUCCESS,
      payload: payload,
    };
  }

  export const hrApprovalLeaveApprovalRequest = (payload) => {
    return {
      type: hrApprovalConstants.HR_APPROVAL_LEAVE_APPROVAL_REQUEST,
      payload,
    };
  };
  
  export const hrApprovalLeaveApprovalSuccess = (payload) => {
    return {
      type: hrApprovalConstants.HR_APPROVAL_LEAVE_APPROVAL_SUCCESS,
      payload: payload,
    };
  }
