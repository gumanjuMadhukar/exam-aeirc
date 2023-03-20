import http from 'utils/http';
import { FilterParams } from 'pages/admin/leaves';
import { UserAttendanceFilterParams } from 'pages/admin/attendance';

export function getAllAttendance(filterParams: FilterParams) {
  return http({
    url: '/attendance/all',
    params: filterParams,
    method: 'get'
  });
}

export function getAttendenceOfUser(filterParams: UserAttendanceFilterParams) {
  return http({
    url: '/attendance/' + filterParams.employeeId,
    params: { date: filterParams.date, employeeId: filterParams.employeeId },
    method: 'get'
  });
}
