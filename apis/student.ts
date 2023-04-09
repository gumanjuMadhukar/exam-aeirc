import Resource from "apis/resource";
import http from "utils/http";

class StudentAPI extends Resource {
  getStudentBasedOnSubject(subject_id: any) {
    return http({
      url: `/getStudentBasedOnSubject/${subject_id}`,
      method: "get",
    });
  }
  constructor() {
    super("student");
  }
}

export { StudentAPI as default };

export function uploadStudent({ file, subject_id }: any) {
  const formData = new FormData();
  formData.append("file", file[0]);
  formData.append("subject_id", subject_id);

  return http({
    url: `/importStudents`,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
