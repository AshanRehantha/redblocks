import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userGetAnalyticsRequest, userGetUserTaskListRequest, userTaskUpdateRequest } from '../../redux/actions';
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Icon,
    Table,
    Button,

  } from 'semantic-ui-react';
  import moment from 'moment';

  import { Dropdown } from 'semantic-ui-react'

const UserAnalytics = () => {
    const dispatch = useDispatch();
    const [priorityFilter, setPriorityFilter] = useState('');

    const {  taskList } = useSelector((state) => {
        return {
            taskList: state?.user?.userTaskList?.taskList
        };
      });

      const priorityOptions = [
        { key: 'all', text: 'All Priorities', value: '' },
        { key: 'low', text: 'Low', value: 'low' },
        { key: 'high', text: 'High', value: 'high' },
      ];

    useEffect(() => {
        dispatch(userGetUserTaskListRequest({}))
    }, []);

    const handleDeleteClick = (taskId) => {
        dispatch(userTaskUpdateRequest({
            taskId:taskId
        }))
    }

    const handlePriorityChange = (_, { value }) => {
        setPriorityFilter(value);
      };

      const filteredTaskList = priorityFilter
      ? taskList.filter((task) => task.priority.toLowerCase() === priorityFilter.toLowerCase())
      : taskList;

  return (
    <React.Fragment>
        <h3>User analytics tasks</h3>
        <Dropdown clearable options={priorityOptions} selection onChange={handlePriorityChange} />
          <Table celled>
            <TableHeader>
            <TableRow>
                <TableHeaderCell>Task Name</TableHeaderCell>
                <TableHeaderCell>Task Description</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Priority</TableHeaderCell>
                <TableHeaderCell>User Name</TableHeaderCell>
                <TableHeaderCell>Due Date</TableHeaderCell>
                <TableHeaderCell>Action</TableHeaderCell>
            </TableRow>
            </TableHeader>
            {filteredTaskList?.length !== 0 &&
                <TableBody>
            {filteredTaskList?.map?.((list, index) => (
                <TableRow negative={list?.priority?.toLowerCase() === 'high'} positive={list?.priority?.toLowerCase() === 'low'} key={index}>
                    <TableCell>{list?.taskName}</TableCell>
                    <TableCell>{list?.taskDescription}</TableCell>
                    <TableCell>{list?.status}</TableCell>
                    <TableCell>{list?.priority}</TableCell>
                    <TableCell>{`${list?.user[0]?.firstName} ${list?.user[0]?.lastName}`}</TableCell>
                    <TableCell>{moment(list?.DueDate).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>
                    {list?.status !== "done" &&
                        <Button color="blue" icon onClick={() => handleDeleteClick(list?.taskId)}>
                        <Icon name="check" />
                        </Button>
                    }
                    </TableCell>
                </TableRow>
            ))}

            </TableBody>
            }
        </Table>
    </React.Fragment>
  )
}

export default UserAnalytics