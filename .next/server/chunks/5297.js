"use strict";
exports.id = 5297;
exports.ids = [5297];
exports.modules = {

/***/ 5297:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N0": () => (/* binding */ DetailLabel),
/* harmony export */   "Te": () => (/* binding */ DetailItem),
/* harmony export */   "c0": () => (/* binding */ DetailWrapper),
/* harmony export */   "fw": () => (/* binding */ DetailTitle),
/* harmony export */   "hY": () => (/* binding */ DetailValue),
/* harmony export */   "wg": () => (/* binding */ DetailTitleWrapper)
/* harmony export */ });
/* unused harmony exports CustomizedButtonGroup, AttendanceDetailLabel */
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var utils_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(144);



const DetailItem = styled_components__WEBPACK_IMPORTED_MODULE_1___default()(antd__WEBPACK_IMPORTED_MODULE_0__.Row)`
  width: 100%;
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
const DetailLabel = styled_components__WEBPACK_IMPORTED_MODULE_1___default()(antd__WEBPACK_IMPORTED_MODULE_0__.Col)`
  margin-bottom: 10px;
  color: ${utils_colors__WEBPACK_IMPORTED_MODULE_2__/* .Colors.LIGHT_TEXT_COLOR */ .w.LIGHT_TEXT_COLOR};
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
const DetailValue = styled_components__WEBPACK_IMPORTED_MODULE_1___default()(antd__WEBPACK_IMPORTED_MODULE_0__.Col)`
  font-weight: bold;
  // margin-left: 10px;
`;
const DetailWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_1___default().div)`
  background: #fff;
  // margin-bottom: 25px;
  margin-left: 25px;
  padding: 25px;
  @media (max-width: 988px) {
    margin-left: 0px;
    padding: 10px;
    overflow: scroll;
  }
`;
const DetailTitle = (styled_components__WEBPACK_IMPORTED_MODULE_1___default().div)`
  font-size: 20px;
  color: #000;
  font-weight: 700;
  @media (max-width: 480px) {
    font-size: 14px;
    font-weight: 600;
  }
`;
const DetailTitleWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_1___default().div)`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 10px;
`;
const CustomizedButtonGroup = (styled_components__WEBPACK_IMPORTED_MODULE_1___default().div)`
  float: right;
  margin-top: 10px;
`;
const AttendanceDetailLabel = styled_components__WEBPACK_IMPORTED_MODULE_1___default()(antd__WEBPACK_IMPORTED_MODULE_0__.Col)`
  color: ${utils_colors__WEBPACK_IMPORTED_MODULE_2__/* .Colors.LIGHT_TEXT_COLOR */ .w.LIGHT_TEXT_COLOR};
`;


/***/ })

};
;