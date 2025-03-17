'use strict';

import { application } from './application.reducer';
import { auth } from './auth.reducer';
import { dashboard } from './dashboard.reducer';
import { hrApproval } from './hrApproval.reducer';
import { loadingSpinnerReducer } from './loading.reducer';
import { errorMessageReducer, successMessageReducer } from './message.reducer';
import { user } from './user.reducer';

export default {
  auth,
  user,
  loading:loadingSpinnerReducer,
  errorMessage: errorMessageReducer,
  successMessage: successMessageReducer,
  dashboard: dashboard,
  application: application,
  hrApproval: hrApproval,
};
