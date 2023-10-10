"use strict";
exports.id = 8068;
exports.ids = [8068];
exports.modules = {

/***/ 8068:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var utils_colors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(144);





const { TextArea  } = antd__WEBPACK_IMPORTED_MODULE_1__.Input;
const ConfirmModal = ({ buttonTitle , openCloseModal , open , confirmText , onConfirmModal , icon , modalHeader  })=>{
    const [rejectReason, setRejectReason] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const [rejectError, setRejectError] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Modal, {
        open: open,
        onOk: ()=>{
            if (buttonTitle === "Decline" && !rejectReason) {
                setRejectError("Reject reason is required");
                return;
            }
            setRejectReason("");
            setRejectError("");
            onConfirmModal(rejectReason);
        },
        onCancel: openCloseModal,
        okText: buttonTitle,
        cancelText: "Cancel",
        closable: false,
        centered: true,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ModalContent, {
            children: [
                modalHeader ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_1__.Space, {
                        align: "start",
                        size: 2,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ConfirmIcon, {
                                style: {
                                    marginRight: 10,
                                    fontSize: 20
                                },
                                children: icon
                            }),
                            " ",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ModalConfirmHeader, {
                                        children: modalHeader
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ModalConfirmText, {
                                        children: [
                                            "Are you sure you want to ",
                                            confirmText,
                                            "?"
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ConfirmIcon, {
                            style: {
                                marginRight: 10,
                                fontSize: 20
                            },
                            children: icon
                        }),
                        " ",
                        "Are you sure you want to ",
                        confirmText,
                        "?"
                    ]
                }),
                buttonTitle === "Decline" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DeleteWrapper, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DeleteTitle, {
                            children: [
                                " ",
                                "Your Comments ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    style: {
                                        color: utils_colors__WEBPACK_IMPORTED_MODULE_4__/* .Colors.DANGER */ .w.DANGER
                                    },
                                    children: "*"
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(TextArea, {
                            value: rejectReason,
                            onChange: (e)=>{
                                const val = e.target.value;
                                val && setRejectError("");
                                setRejectReason(val);
                            },
                            autoSize: {
                                minRows: 3,
                                maxRows: 5
                            }
                        }),
                        rejectError && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RejectErr, {
                            children: rejectError
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConfirmModal);
const ModalContent = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  font-size: 16px;
  font-weight: 700;
  margin-top: 10px;
`;
const ConfirmIcon = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().span)`
  margin-right: 10px;
  font-size: 20px;
`;
const DeleteWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  margin-top: 10px;
`;
const DeleteTitle = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  font-size: 12px;
  color: ${utils_colors__WEBPACK_IMPORTED_MODULE_4__/* .Colors.LIGHT_TEXT_COLOR */ .w.LIGHT_TEXT_COLOR};
  font-weight: normal;
  margin-bottom: 10px;
`;
const RejectErr = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().span)`
  color: ${utils_colors__WEBPACK_IMPORTED_MODULE_4__/* .Colors.DANGER */ .w.DANGER};
  font-size: 12px;
  font-weight: normal;
  margin-top: 10px;
`;
const ModalConfirmText = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  font-weight: normal;
  color: ${utils_colors__WEBPACK_IMPORTED_MODULE_4__/* .Colors.TEXT_COLOR */ .w.TEXT_COLOR};
  font-size: 14px;
`;
const ModalConfirmHeader = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  font-size: 18px;
`;


/***/ })

};
;