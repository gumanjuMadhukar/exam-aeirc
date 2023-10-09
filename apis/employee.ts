import Resource from "apis/resource";
import axios from "axios";
import http from "utils/http";

const CancelToken = axios.CancelToken;
let cancel: any;
class EmployeeAPI extends Resource {
  constructor() {
    super("users");
  }

  listall(query?: any) {
    if (cancel) {
      cancel(); // cancel request
    }
    return http({
      url: "/" + this.uri,
      method: "get",
      params: query,
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
    });
  }
}

export { EmployeeAPI as default };

export function getEmployeeDetails(): Promise<{
  data: { data: EmployeeBasicInfoResponse[] | [] };
}> {
  return http({
    url: "/users",
    method: "get",
  });
}

// export function uploadEmployeeProfilePicture(data: any) {
//   return http({
//     url: "/employee/profile-picture",
//     method: "post",
//     data,
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// }

// export function updateSelfData(data: any) {
//   return http({
//     url: `/employee`,
//     method: "patch",
//     data,
//   });
// }

// export function updateEmployeeData(id: any, data: any) {
//   return http({
//     url: `/employee/${id}`,
//     method: "patch",
//     data,
//   });
// }

// export function updateEmployeeDataSalary(id: any, data: any) {
//   return http({
//     url: `/employee/salary/${id}`,
//     method: "post",
//     data,
//   });
// }

// export function updateEmployeeInsuranceSecurity(id: any, data: any) {
//   return http({
//     url: `/employee/insurance-security/${id}`,
//     method: "post",
//     data,
//   });
// }

// export function getEmployeeDetailsById(id: any): Promise<{
//   data: { data: EmployeeBasicInfoResponse[] | [] };
// }> {
//   return http({
//     url: `/employee/${id}`,
//     method: "get",
//   });
// }
