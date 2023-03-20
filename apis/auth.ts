import urls from '../configs/urls';
import http from '../utils/http';

export function login(data: any) {
  return http({
    url: '/auth/log-in',
    method: 'post',
    data
  });
}
export function register(data: any) {
  return http({
    url: '/user/register',
    method: 'post',
    data
  });
}
export function otpVerify(data: any) {
  return http({
    url: '/user/verify',
    method: 'post',
    data
  });
}
export function forgotPasswordOtpVerify(data: any) {
  return http({
    url: '/auth/verify-otp',
    method: 'post',
    data
  });
}
export function resetPassword(data: any) {
  return http({
    url: '/auth/reset-password',
    method: 'post',
    data
  });
}

export function resendOtpVerify(userId: Number) {
  return http({
    url: '/user/resend-verification' + '/' + userId,
    method: 'post'
  });
}

export function getEmailForForgotPassword(data: any) {
  return http({
    url: '/auth/forgot-password',
    method: 'post',
    data
  });
}

export function auth() {
  return http({
    url: '/auth',
    method: 'get'
  });
}

export function changePassword(data: any) {
  return http({
    url: urls.changePassword,
    method: 'post',
    data
  });
}

export function logout() {
  return http({
    url: '/auth/logout',
    method: 'post'
  });
}