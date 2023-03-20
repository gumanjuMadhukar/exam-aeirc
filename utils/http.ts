import axios, { AxiosInstance, AxiosStatic } from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
/**
 * Http Utility.
 */

export const setTokenInHeader = (ax: AxiosInstance, token: any) => {
  ax.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
    // withCredentials: true
  }
});

// Create axios interceptor
createAuthRefreshInterceptor(http, failedRequest => {
  // check if the token is expired
  const token: any = getCookie('token');
  const decodedJwt: any = jwt_decode(token);

  if (decodedJwt.exp * 1000 < Date.now()) {
    // 1. First try request fails - refresh the token.
    setTokenInHeader(http, getCookie('refresh-token'));

    return http.get('/auth/refresh-token').then(resp => {
      // clear previous token header
      if (http.defaults.headers.common['Authorization']) {
        delete http.defaults.headers.common['Authorization'];
      }
      const accessToken = resp?.data?.data?.access_token;

      Cookies.set('token', accessToken);
      // 2. Set up new access token
      setTokenInHeader(http, accessToken);

      // 4. Set up access token of the failed request.
      failedRequest.response.config.headers.common[
        'Authorization'
      ] = `Bearer ${accessToken}`;

      // 5. Retry the request with new setup!
      return Promise.resolve();
    });
  } else {
    deleteCookie('token');
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
      deleteCookie('token');
      if (window) {
        window.location.reload();
      }
    } else {
      return Promise.reject(error);
    }
  }
);

setTokenInHeader(http, getCookie('token'));
export default http;
