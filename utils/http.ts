import axios, { AxiosInstance, AxiosStatic } from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
/**
 * Http Utility.
 */

export const setTokenInHeader = (ax: AxiosInstance, token: any) => {
  ax.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // withCredentials: true
  },
});

// Create axios interceptor
createAuthRefreshInterceptor(http, (failedRequest) => {
  // check if the token is expired
  const token: any = getCookie("token");
  const decodedJwt: any = jwt_decode(token);

  if (decodedJwt.exp * 1000 < Date.now()) {
    // 1. First try request fails - refresh the token.
    setTokenInHeader(http, getCookie("token"));
    deleteCookie("token");
    if (window) {
      window.location.reload();
    }
    return Promise.resolve();
  } else {
    deleteCookie("token");
    if (window) {
      window.location.reload();
    }
    return Promise.resolve();
  }
});

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (401 == error?.response?.status || 403 == error?.response?.status) {
      deleteCookie("token");
      if (window) {
        window.location.reload();
      }
    } else {
      return Promise.reject(error);
    }
  }
);

setTokenInHeader(http, getCookie("token"));
export default http;
