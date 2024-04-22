import Resource from "apis/resource";
import http from "utils/http";

class ProgramAPI extends Resource {
  constructor() {
    super("subject");
  }
}

export { ProgramAPI as default };

export function uploadMyDocs({ file }: any) {
  const formData = new FormData();
  formData.append("file", file[0]);

  return http({
    url: `/importSubject`,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export const programContent = async ({
  queryKey,
}: {
  queryKey: any;
}): Promise<any> => {
  const [, data] = queryKey;
  const queryParams: any = {
    page: data.filterParams.currentPage,
    limit: data.filterParams.pageSize,
  };

  if (data.filterParams.date) queryParams.date = data.filterParams.date;
  if (data.filterParams.search) queryParams.search = data.filterParams.search;
  if (data.filterParams.status) queryParams.status = data.filterParams.status;
  if (data.id) queryParams.subject_id = data.id;
  const response = await http({
    url: `/course-content`,
    method: "get",
    params: queryParams,
  });
  return response.data;
};

export const createProgramContent = async (data: any) => {
  const response = await http({
    url: `/course-content`,
    method: "post",
    data,
  });

  return response.data.data;
};
