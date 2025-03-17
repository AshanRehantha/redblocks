import Cookies from "js-cookie";
import { commonConstants } from "../redux/constants";

export const getRequestHeader = (method) => {
    return authHeader(method);
};

function authHeader(method) {
    const xsrfToken = Cookies.get("csrf_token");
    const accessToken = Cookies.get("access_token");

    if (method === commonConstants.REQUEST_HEADER_METHOD_POST) {
        return {
            "Content-Type": "application/json",
            ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
            "X-CSRF-Token":xsrfToken
        };
    }


    if (method === commonConstants.REQUEST_HEADER_METHOD_GET) {
        return {
            "Content-Type": "application/json",
        };
    }
}

export const postRequest = (url) => {
    return process.env.HRMS_SERVICE_BASEURL + url;
}