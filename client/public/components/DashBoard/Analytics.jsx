import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userGetAnalyticsRequest } from '../../redux/actions';
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Icon,
    Table,
  } from 'semantic-ui-react';
  import moment from 'moment';

const Analytics = () => {
    const dispatch = useDispatch();

    const {  taskList } = useSelector((state) => {
        return {
            taskList: state?.user?.user?.taskList
        };
      });

    useEffect(() => {
        dispatch(userGetAnalyticsRequest({}))
    }, []);

    console.log('taskList', taskList);
    
  return (
    <React.Fragment>
        <h3>Analytics Tasks</h3>
          <Table celled>
            <TableHeader>
            <TableRow>
                <TableHeaderCell>Task Name</TableHeaderCell>
                <TableHeaderCell>Task Description</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Priority</TableHeaderCell>
                <TableHeaderCell>User Name</TableHeaderCell>
                <TableHeaderCell>Due Date</TableHeaderCell>
            </TableRow>
            </TableHeader>
            <TableBody>
            {taskList?.map((list, index) => (
                <TableRow negative={list?.priority?.toLowerCase() === 'high'} positive={list?.priority?.toLowerCase() === 'low'} key={index}>
                    <TableCell>{list?.taskName}</TableCell>
                    <TableCell>{list?.taskDescription}</TableCell>
                    <TableCell>{list?.status}</TableCell>
                    <TableCell>{list?.priority}</TableCell>
                    <TableCell>{`${list?.user[0]?.firstName} ${list?.user[0]?.lastName}`}</TableCell>
                    <TableCell>{moment(list?.DueDate).format('DD/MM/YYYY')}</TableCell>
                </TableRow>
            ))}

            </TableBody>
        </Table>
    </React.Fragment>
  )
}

export default Analytics