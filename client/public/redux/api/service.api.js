"use strict";

import { removeStoreCookies } from "../../helper/auth.helper";
import { getRequestHeader, postRequest } from "../../helper/request.header";

export const ServiceCallBase = {
  
  postApi: async (endPoint, payload) => {
    try {
      const response = await fetch(postRequest(endPoint), {
        method:"POST",
        headers:getRequestHeader("POST"),
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json(); 

        if(response.status === 401) {
          throw {
            status: 401,
            message: "Unauthorized: Please login again.",
            errorData,
          };
        }
        
        throw {
          status: response.status,
          statusText: response.statusText,
          message: errorData.message || 'An error occurred',
          errorData,
        };
      }

      return await response.json();
      
    } catch (error) {

      removeStoreCookies();

      if (!(error instanceof Object)) {
        throw { message: 'An unknown error occurred', error };
      }

      if (error.message && error.errorData) {
        throw error;
      }

      throw { message: error.message || 'An error occurred', error };
      
    }
  },

  getApi: async(endPoint) => {
    try {
      const response = await fetch(postRequest(endPoint), {
        method:"GET",
        headers:getRequestHeader("GET"),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        
        throw {
          status: response.status,
          statusText: response.statusText,
          message: errorData.message || 'An error occurred',
          errorData,
        };
      }

      return await response.json();
      
    } catch (error) {
      if (!(error instanceof Object)) {
        throw { message: 'An unknown error occurred', error };
      }

      if (error.message && error.errorData) {
        throw error;
      }

      throw { message: error.message || 'An error occurred', error };
      
    }
  }
};
