import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    ModalHeader,
    ModalDescription,
    ModalContent,
    Modal,
    Icon,
  } from 'semantic-ui-react'
import { hideError, hideSuccess, logOutRequest } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

export const UiErrorMessageModal = (props) => {

    const actionDispatch = useDispatch();
    const navigate = useNavigate();

    const { errorMessage } = useSelector((state) => {
        return {
            errorMessage: state.errorMessage,
        };
    });

    const hideErrorAlert = () => {
        if(errorMessage?.statusCodes === 401){
            actionDispatch(hideError());
            actionDispatch(logOutRequest({navigate}));
        }
        actionDispatch(hideError())
    }

    return (
        <Modal
        size={'mini'}
        centered={false}
        open={errorMessage?.show}
        onClose={hideErrorAlert}
        closeOnDimmerClick
      >
      
        <ModalContent className='message-box'>
          <ModalDescription style={{ textAlign: 'center' }}>
            <Icon size='huge' name='exclamation circle' color='red' className='message-box_icon' />
              <p className='message-box_text'>{errorMessage?.messages instanceof Object ? errorMessage?.messages?.message : errorMessage?.messages}</p>
          </ModalDescription>
        </ModalContent>
      </Modal>
    );
};

export const UiSuccessMessageModal = (props) => {
  const actionDispatch = useDispatch();

  const { successMessage } = useSelector((state) => {
      return {
          successMessage: state.successMessage
      };
  });

  const hideSuccessAlert = () => {
      actionDispatch(hideSuccess())
  }

  return (
      <Modal
      size={'mini'}
      centered={false}
      open={successMessage?.show}
      onClose={hideSuccessAlert}
      closeOnDimmerClick
    >
    
      {/* <ModalHeader style={{ textAlign: 'center' }}><Icon size='large' name='exclamation circle' color='red' /> Sorry </ModalHeader> */}
      <ModalContent className='message-box'>
        <ModalDescription style={{ textAlign: 'center' }}>
          <Icon size='huge' name='check circle' color='green' className='message-box_icon' />
          <p className='message-box_text'>{successMessage?.messages}</p>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
}