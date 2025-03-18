import { put, call, takeEvery } from 'redux-saga/effects';
import { commonConstants, userConstants } from '../constants';
import { receivePusherEvent, systemError } from '../actions/common.action';
import { ServiceCallBase } from '../api/service.api';
import { serviceEndPoint } from '../api/service.endpoint';
import { userCreateSuccess, userDeleteEmployeeSuccess, userGetDetailsSuccess, userGetEmployeeListSuccess, userGetProfileDetailsSuccess, userGetUserTaskListSuccess, userPermissionGetSuccess, usersGetDetailsSuccess, userTaskUpdateSuccess } from '../actions/user.actions';
import pusher from '../../helper/pusher';
import { eventChannel } from 'redux-saga';


function* getUserDetails(action) {
  try {
   
    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.getUserDetails);

    if (response && response.data) {
      yield put(userGetDetailsSuccess(response.data));
    }

  } catch (error) {
    yield put(systemError(error));
  }
}

function* createNewUsers(action) {
  try {
    const { ...payload } = action.payload;

    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.createNewUsers, payload);

    if (response && response.data) {
      yield put(userCreateSuccess(response.data));
    }

  } catch (error) {
    yield put(systemError(error));
  }
}













function* userGetPermission(action) {
  try {
    const { ...payload } = action.payload;

    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.userGetPermission, payload);

    if (response && response.data) {
      yield put(userPermissionGetSuccess(response.data));
    }

  } catch (error) {
    yield put(systemError(error));
  }
}

function* userGetUser(action) {
  try {
    const { ...payload } = action.payload;

    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.user, payload);

    if (response && response.data) {
      yield put(userGetProfileDetailsSuccess(response.data));
    }

  } catch (error) {

    yield put(systemError(error));
  }
}

function* userGetAnalytics(action) {
  try {
    const { ...payload } = action.payload;

    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.userGetAnalytics, payload);

    if (response && response.data) {
      yield put(userGetProfileDetailsSuccess(response.data));
    }

  } catch (error) {

    yield put(systemError(error));
  }
}

function* userGetList(action) {
  try {
    const { ...payload } = action.payload;

    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.userGetList, payload);

    if (response && response.data) {
      yield put(userGetEmployeeListSuccess(response.data));
    }

  } catch (error) {

    yield put(systemError(error));
  }
}

function* userDeleteEmployee(action) {
  try {
    const { ...payload } = action.payload;

    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.userDeleteEmployee, payload);

    if (response && response.data) {
      yield put(userDeleteEmployeeSuccess(response.data));
    }

  } catch (error) {

    yield put(systemError(error));
  }
}

function* userCreateTasks(action) {
  try {
    const { ...payload } = action.payload;

    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.createTasks, payload);

    if (response && response.data) {
      yield put(userDeleteEmployeeSuccess(response.data));
    }

  } catch (error) {

    yield put(systemError(error));
  }
}


function* createPusherChannel(action) {
  return eventChannel((emit) => {
    const channel = pusher.subscribe(channelName);

    channel.bind('my-event', (data) => {
      emit(data);
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(channelName);
    };
  });
}

function* handlePusherConnect(action) {
  const channelName = action.payload;
  const pusherChannel = yield call(createPusherChannel, channelName);

  try {
    while (true) {
      const event = yield take(pusherChannel);
      yield put(receivePusherEvent(event)); 
    }
  } finally {
    console.log('Pusher channel closed');
  }
}

function* getUsersDetails(action){
  try {

    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.getUserDetails);

    if (response) {
      yield put(usersGetDetailsSuccess(
        response.data
      ));
    }

  } catch (error) {
    yield put(systemError(error));
  }
}

function* getUsersTaskList(action){
  try {

    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.getTaskListUser);

    if (response) {
      yield put(userGetUserTaskListSuccess(
        response.data
      ));
    }

  } catch (error) {
    yield put(systemError(error));
  }
}

function* usersTaskUpdate(action){
  try {

    const { ...payload } = action.payload;

    const response = yield call(ServiceCallBase.postApi, serviceEndPoint.updateTask, payload);

    if (response) {
      yield put(userTaskUpdateSuccess(
        response.data
      ));

      yield call(getUsersTaskList, {});
    }

  } catch (error) {
    yield put(systemError(error));
  }
}



export function* UserSaga() {
  yield takeEvery(userConstants.USER_GET_DETAILS_REQUEST, getUserDetails);
  yield takeEvery(userConstants.USER_GET_PERMISSION_REQUEST, userGetPermission);
  yield takeEvery(userConstants.USER_GET_PROFILE_DETAIL_REQUEST, userGetUser);




  yield takeEvery(userConstants.USER_CREATE_REQUEST, createNewUsers);
  yield takeEvery(userConstants.USER_GET_ANALYTICS_REQUEST, userGetAnalytics);
  yield takeEvery(userConstants.USER_GET_EMPLOYEE_REQUEST, userGetList);
  yield takeEvery(userConstants.USER_DELETE_EMPLOYEE_REQUEST, userDeleteEmployee);
  yield takeEvery(userConstants.USER_CREATE_TASKS_REQUEST, userCreateTasks);
  yield takeEvery(commonConstants.PUSHER_CONNECT, handlePusherConnect);
  yield takeEvery(userConstants.USERS_GET_DETAILS_REQUEST, getUsersDetails);
  yield takeEvery(userConstants.USERS_GET_USER_TASK_LIST_REQUEST, getUsersTaskList);
  yield takeEvery(userConstants.USERS_TASK_UPDATE_REQUEST, usersTaskUpdate);
}
