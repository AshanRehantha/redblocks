export const serviceEndPoint = {
    login: 'auth/login',
    logout: 'auth/logout',

    /**user */
    getUserDetails:'customer/get-customer',
    register:'customer/register',
    verifyEmail:'customer/emailVerify',
    changePasswordFirstTime:'customer/update-password-first-time',
    userGetPermission:'system/system-get-user-module-permission',
    userGetModulePermission:'system/system-get-module',
    user:'hr/user/user'

}

export const dashboardServiceEndPoint = {
    getQueryStatus:'dashboard/get-status',
    getSuccessQuery:'dashboard/get-success-query',
    getErrorQuery:'dashboard/get-error-query'
}

export const applicationServiceEndPoints = {
    getAppDetails:'application/app-details-list',
    getCSRFToken:'application/get-csrf-token'
}

export const hrApprovalServiceEndPoints = {
    getLeaveList:'hr/leave/approval-list',
    getLeaveById:'hr/leave/get-leave-details-by-id',
    leaveApprove:'hr/leave/approve-leave'
}