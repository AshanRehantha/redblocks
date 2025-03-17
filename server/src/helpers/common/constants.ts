export const APP_STATUS_ACTIVE = 'active';
export const APP_STATUS_INACTIVE = 'inactive';

export const APP_USER_TYPE_SUPER_ADMIN = 'super_admin';
export const APP_USER_TYPE_USER = 'user';


export const APP_USER_AUTH_TYPE_FIRST_TIME_LOGIN = 'First_Time_Login';
export const APP_USER_AUTH_TYPE_PASSWORD_RESET = 'Password_Reset';
export const APP_USER_AUTH_TYPE_CHANGED_PASSWORD = 'ChangePassword';

export const APP_STATUS_SUCCESS = 'success';
export const APP_STATUS_FAILURE = 'failure';


/**Module Name */
export const APP_MODULE_DASHBOARD_NAME = 'dashboard';

/**SubModuleName */
export const APP_SUB_MODULE_DASHBOARD_STATUS_VIEW = 'dashboard_apm';
export const APP_SUB_MODULE_DASHBOARD = 'dashboard';

/*Actions*/
export const APP_ACTION_VIEW = 'view';

/**Action Name */
export const DASHBOARD_APM_HEADER_CARD_STATUS_VIEW = 'dashboard/apm_dashboard/view';
export const SETTING_USER_ADD_TO_TEAM = 'setting/add_to_team/user_add';
export const CONFIGURATION_TEAM_ADD = 'configuration/team/add';
export const CONFIGURATION_TEAM_VIEW_LIST = 'configuration/team/list';
export const CONFIGURATION_HOLIDAY_CALENDER_ADD = 'configuration/holiday_calender/add';
export const USER_CREATE_PERMISSION = 'user/add';
export const TASK_CREATE_PERMISSION = 'task/add';
export const TASK_LIST_PERMISSION = 'task/list';
export const TASK_DELETE_PERMISSION = 'task/delete';


export const GLOBAL_DATE_TIME = new Date();

/**Types */
export const APM_LOGGER = 'APM_LOGGER'
export const QUERY_LOGGER = 'QUERY_LOGGER'
export const SQL_QUERY = 'SQL_QUERY'
export const CPU_MONITOR = 'CPU_MONITOR'

export const LOGGER_TYPES = {
  LOGGER_DB:'LOGGER_DB'
}


export const DB_TABLE_NAME = {
  LEAVE_STATUS_PENDING: 'pending',
  LEAVE_STATUS_ACCEPT:'accept',
  USER_TYPES_EMPLOYER:'employer',
  USER_TYPES_PROJECT_MANAGER:'project manager',
  USER_TYPES_TEAM_LEAD:'team lead',
  USER_TYPE_EXPLICT:'Explict'
}

export const USER_TYPE = {
  USER_TYPES_EMPLOYER:'employer',
  USER_TYPES_PROJECT_MANAGER:'project manager',
  USER_TYPES_TEAM_LEAD:'team lead',
  USER_TYPES_EXPERT:'texpert',
}


export const ERROR_MESSAGES = {
    USER_BLOCKED: 'User blocked',
    SYSTEM_ERROR:'System Error',
    USER_ALREADY_EXISTS:'User already exists',
    ERROR_OLD_PASSWORD_NOT_MATCH:'Old password not match',
    USER_EMAIL_NOT_EXISTS:'Email is not exists',
    USER_LEAVE_EXCEEDED:'user leave exceeded',
  };

  export const SUCCESS_MESSAGES = {
    SUCCESS_USER_CREATE: 'User create successfully',
    SUCCESS_DELETE_TASKS: 'Tasks delete successfully',
  };