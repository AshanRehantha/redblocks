import { put, call, takeEvery } from 'redux-saga/effects';
import { userConstants } from '../constants';
import { systemError } from '../actions/common.action';
import { ServiceCallBase } from '../api/service.api';
import { serviceEndPoint } from '../api/service.endpoint';
import { userGetDetailsSuccess, userGetProfileDetailsSuccess, userPermissionGetSuccess } from '../actions/user.actions';


function* getUserDetails(action) {
  try {
   
    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.getUserDetails);

    if (response && response.data) {
      yield put(userGetDetailsSuccess(response.data));
    }

  } catch (error) {
    yield put(systemError(error));
  }
}

function* userGetPermission(action) {
  try {
    const { ...payload } = action.payload;

    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.userGetPermission, payload);

    if (response && response.data) {
      yield put(userPermissionGetSuccess(response.data));
    }

  } catch (error) {
    yield put(systemError(error));
  }
}

function* userGetUser(action) {
  try {
    const { ...payload } = action.payload;

    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.user, payload);

    if (response && response.data) {
      yield put(userGetProfileDetailsSuccess(response.data));
    }

  } catch (error) {

    yield put(systemError(error));
  }
}

export function* UserSaga() {
  yield takeEvery(userConstants.USER_GET_DETAILS_REQUEST, getUserDetails);
  yield takeEvery(userConstants.USER_GET_PERMISSION_REQUEST, userGetPermission);
  yield takeEvery(userConstants.USER_GET_PROFILE_DETAIL_REQUEST, userGetUser);
}
