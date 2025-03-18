import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    DropdownMenu,
    DropdownItem,
    MenuMenu,
    MenuItem,
    Button,
    Dropdown,
    Menu,
    Icon,
    Image
  } from 'semantic-ui-react'

import { useNavigate } from 'react-router-dom';
import { logOutRequest } from '../redux/actions';

const DashboardTopNavMenu = (props) => {
  const { isOpen, displayName  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState('home');

  const { user } = useSelector((state) => {
    return {
        user: state.user,
    };
  });

  const loginOut = () => {
    dispatch(logOutRequest({navigate}))
  }
  
  return (
    <React.Fragment>
        <Menu size='mini'>
        <MenuMenu position='left'>
        <MenuItem className={`${isOpen ? 'child-layout-toggle' : 'child-layout'} no-border-menu`}>
        </MenuItem>
        </MenuMenu>
            <MenuMenu position='right'>
              <MenuItem>
              <span className='profile-pic'>
                <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' avatar />
              </span>
              {`Welcome back ${user?.usersDetails?.firstName} ${user?.usersDetails?.lastName}`} 
              </MenuItem>
              <MenuItem>
                <Button negative icon onClick={() => {loginOut()}}>
                  <Icon name='log out' /> Logout
                </Button>
              </MenuItem>
            </MenuMenu>
        </Menu>
    </React.Fragment>
  )
}

export default DashboardTopNavMenu
