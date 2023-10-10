"use strict";
exports.id = 634;
exports.ids = [634];
exports.modules = {

/***/ 237:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ StudentAPI),
/* harmony export */   "s": () => (/* binding */ uploadStudent)
/* harmony export */ });
/* harmony import */ var apis_resource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4545);
/* harmony import */ var utils_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4985);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([apis_resource__WEBPACK_IMPORTED_MODULE_0__, utils_http__WEBPACK_IMPORTED_MODULE_1__]);
([apis_resource__WEBPACK_IMPORTED_MODULE_0__, utils_http__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


class StudentAPI extends apis_resource__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z {
    getStudentBasedOnSubject(subject_id) {
        return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
            url: `/getStudentBasedOnSubject/${subject_id}`,
            method: "get"
        });
    }
    constructor(){
        super("student");
    }
}

function uploadStudent({ file , subject_id  }) {
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("subject_id", subject_id);
    return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
        url: `/importStudents`,
        method: "post",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3973:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "d": () => (/* binding */ ImportStudentModal)
/* harmony export */ });
/* unused harmony export acceptedDocType */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1175);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_query__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var utils_colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(144);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var apis_student__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(237);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([apis_student__WEBPACK_IMPORTED_MODULE_7__]);
apis_student__WEBPACK_IMPORTED_MODULE_7__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];









const acceptedDocType = ".xlsx, .xml";
const { Dragger  } = antd__WEBPACK_IMPORTED_MODULE_1__.Upload;
const ImportStudentModal = (props)=>{
    const { isModalOpen , handleCancel  } = props;
    const queryClient = (0,react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();
    const [toBeUploadedDocs, setToBeUploadedDocs] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)([]);
    const saveMutation = (0,react_query__WEBPACK_IMPORTED_MODULE_2__.useMutation)((data)=>(0,apis_student__WEBPACK_IMPORTED_MODULE_7__/* .uploadStudent */ .s)(data));
    const [form] = antd__WEBPACK_IMPORTED_MODULE_1__.Form.useForm();
    const uploadProps = ()=>({
            name: "file",
            multiple: true,
            action: "/api/noop",
            accept: acceptedDocType,
            onRemove: (file)=>{
                setToBeUploadedDocs(toBeUploadedDocs.filter((item)=>item?.uid !== file?.uid));
            },
            onChange (info) {
                if (!info.file.originFileObj) return;
                const { status  } = info.file;
                if (status === "done") {
                    let file = info.fileList.map((file)=>file.originFileObj);
                    setToBeUploadedDocs(file);
                }
            },
            onDrop (e) {
                setToBeUploadedDocs(e.dataTransfer.files);
            }
        });
    const onFinish = (data)=>{
        let bodyData = {
            ...data,
            file: toBeUploadedDocs
        };
        saveMutation.mutate(bodyData, {
            onSuccess: ()=>{
                handleCancel();
                queryClient.invalidateQueries([
                    "StudentList"
                ]);
                antd__WEBPACK_IMPORTED_MODULE_1__.message.success("Students added successfully");
                setToBeUploadedDocs([]);
            },
            onError: (data)=>{
                const errorMessageWithNetworkIssue = data?.message;
                const errorMessage = data?.response?.data?.message;
                antd__WEBPACK_IMPORTED_MODULE_1__.message.error(errorMessage || errorMessageWithNetworkIssue);
                setToBeUploadedDocs([]);
            }
        });
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Modal, {
        title: "Import Student",
        open: isModalOpen,
        onCancel: handleCancel,
        footer: null,
        width: "30vw",
        className: "modal-content-responsive",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Form, {
            form: form,
            preserve: false,
            layout: "vertical",
            onFinish: onFinish,
            autoComplete: "off",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_1__.Row, {
                style: {
                    justifyContent: "space-between"
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Col, {
                        lg: 24,
                        xs: 24,
                        md: 24,
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Dragger, {
                            ...uploadProps(),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "ant-upload-drag-icon",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__.InboxOutlined, {})
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "ant-upload-text",
                                    children: "Click or drag file to this area to upload"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "ant-upload-hint",
                                    children: [
                                        "Supports ",
                                        acceptedDocType
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Col, {
                        xs: 24,
                        style: {
                            marginTop: "50px"
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(CustomizedButtonGroup, {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                    size: "large",
                                    onClick: handleCancel,
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                    style: {
                                        backgroundColor: utils_colors__WEBPACK_IMPORTED_MODULE_3__/* .Colors.PRIMARY */ .w.PRIMARY,
                                        color: "#fff",
                                        marginLeft: "10px"
                                    },
                                    size: "large",
                                    htmlType: "submit",
                                    children: "Save"
                                })
                            ]
                        })
                    })
                ]
            })
        })
    });
};
const CustomizedButtonGroup = (styled_components__WEBPACK_IMPORTED_MODULE_4___default().div)`
  float: right;
  margin-top: 10px;
  right: 0;
`;

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