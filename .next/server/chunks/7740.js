"use strict";
exports.id = 7740;
exports.ids = [7740];
exports.modules = {

/***/ 7740:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ ImportProgramModal)
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var apis_program__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8189);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([apis_program__WEBPACK_IMPORTED_MODULE_6__]);
apis_program__WEBPACK_IMPORTED_MODULE_6__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];








const acceptedDocType = ".xlsx, .xml";
const { Dragger  } = antd__WEBPACK_IMPORTED_MODULE_1__.Upload;
// const props: UploadProps = {
//   name: "file",
//   multiple: true,
//   action: "/api/noop",
//   accept: acceptedDocType,
//   onChange(info: any) {
//     const { status } = info.file;
//     if (status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }
//     if (status === "done") {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
//   onDrop(e: any) {
//     console.log("Dropped files", e.dataTransfer.files);
//   },
// };
const ImportProgramModal = (props)=>{
    const { isModalOpen , handleCancel  } = props;
    const queryClient = (0,react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();
    const [toBeUploadedDocs, setToBeUploadedDocs] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)([]);
    const saveMutation = (0,react_query__WEBPACK_IMPORTED_MODULE_2__.useMutation)((data)=>(0,apis_program__WEBPACK_IMPORTED_MODULE_6__/* .uploadMyDocs */ .d7)(data));
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
                    "ProgramList"
                ]);
                antd__WEBPACK_IMPORTED_MODULE_1__.message.success("Program added successfully");
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
        title: "Add Program",
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
                                    className: "ant-upload-drag-icon"
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

/***/ })

};
;