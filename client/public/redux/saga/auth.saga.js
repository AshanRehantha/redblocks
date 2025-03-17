import { put, call, takeEvery } from 'redux-saga/effects';
import { authConstants, cookieConstants } from '../constants';
import { authChangePasswordSuccess, authEmailVerifySuccess, authRegisterSuccess, authUpdatePasswordFirstTimeSuccess, loginAuthError, loginAuthSuccess } from '../actions/auth.actions';
import { systemError } from '../actions/common.action';
import { ServiceCallBase } from '../api/service.api';
import { serviceEndPoint } from '../api/service.endpoint';
import Cookies from "js-cookie";
import { userGetPermissionModuleGetRequest, userGetPermissionModuleGetSuccess } from '../actions/user.actions';


function* Login(action) {
  try {
    const { navigate, ...payload } = action.payload;

    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.login, action.payload);

    if (response && response.data) {

      yield put(loginAuthSuccess({}));
      
      yield call(UserModulePermissionGet, { payload: {
            "pageName":"dashboard",
            "action":"view"
      } });

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

function* Register(action) {
  try {
    const { onClosed, ...payload } = action.payload;

    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.register, payload);

    if (response) {
      yield put(authRegisterSuccess({}));
      onClosed();
    }

  } catch (error) {
    yield put(systemError(error));
  }
}

function* EmailVerify(action) {
  try {
    const { navigate,  ...payload } = action.payload;

    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.verifyEmail, payload);

    if (response) {
      yield put(authEmailVerifySuccess({}));
      if(Cookies.get(cookieConstants.USER_DETAILS_COOKIE)){
        navigate('/app/dashboard')
      } else {
        navigate('/')
      }
    }

  } catch (error) {
    yield put(systemError(error));
  }
}

function* UpdatePasswordFirstTime(action) {
  try {
    const { onClosed,  ...payload } = action.payload;

    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.changePasswordFirstTime, payload);

    if (response) {
      yield put(authUpdatePasswordFirstTimeSuccess({}));
      onClosed();
    }

  } catch (error) {
    yield put(systemError(error));
  }
}

function* UserModulePermissionGet(action) {
  try {
    const { ...payload } = action.payload;

    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.userGetModulePermission, payload);

    if (response) {
      yield put(userGetPermissionModuleGetSuccess(
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
  yield takeEvery(authConstants.AUTH_REGISTER_REQUEST, Register);
  yield takeEvery(authConstants.AUTH_EMAIL_VERIFY_REQUEST, EmailVerify);
  yield takeEvery(authConstants.UPDATE_PASSWORD_FIRST_TIME_REQUEST, UpdatePasswordFirstTime);
}
