"use strict";
exports.id = 8392;
exports.ids = [8392];
exports.modules = {

/***/ 8392:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BB": () => (/* binding */ calculateStudentMarks),
/* harmony export */   "Bk": () => (/* binding */ allocateRandomQuestion),
/* harmony export */   "Km": () => (/* binding */ uploadCourseContentQuestions),
/* harmony export */   "ZP": () => (/* binding */ QuestionAPI),
/* harmony export */   "ts": () => (/* binding */ uploadQuestions)
/* harmony export */ });
/* harmony import */ var apis_resource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4545);
/* harmony import */ var utils_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4985);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([apis_resource__WEBPACK_IMPORTED_MODULE_0__, utils_http__WEBPACK_IMPORTED_MODULE_1__]);
([apis_resource__WEBPACK_IMPORTED_MODULE_0__, utils_http__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


class QuestionAPI extends apis_resource__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z {
    getQuestionBasedOnSubject(subject_id, filterParams) {
        return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
            url: `/getQuestionBasedOnSubject/${subject_id}?page=${filterParams.currentPage}`,
            method: "get",
            params: filterParams
        });
    }
    getRandomQuestion(subject_id) {
        return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
            url: `/attempts/${subject_id}`,
            method: "get"
        });
    }
    postQuestionsAnswer(data) {
        return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
            url: `/attempts`,
            method: "post",
            data
        });
    }
    storeMultipleQuestionAnswer(data) {
        return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
            url: "/storeMultipleQuestionAnswer",
            method: "post",
            data
        });
    }
    getPaginatedQuestion(data, _id) {
        return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
            url: `/pulchockWiseData/5`,
            method: "get",
            params: data
        });
    }
    getQuestionBasedOnCourseContent(subject_id, filterParams) {
        return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
            url: `/getQuestionBasedOnCourseContent/${subject_id}?page=${filterParams.currentPage}`,
            method: "get",
            params: filterParams
        });
    }
    constructor(){
        super("questions");
    }
}

function uploadQuestions({ file , subject_id  }) {
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("subject_id", subject_id);
    return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
        url: `/importQuestions`,
        method: "post",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}
const allocateRandomQuestion = (data)=>{
    return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
        url: "/allocateRandomQuestion",
        method: "post",
        data
    });
};
const calculateStudentMarks = (id)=>{
    return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
        url: `/calculateStudentMarks/${id}`,
        method: "get"
    });
};
const uploadCourseContentQuestions = ({ file , course_content_id  })=>{
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("course_content_id", course_content_id);
    return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
        url: `/import/course-content-questions`,
        method: "post",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;