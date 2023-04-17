import Resource from "apis/resource";
import http from "utils/http";

class SettingAPI extends Resource {
  constructor() {
    super("setting");
  }
}

export { SettingAPI as default };
