import http from "utils/http";

export function getStudentDataWithPassFail() {
  return http({
    url: "/exportStudentsDataToExcel",
    method: "get",
    responseType: "blob",
  });
}
