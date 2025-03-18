import { put, call, takeEvery } from 'redux-saga/effects';
import { authConstants, cookieConstants } from '../constants';
import { authChangePasswordSuccess, authEmailVerifySuccess, authRegisterSuccess, authUpdatePasswordFirstTimeSuccess, loginAuthError, loginAuthSuccess } from '../actions/auth.actions';
import { systemError } from '../actions/common.action';
import { ServiceCallBase } from '../api/service.api';
import { serviceEndPoint } from '../api/service.endpoint';
import Cookies from "js-cookie";
import { userGetModuleSuccess, userGetPermissionModuleGetRequest, userGetPermissionModuleGetSuccess } from '../actions/user.actions';


function* Login(action) {
  try {
    const { navigate, ...payload } = action.payload;

    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.login, action.payload);

    if (response && response.data) {

      yield put(loginAuthSuccess({}));
      
      yield call(getUserModules, { });

      if (navigate) {
        navigate('/app/dashboard');
      }
    }

  } catch (error) {
    yield put(systemError(error));
  }
}

function* LogOut(action) {
  try {
    const { navigate, payload } = action.payload;

    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.logout, payload);

    if (response) {
      yield put(loginAuthSuccess({}));
      localStorage.removeItem('isUserLogin');
      if (navigate) {
        navigate('/');
      }
    }

    if (navigate) {
      navigate('/');
    }

  }
  catch (error) {
    yield put(systemError(error.message));
  }
}

function* getUserModules(action){
  try {

    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.userGetModules);

    if (response) {
      yield put(userGetModuleSuccess(
        response.data
      ));
    }

  } catch (error) {
    yield put(systemError(error));
  }
}


export function* AuthSaga() {
  yield takeEvery(authConstants.AUTH_LOGIN_REQUEST, Login);
  yield takeEvery(authConstants.AUTH_LOGOUT_REQUEST, LogOut);

}
