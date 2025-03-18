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
import { loginAuthRequest } from '../../../redux/actions';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
        <React.Fragment>
              <Formik
                initialValues={{ userName: '', password: '' }}
                validate={values => {
                  const errors = {};

                  if (!values.userName) {
                    errors.userName = 'Required';
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
                    username:values.userName,
                    password:values.password
                  }
                 dispatch(loginAuthRequest({ ...payload, navigate }));
                }}
              >
                {({ handleChange, handleBlur, values, errors, touched, handleSubmit }) => (
                    <FormicForm onSubmit={handleSubmit}>
                        <FormGroup widths='equal'>
                            <FormField
                                id='form-input-control-email'
                                control={Input}
                                placeholder='User Name'
                                name='userName'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                error={touched.email && errors.email ? { content: errors.email, } : null}
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
                        <Button fluid color='yellow' type='submit'>Login</Button>
                    </FormicForm>
                )}
              </Formik>
        </React.Fragment>
  )
}

export default LoginForm
