'use strict';

import { authConstants } from '../constants';

export const INITIAL_AUTH_STATE = {
  auth: {},
};

export function auth(state = INITIAL_AUTH_STATE, action) {
  switch (action.type) {
    case authConstants.AUTH_LOGIN_REQUEST:
      return {
        ...state,
        auth: {},
      };
    case authConstants.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        auth: action.payload,
      };
    case authConstants.AUTH_LOGIN_ERROR:
      return {
        ...state,
        auth: {},
      };
  }
  return state;
}
