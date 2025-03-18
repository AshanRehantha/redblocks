import React, { useEffect, lazy, Suspense } from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';

import RouterMiddleware from '../middleware/Router.middleware';

const AuthWrapper = lazy(() => import('../components/Auth/AuthWrapper'));
const DashBoardWrapper = lazy(() => import('../components/DashBoard/DashBoardWrapper'));


const SystemRouters = (props) => {
  useEffect(() => {
    // actionDispatch(hideError());
    // actionDispatch(hideSuccess());
  }, []);

  return (
    <React.Fragment>
    <Suspense fallback={<>Loading</>}>
    <Routes>
        <Route path="/" element={<AuthWrapper/>} />
        <Route path="/login" element={<AuthWrapper/>} />
        <Route path="/app/*" element={<RouterMiddleware {...props} />}>
          <Route path='dashboard' element={<DashBoardWrapper/>} />
        </Route>
      </Routes>
    </Suspense>

    </React.Fragment>
  );
};

export default SystemRouters;
