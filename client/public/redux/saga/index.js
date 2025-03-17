import { all } from 'redux-saga/effects';
import { DashBoardSaga } from './dashboard.saga';
import { AuthSaga } from './auth.saga';
import { UserSaga } from './user.saga';
import { ApplicationSaga } from './application.saga';
import { HrApprovals } from './hrApproval.saga';

export default function* rootSaga() {
  yield all([
    AuthSaga(), 
    UserSaga(), 
    DashBoardSaga(), 
    ApplicationSaga(),
    HrApprovals(),
  ]);
}
