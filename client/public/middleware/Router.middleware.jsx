import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { isUserLoggin } from '../helper/auth.helper';
import { useSelector } from 'react-redux';
import { Container, Sidebar, Sidenav, Content, Nav, DOMHelper } from 'rsuite';


const RouterMiddleware = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [pageName, setPageName] = useState(null);

  const isAuth = isUserLoggin();

  return isAuth ? (
    <React.Fragment>
      <Container className="frame">
      <div className="dashboard-layout">
        <div className="main-layout">
          <div className={'child-layout'}>
            <Outlet />
          </div>
          </div>
      </div>
      </Container>
    </React.Fragment>
  ) : (
    <Navigate to="/login" />
  );
};

export default RouterMiddleware;
