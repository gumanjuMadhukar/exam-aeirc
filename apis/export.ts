import http from "utils/http";


export function getStudentDataWithPassFail() {
  return http({
    url: "/exportStudentsDataToExcel",
    method: "get",
    responseType: "blob",
  });
}
export function getEncodedStudentDataWithPassFail() {
  return http({
    url: "/exportEncodedStudentsDataToExcel",
    method: "get",
    responseType: "blob",
  });
}