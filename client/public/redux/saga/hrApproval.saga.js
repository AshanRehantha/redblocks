import { put, call, takeEvery } from 'redux-saga/effects';
import { ServiceCallBase } from '../api/service.api';
import { applicationServiceEndPoints, hrApprovalServiceEndPoints } from '../api/service.endpoint';
import { hrApprovalConstants } from '../constants';
import { hrApprovalGetApprovalLeaveListSuccess, hrApprovalGetLeaveByIdSuccess, hrApprovalLeaveApprovalSuccess, systemError } from '../actions';


function* HrApprovalGetApprovalList(action) {
   try {

      const { ...payload } = action.payload;

      const response = yield call(ServiceCallBase.postApi, hrApprovalServiceEndPoints.getLeaveList, payload);
  
      if (response) {
        yield put(hrApprovalGetApprovalLeaveListSuccess(response.data));
      }
  
    } catch (error) {
      yield put(systemError(error));
    }
}

function* HrApprovalGetLeaveById(action) {
  try {

    const { ...payload } = action.payload;

     const response = yield call(ServiceCallBase.postApi, hrApprovalServiceEndPoints.getLeaveById, payload);
 
     if (response) {
       yield put(hrApprovalGetLeaveByIdSuccess(response.data));
     }
 
   } catch (error) {
     yield put(systemError(error));
   }
}

function* HrApprovalLeaveApproval(action) {
  try {

    const { ...payload } = action.payload;

     const response = yield call(ServiceCallBase.postApi, hrApprovalServiceEndPoints.leaveApprove, payload);
 
     if (response) {
       yield put(hrApprovalLeaveApprovalSuccess(response.data));
       
       yield call(HrApprovalGetApprovalList, { payload: {"pageNumber":1}});
     }
 
   } catch (error) {
     yield put(systemError(error));
   }
}


export function* HrApprovals() {
   yield takeEvery(hrApprovalConstants.HR_APPROVAL_GET_APPROVAL_LEAVE_LIST_REQUEST, HrApprovalGetApprovalList);
   yield takeEvery(hrApprovalConstants.HR_APPROVAL_GET_LEAVE_BY_ID_REQUEST, HrApprovalGetLeaveById);
   yield takeEvery(hrApprovalConstants.HR_APPROVAL_LEAVE_APPROVAL_REQUEST, HrApprovalLeaveApproval);
}
