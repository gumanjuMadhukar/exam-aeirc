"use strict";
exports.id = 2631;
exports.ids = [2631];
exports.modules = {

/***/ 2631:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var utils_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(144);
/* harmony import */ var styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5297);



const BasicInformation = (props)=>{
    const { data  } = props;
    // const [editBasicInformationModalOpen, setEditBasicInformationModalOpen] =
    //   useState(false);
    // const openCloseModal = () => {
    //   setEditBasicInformationModalOpen(!editBasicInformationModalOpen);
    // };
    const empData = data;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__/* .DetailWrapper */ .c0, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__/* .DetailTitleWrapper */ .wg, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__/* .DetailTitle */ .fw, {
                        children: "Basic Information"
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__/* .DetailItem */ .Te, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__/* .DetailLabel */ .N0, {
                            xs: 8,
                            children: "Name:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__/* .DetailValue */ .hY, {
                            xs: 16,
                            children: empData?.name
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__/* .DetailLabel */ .N0, {
                            xs: 8,
                            children: "Email:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__/* .DetailValue */ .hY, {
                            xs: 16,
                            children: empData?.email
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__/* .DetailLabel */ .N0, {
                            xs: 8,
                            children: "Symbol Number:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__/* .DetailValue */ .hY, {
                            xs: 16,
                            children: empData?.symbol_number
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__/* .DetailLabel */ .N0, {
                            xs: 8,
                            children: "Date Of Birth:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__/* .DetailValue */ .hY, {
                            xs: 16,
                            children: empData?.date_of_birth
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__/* .DetailLabel */ .N0, {
                            xs: 8,
                            children: "Subject:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__/* .DetailValue */ .hY, {
                            xs: 16,
                            style: {
                                color: utils_colors__WEBPACK_IMPORTED_MODULE_1__/* .Colors.PRIMARY */ .w.PRIMARY
                            },
                            children: empData?.subject?.name
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BasicInformation);


/***/ })

};
;