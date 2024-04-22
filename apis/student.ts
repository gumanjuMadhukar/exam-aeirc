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

export const getLoginDetail = async ({ queryKey }: { queryKey: any }): Promise<any> => {
  const [, data] = queryKey;
  const queryParams: any = {
    shift_id:data?.filterParams.shift_id,
  };
  const response = await http({
    url: `/student/printLoginDetail`,
    method:"get",
    params:queryParams
  });
  return response?.data;
};
