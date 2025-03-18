import React, { useEffect } from 'react';
import { TabPane, Tab } from 'semantic-ui-react'
import CreateNewEmployee from './Forms/CreateNewEmployee';
import CreateTasks from './CreateTasks';
import Analytics from './Analytics';
import UserList from './UserList';
import { useDispatch, useSelector } from 'react-redux';
import { userGetDetailsRequest } from '../../redux/actions';
import UserAnalytics from './UserAnalytice';

const DashBoardWrapper = () => {

    const dispatch = useDispatch();

    const {  usersDetails } = useSelector((state) => {
        return {
            usersDetails: state?.user?.usersDetails
        };
      });

      console.log('usersDetails', usersDetails);
      

        useEffect(() => {
            dispatch(userGetDetailsRequest({}))
        }, [dispatch]);


    const adminPanes = [
        { menuItem: 'Analytics', render: () => <TabPane><Analytics/></TabPane> },
        { menuItem: 'Employees', render: () => <TabPane><CreateNewEmployee/></TabPane> },
        { menuItem: 'Employees List', render: () => <TabPane><UserList/></TabPane> },
        { menuItem: 'Create Task', render: () => <TabPane><CreateTasks/></TabPane> },
      ];
    const userPens = [
        { menuItem: 'My Tasks', render: () => <TabPane><UserAnalytics/></TabPane> },
    ]  
      
  return (
    <React.Fragment>
        <div className='ui container fluid'>
        <Tab panes={usersDetails?.userType === 1 ? adminPanes : userPens} />
        </div>
    </React.Fragment>
  )
}

export default DashBoardWrapper
