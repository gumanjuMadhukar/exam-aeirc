import http from 'utils/http';

export function getMyAttendence() {
  return http({
    url: '/attendance',
    method: 'get'
  });
}
