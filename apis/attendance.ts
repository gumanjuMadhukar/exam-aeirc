import Resource from 'apis/resource';
import http from 'utils/http';

class AttendanceAPI extends Resource {
  constructor() {
    super('attendance');
  }

  attendenceSummaryList(query?: any) {
    return http({
      url: '/attendance/summary',
      method: 'GET',
      params: query
    });
  }

  attendence(query?: any) {
    return http({
      url: '/attendance',
      method: 'GET',
      params: query
    });
  }
}

export { AttendanceAPI as default };
