import Resource from 'apis/resource';
import axios from 'axios';
import http from 'utils/http';

const CancelToken = axios.CancelToken;
let cancel: any;
class HolidayAPi extends Resource {
  constructor() {
    super('holiday');
  }
  list(query?: any) {
    if (cancel) {
      cancel(); // cancel request
    }
    return http({
      url: '/' + this.uri,
      method: 'get',
      params: query,
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    });
  }
  patch(id: any, resource: any) {
    return http({
      url: '/' + this.uri + '/' + id,
      method: 'patch',
      data: resource
    });
  }
}

export { HolidayAPi as default };
