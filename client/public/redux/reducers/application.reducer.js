'use strict';

import { applicationDetailsConstants } from "../constants";

export const INITIAL_APPLICATION_STATE = {
  applicationDetails: {},
  pageName:"",
};

export function application(state = INITIAL_APPLICATION_STATE, action) {
  switch (action.type) {
    case applicationDetailsConstants.APPLICATION_DETAILS_GET_SUCCESS:
      const { name, payload } = action.payload;
        return {
          ...state,
          applicationDetails:{
              ...state.applicationDetails,
              [name]: payload
          }
        };
    case applicationDetailsConstants.APPLICATION_SET_PAGE_NAME:
      return {
        ...state,
        pageName: action.payload,
      };
          
  }
  return state;
}
