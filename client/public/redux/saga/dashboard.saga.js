import { put, call, takeEvery } from 'redux-saga/effects';
import { dashBoardConstants } from '../constants';
import { ServiceCallBase } from '../api/service.api';
import { dashboardServiceEndPoint } from '../api/service.endpoint';
import { dashboardGetErrorQuerySuccess, dashboardGetQueryStatusSuccess, dashboardGetSuccessQuerySuccess, dashboardPermissionGetSuccess, systemError } from '../actions';

function* DashboardGetQueryStatus(action) {
   try {
      const { ...payload } = action.payload;
  
      const response = yield call(ServiceCallBase.postApi, dashboardServiceEndPoint.getQueryStatus, payload);
  
      if (response) {
        yield put(dashboardGetQueryStatusSuccess(response.data));
      }
  
    } catch (error) {
      yield put(systemError(error));
    }
}

function* DashboardGetSuccessQuery(action) {
  try {
     const { ...payload } = action.payload;
 
     const response = yield call(ServiceCallBase.postApi, dashboardServiceEndPoint.getSuccessQuery, payload);
 
     if (response) {
       yield put(dashboardGetSuccessQuerySuccess(response.data));
     }
 
   } catch (error) {
     yield put(systemError(error));
   }
}

function* DashboardGetErrorQuery(action) {
  try {
     const { ...payload } = action.payload;
 
     const response = yield call(ServiceCallBase.postApi, dashboardServiceEndPoint.getErrorQuery, payload);
 
     if (response) {
       yield put(dashboardGetErrorQuerySuccess(response.data));
     }
 
   } catch (error) {
     yield put(systemError(error));
   }
}

export function* DashBoardSaga() {
   yield takeEvery(dashBoardConstants.DASHBOARD_GET_QUERY_STATUS_REQUEST, DashboardGetQueryStatus);
   yield takeEvery(dashBoardConstants.DASHBOARD_GET_SUCCESS_QUERY_REQUEST, DashboardGetSuccessQuery);
   yield takeEvery(dashBoardConstants.DASHBOARD_GET_ERROR_QUERY_REQUEST, DashboardGetErrorQuery);
}
