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
