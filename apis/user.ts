import Resource from "apis/resource";
import http from "utils/http";

class UserAPI extends Resource {
  changePassword(data: any) {
    return http({
      url: `/auth/password-change`,
      method: "post",
      data,
    });
  }

  constructor() {
    super("users");
  }
}

export { UserAPI as default };
