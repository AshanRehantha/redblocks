import { applicationDetailsConstants } from "../constants";

export const applicationDetailsRequest = payload => {
    return {
      type: applicationDetailsConstants.APPLICATION_DETAILS_GET_REQUEST,
      payload,
    };
  };
  
  export const applicationDetailsSuccess = (name, payload) => {
    return {
      type: applicationDetailsConstants.APPLICATION_DETAILS_GET_SUCCESS,
      payload: { name, payload },
    };
  }

  export const applicationSetCSRFTokenRequest = () => {
    return {
      type: applicationDetailsConstants.APPLICATION_GET_CSRF_TOKEN_REQUEST,
    };
  };
  
  export const applicationSetCSRFTokenSuccess = () => {
    return {
      type: applicationDetailsConstants.APPLICATION_GET_CSRF_TOKEN_SUCCESS,
    };
  }

  export const applicationSetPagName = (name) => {
    return {
      type: applicationDetailsConstants.APPLICATION_SET_PAGE_NAME,
      payload: name,
    };
  }