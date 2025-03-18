import React from 'react'
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
import { useDispatch } from 'react-redux';
import { loginAuthRequest, userCreateRequest } from '../../../redux/actions';
import { AddUserModuleConfig } from '../module.config';

const CreateNewEmployee = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
        <React.Fragment>
            <h3>Create New Employees</h3>
              <Formik
                initialValues={{ firstName: '', lastName: '', userName: '',  password: '', department: ''}}
                validate={values => {
                  const errors = {};

                  if (!values.firstName) {
                    errors.firstName = 'Required';
                  }


                  if (!values.lastName) {
                    errors.lastName = 'Required';
                  }

                  if (!values.userName) {
                    errors.userName = 'Required';
                  }

                  if (!values.department) {
                    errors.department = 'Required';
                  }

                  if (!values.password) {
                    errors.password = 'Required';
                  } else if (values.password.length < 5) {
                    errors.password = 'Password too short';
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  const payload = {
                    firstName:values.firstName,
                    lastName:values.lastName,
                    userName:values?.userName,
                    email:"test@1234",
                    contactNumber:"0704302684",
                    password:values?.password,
                    department:values?.department,
                  }
                 dispatch(userCreateRequest({ ...payload }));
                }}
              >
                {({ handleChange, handleBlur, values, errors, touched, handleSubmit, setFieldValue }) => (
                    <FormicForm onSubmit={handleSubmit}>
                        <FormGroup widths='equal'>
                            <FormField
                                id='form-input-control-email'
                                control={Input}
                                placeholder='First Name'
                                name='firstName'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                                error={touched.firstName && errors.firstName ? { content: errors.firstName, } : null}
                                icon='user' iconPosition='left'
                            />
                        </FormGroup>
                        <FormGroup widths='equal'>
                            <FormField
                                id='form-input-control-password'
                                control={Input}
                                placeholder='Last Name'
                                name='lastName'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                                error={touched.lastName && errors.lastName ? { content: errors.lastName } : null}
                                icon='user' iconPosition='left'
                            />
                        </FormGroup>
                        <FormGroup widths='equal'>
                            <FormField

                                id='form-input-control-password'
                                control={Input}
                                placeholder='User Name'
                                name='userName'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.userName}
                                error={touched.userName && errors.userName ? { content: errors.userName } : null}
                                icon='user' iconPosition='left'
                            />
                        </FormGroup>
                        <FormGroup widths='equal'>
                            <FormField
                                id='form-input-control-password'
                                control={Input}
                                placeholder='Password'
                                name='password'
                                type='password'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                error={touched.password && errors.password ? { content: errors.password } : null}
                                icon='lock' iconPosition='left'
                            />
                        </FormGroup>
                        <FormGroup widths='equal'>
                            <FormField
                                required
                                control={Select}
                                label='Department'
                                placeholder="Select Department"
                                name="department"
                                options={AddUserModuleConfig.departments || []}
                                value={values.department}
                                onChange={(e, { value }) => setFieldValue('department', value)}
                                error={touched.department && errors.department ? { content: errors.department } : null}
                            />
                        </FormGroup>
                        <Button fluid color='yellow' type='submit'>Create User</Button>
                    </FormicForm>
                )}
              </Formik>
        </React.Fragment>
  )
}

export default CreateNewEmployee
