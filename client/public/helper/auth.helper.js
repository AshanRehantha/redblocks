import Cookies from "js-cookie";
import { cookieConstants } from "../redux/constants";


export const setCsrfToken = (token) => {
    Cookies.set("XSRF-TOKEN", token);
};



export const isUserLoggin = () => {
    const isLogin = Cookies.get(cookieConstants.USER_DETAILS_COOKIE);

    if (typeof isLogin != "undefined") {
        return true;
    }

    return false;
};

export const setCookies = (data) => {
    Cookies.set("auth-token", data, {
        secure: false,
        httpOnly: false,
        expires: new Date("2100-12-31"),
    })
}

export const removeCookies = (data) => {
    Cookies.remove(data)
}

export const removeStoreCookies = () => {
    Cookies.remove("isUserLogin");
    Cookies.remove("csrf_token");
    Cookies.remove("access_token");
}

