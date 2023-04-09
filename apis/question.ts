import Resource from "apis/resource";
import http from "utils/http";

class QuestionAPI extends Resource {
  getQuestionBasedOnSubject(subject_id: any) {
    return http({
      url: `/getQuestionBasedOnSubject/${subject_id}`,
      method: "get",
    });
  }

  getRandomQuestion(subject_id: any) {
    return http({
      url: `/getRandomQuestion/${subject_id}`,
      method: "get",
    });
  }

  constructor() {
    super("questions");
  }
}

export { QuestionAPI as default };

export function uploadQuestions({ file, subject_id }: any) {
  const formData = new FormData();
  formData.append("file", file[0]);
  formData.append("subject_id", subject_id);

  return http({
    url: `/importQuestions`,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
