import http from "utils/http";

export const postSeatPlan = async (data: any) => {
    const response = await http({
      url: `/shift-assigne`,
      method: "post",
      data,
    });
  
    return response?.data;
  };
  