import Resource from "apis/resource";

class UserAPI extends Resource {
  constructor() {
    super("users");
  }
}

export { UserAPI as default };
