import React, { useEffect } from 'react'
import { Formik } from 'formik'
import {
    FormGroup,
    FormField,
    Form as FormicForm,
    Input,
    TextArea,
    Button,
    Select,
  } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from 'rsuite';

import moment from 'moment';
import { AddUserModuleConfig } from './module.config';
import { userCreateTasksRequest, userGetEmployeeListRequest } from '../../redux/actions';

const CreateTasks = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { employeeList } = useSelector((state) => ({
      employeeList: state?.user?.employeeList,
    }));

      useEffect(() => {
        dispatch(userGetEmployeeListRequest({}));
      }, []);


      const userOptions = employeeList?.map((users) => ({
        key: users.id,
        text: users.userName,
        value: users.userName,
      }))

  return (
        <React.Fragment>
            <h3>Create New Tasks</h3>
              <Formik
                initialValues={{ taskName: '', taskDescription: '', dueDate: '',  priority: '', userName:''}}
                validate={values => {
                  const errors = {};

                  if (!values.taskName) {
                    errors.taskName = 'Required';
                  }


                  if (!values.taskDescription) {
                    errors.taskDescription = 'Required';
                  }

                  if (!values.dueDate) {
                    errors.dueDate = 'Required';
                  }

                  if (!values.priority) {
                    errors.priority = 'Required';
                  }

                  if (!values.userName) {
                    errors.userName = 'Required';
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  const payload = {
                    taskName:values.taskName,
                    taskDescription:values.taskDescription,
                    dueDate:values?.dueDate,
                    priority:values?.priority,
                    userName:values?.userName
                  }
                 dispatch(userCreateTasksRequest({ ...payload }));
                }}
              >
                {({ handleChange, handleBlur, values, errors, touched, handleSubmit, setFieldValue }) => (
                    <FormicForm onSubmit={handleSubmit}>
                        <FormGroup widths='equal'>
                            <FormField
                                id='form-input-control-email'
                                control={Input}
                                placeholder='Task Name'
                                name='taskName'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.taskName}
                                error={touched.taskName && errors.taskName ? { content: errors.taskName, } : null}
                                icon='user' iconPosition='left'
                            />
                        </FormGroup>
                        <FormGroup widths='equal'>
                            <FormField
                                id='form-input-control-password'
                                control={Input}
                                placeholder='Task Description'
                                name='taskDescription'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.taskDescription}
                                error={touched.taskDescription && errors.taskDescription ? { content: errors.taskDescription } : null}
                                icon='user' iconPosition='left'
                            />
                        </FormGroup>
                        <FormGroup widths='equal'>
                            <FormField
                                required
                                control={Select}
                                label='Priority'
                                placeholder="Select Priority"
                                name="priority"
                                options={AddUserModuleConfig?.priority || []}
                                value={values.priority}
                                onChange={(e, { value }) => setFieldValue('priority', value)}
                                error={touched.priority && errors.priority ? { content: errors.priority } : null}
                            />
                        </FormGroup>
                        <FormGroup widths='equal'>
                            <FormField
                                required
                                control={DatePicker}
                                label='Due Date'
                                placeholder="Due Date"
                                name="dueDate"
                                value={values.dueDate ? moment(values.dueDate, 'YYYY-MM-DD').toDate() : null}
                                error={touched.dueDate && errors.dueDate ? { content: errors.dueDate } : null}
                                style={{ width: "100%" }}
                                onChange={(date) => {
                                if (date) {
                                    setFieldValue('dueDate', moment(date).format('YYYY/MM/DD'));
                                }
                                }}
                            />
                        </FormGroup>
                        <FormGroup widths='equal'>
                            <FormField
                                required
                                control={Select}
                                label='User'
                                placeholder="Select User"
                                name="userName"
                                options={userOptions || []}
                                value={values.userName}
                                onChange={(e, { value }) => setFieldValue('userName', value)}
                                error={touched.userName && errors.userName ? { content: errors.userName } : null}
                            />
                        </FormGroup>
                        <Button fluid color='yellow' type='submit'>Create Tasks</Button>
                    </FormicForm>
                )}
              </Formik>
        </React.Fragment>
  )
}

export default CreateTasks
