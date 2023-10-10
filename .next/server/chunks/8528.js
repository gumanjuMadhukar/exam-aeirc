"use strict";
exports.id = 8528;
exports.ids = [8528];
exports.modules = {

/***/ 8189:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RC": () => (/* binding */ programContent),
/* harmony export */   "YP": () => (/* binding */ createProgramContent),
/* harmony export */   "ZP": () => (/* binding */ ProgramAPI),
/* harmony export */   "d7": () => (/* binding */ uploadMyDocs)
/* harmony export */ });
/* harmony import */ var apis_resource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4545);
/* harmony import */ var utils_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4985);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([apis_resource__WEBPACK_IMPORTED_MODULE_0__, utils_http__WEBPACK_IMPORTED_MODULE_1__]);
([apis_resource__WEBPACK_IMPORTED_MODULE_0__, utils_http__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


class ProgramAPI extends apis_resource__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z {
    constructor(){
        super("subject");
    }
}

function uploadMyDocs({ file  }) {
    const formData = new FormData();
    formData.append("file", file[0]);
    return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
        url: `/importSubject`,
        method: "post",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}
const programContent = async ({ queryKey  })=>{
    const [, data] = queryKey;
    const queryParams = {
        page: data.filterParams.currentPage,
        limit: data.filterParams.pageSize
    };
    if (data.filterParams.date) queryParams.date = data.filterParams.date;
    if (data.filterParams.search) queryParams.search = data.filterParams.search;
    if (data.filterParams.status) queryParams.status = data.filterParams.status;
    if (data.id) queryParams.subject_id = data.id;
    console.log(data.id);
    const response = await (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
        url: `/course-content`,
        method: "get",
        params: queryParams
    });
    return response.data;
};
const createProgramContent = async (data)=>{
    const response = await (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
        url: `/course-content`,
        method: "post",
        data
    });
    return response.data.data;
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9166:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "A_": () => (/* binding */ SearchBarContent),
/* harmony export */   "E1": () => (/* binding */ SearchBar),
/* harmony export */   "Y3": () => (/* binding */ TableBodyContainer),
/* harmony export */   "mr": () => (/* binding */ PageHeader),
/* harmony export */   "oY": () => (/* binding */ TitleContent),
/* harmony export */   "rm": () => (/* binding */ PageHeaderNaviagtion)
/* harmony export */ });
/* unused harmony export EmployeeContainer */
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const EmployeeContainer = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().div)``;
const PageHeader = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().div)`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`;
const PageHeaderNaviagtion = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().div)`
  background: #fff;
  padding: 24px;
`;
const TitleContent = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 480px) {
    display: flex;
    flex-wrap: wrap;
  }
`;
const SearchBar = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().div)`
  background: #fff;
  margin: 24px;
  height: 64px;
  @media (max-width: 762px) {
    overflow-wrap: anywhere;
    height: auto;
  }
`;
const SearchBarContent = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().div)`
  padding: 16px;
  line-height: 20px;

  // display: grid;
  // gap: 20px;
  align-items: center;
  // justify-content: center;
`;
const TableBodyContainer = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().div)`
  padding: 24px;
  padding-top: 0;
`;


/***/ })

};
;