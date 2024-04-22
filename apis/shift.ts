import http from "utils/http";
import Resource from "./resource";

export interface Shift {
  name: string;
  start_datetime: Date;
  total_students: number;
  tolerance_time: number;
  status: string;
  end_datetime: Date;
}

class ShiftAPI extends Resource {
  getRandomQuestion(subject_id: any) {
    return http({
      url: `/shift/${subject_id}`,
      method: "get",
    });
  }
  constructor() {     
    super("shift");
  }
}
export { ShiftAPI as default };
export const getShift = async ({
  queryKey,
}: {
  queryKey: any;
}): Promise<any[]> => {
  const [, data] = queryKey;
  const queryParams: any = {
    page: data.filterParams.currentPage,
    limit: data.filterParams.pageSize,
  };

  if (data.filterParams.date) queryParams.date = data.filterParams.date;
  if (data.filterParams.search) queryParams.search = data.filterParams.search;
  if (data.filterParams.status) queryParams.status = data.filterParams.status;

  const response = await http({
    url: `/shift`,
    method: "get",
    params: queryParams,
  });

  return response?.data;
};

export const postShift = async (data: any) => {
  const response = await http({
    url: `/shift`,
    method: "post",
    data,
  });

  return response;
};
