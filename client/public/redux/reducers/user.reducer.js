'use strict';

import { commonConstants, userConstants } from '../constants';

export const INITIAL_USER_STATE = {
  userDetails: {},
  userPermission:{},
  userPermissionModule:[],
  user:{},
  taskList:[],
  employeeList:[],
  events: [],
  usersDetails:{},
  userTaskList:[],
};

const mapDataToMenu = (data) => {

  const iconsMap = {
    dashboard: "fas fa-th",
    my_team: "fas fa-users",
    configuration: "fas fa-cog",
    delete_to_team: "fa-solid fa-person-circle-minus",
    team:"fa-solid fa-user-plus",
    view_team:"fa-solid fa-users-viewfinder",
    approvals:"fa-regular fa-circle-check",
    leaves:"fa-regular fa-calendar-plus",
    apply_leave:"fa-solid fa-calendar-days"
  };

  const routerMap = {
    view_team:'viewteam',
    team:'team',
    delete_to_team:'deletetoteam',
    dashboard_main:'',
    dashboard_apm:'apm',
    leaves:'leaves',
    apply_leave:'user-leaves'
  }

  const formattedData = data.map((item) => {
    const { description, name, subModules = [] } = item.appModule; // Ensure subModules is an array
  
    return {
      label: description,
      icon: iconsMap[name] || "fas fa-folder",
      subItems: subModules.map((sub) => ({
        name: sub.description,
        icon: iconsMap[sub.name] || "fa-solid fa-circle",
        router: routerMap[sub.name] ? `${name}/${routerMap[sub.name]}` : `${name}/default-route`
      }))
    };
  });

  return formattedData;

}

export function user(state = INITIAL_USER_STATE, action) {
  switch (action.type) {
    case userConstants.USER_GET_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case userConstants.USER_GET_PERMISSION_SUCCESS:
      return {
        ...state,
        userPermission: action.payload,
      };
    case userConstants.USER_GET_MODULE_PERMISSION_SUCCESS:
      return {
        ...state,
        userPermissionModule: mapDataToMenu(action.payload),
      };
    case userConstants.USER_GET_PROFILE_DETAIL_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case userConstants.USER_GET_ANALYTICS_SUCCESS:
      return {
        ...state,
        taskList: action.payload,
      };
      
     case userConstants?.USER_GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employeeList: action.payload,
      };


      case userConstants.USERS_GET_DETAILS_SUCCESS:
        return {
          ...state,
          usersDetails: action.payload,
        };

        case userConstants.USERS_GET_USER_TASK_LIST_SUCCESS:
          return {
            ...state,
            userTaskList: action.payload,
          };
  


    case commonConstants.PUSHER_EVENT_RECEIVED:
      return {
        ...state,
        events: [...state.events, action.payload],
      }; 

  }
  return state;
}