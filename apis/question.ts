import Resource from "apis/resource";
import http from "utils/http";

class QuestionAPI extends Resource {
  getQuestionBasedOnSubject(subject_id: any, filterParams: any) {
    return http({
      url: `/getQuestionBasedOnSubject/${subject_id}?page=${filterParams.currentPage}`,
      method: "get",
      params: filterParams,
    });
  }

  getRandomQuestion(subject_id: any) {
    return http({
      url: `/attempts/${subject_id}`,
      method: "get",
    });
  }

  postQuestionsAnswer(data: any) {
    return http({
      url: `/attempts`,
      method: "post",
      data,
    });
  }

  storeMultipleQuestionAnswer(data: any) {
    return http({
      url: "/storeMultipleQuestionAnswer",
      method: "post",
      data,
    });
  }

  getPaginatedQuestion(data: any, id: any) {
    return http({
      url: `/pulchockWiseData/5`,
      method: "get",
      params: data,
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

export const allocateRandomQuestion = (data: any) => {
  return http({
    url: "/allocateRandomQuestion",
    method: "post",
    data,
  });
};

export const calculateStudentMarks = (id: any) => {
  return http({
    url: `/calculateStudentMarks/${id}`,
    method: "get",
  });
};
