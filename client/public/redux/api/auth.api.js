"use strict";
import { removeCookies, setCookies } from "../../helper/auth.helper";
import { getRequestHeader, postRequest } from "../../helper/request.header";

export const AuthApi = {
  loginToSystem: async (payload) => {
    try {
      const response = await fetch(postRequest('user/login'), {
        method:"POST",
        headers: getRequestHeader("POST"),
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      setCookies(data?.bearer_token);

      return data;
      
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
};
