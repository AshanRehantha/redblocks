import { put, call, takeEvery } from 'redux-saga/effects';
import { ServiceCallBase } from '../api/service.api';
import { applicationServiceEndPoints } from '../api/service.endpoint';
import { applicationDetailsConstants } from '../constants';
import { applicationDetailsSuccess, systemError } from '../actions';


function* ApplicationDetailsGet(action) {
   try {
      const { ...payload } = action.payload;
  
      const response = yield call(ServiceCallBase.postApi, applicationServiceEndPoints.getAppDetails, payload);
  
      if (response) {
        yield put(applicationDetailsSuccess(payload?.name, response.data));
      }
  
    } catch (error) {
      yield put(systemError(error));
    }
}

function* ApplicationGetCSRFToken() {
  try {

    const response = yield call(ServiceCallBase.getApi, applicationServiceEndPoints.getCSRFToken);

    if (response) {
      yield put(applicationDetailsSuccess());
    }

  } catch (error) {
    yield put(systemError(error));
  }
}


export function* ApplicationSaga() {
   yield takeEvery(applicationDetailsConstants.APPLICATION_DETAILS_GET_REQUEST, ApplicationDetailsGet);
   yield takeEvery(applicationDetailsConstants.APPLICATION_GET_CSRF_TOKEN_REQUEST, ApplicationGetCSRFToken);
}
