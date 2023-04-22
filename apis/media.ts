import Resource from "apis/resource";
import http from "utils/http";

class MediaAPI extends Resource {
  constructor() {
    super("media");
  }
}

export { MediaAPI as default };

export function uploadMyDocs(formData: any) {
  return http({
    url: `/media`,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
