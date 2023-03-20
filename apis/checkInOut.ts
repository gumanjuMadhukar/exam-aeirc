import http from 'utils/http';

export function checkIn(data: CheckinPayload) {
  return http({
    url: '/attendance/check-in',
    method: 'post',
    data
  });
}
export function checkOut(data: CheckoutPayload) {
  return http({
    url: '/attendance/check-out',
    method: 'patch',
    data
  });
}
