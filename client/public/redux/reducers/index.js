'use strict';

import { auth } from './auth.reducer';
import { loadingSpinnerReducer } from './loading.reducer';
import { errorMessageReducer, successMessageReducer } from './message.reducer';
import { user } from './user.reducer';

export default {
  auth,
  user,
  loading:loadingSpinnerReducer,
  errorMessage: errorMessageReducer,
  successMessage: successMessageReducer,
};
