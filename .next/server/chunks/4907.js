"use strict";
exports.id = 4907;
exports.ids = [4907];
exports.modules = {

/***/ 4907:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hf": () => (/* binding */ LoginContainer),
/* harmony export */   "U$": () => (/* binding */ AuthBlock),
/* harmony export */   "Uu": () => (/* binding */ LoginImageBlock),
/* harmony export */   "XK": () => (/* binding */ LoginHeading),
/* harmony export */   "Xs": () => (/* binding */ LoginPage),
/* harmony export */   "al": () => (/* binding */ TextBlock),
/* harmony export */   "n4": () => (/* binding */ PageLogo),
/* harmony export */   "w2": () => (/* binding */ VerticalDividerLine)
/* harmony export */ });
/* unused harmony export PageHeaderWrapper */
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const LoginPage = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().div)`
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 5%;
  background-image: url("/login-background.svg");
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: contain;
`;
const PageLogo = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().div)`
  margin-top: 50px;
  margin-bottom: 20px;
`;
const LoginContainer = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().div)`
  display: flex;
  background-color: #fff;
  border-radius: 2px;
  @media (min-width: 768px) {
    display: flex;
    width: 720px;
  }
  @media (min-width: 992px) {
    display: flex;
    width: 920px;
  }
`;
const VerticalDividerLine = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().div)`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin: 70px 0;
  border-inline-start: 1px solid #f0f0f0;
  @media (max-width: 767px) {
    display: none;
  }
`;
const AuthBlock = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  padding: 30px;
  @media (max-width: 767px) {
    width: 80vw;
  }
  @media (max-width: 600px) {
    width: 100vw;
  }
`;
const TextBlock = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    color: #007bff;
  }

  span {
    color: #404040;
  }
`;
const LoginImageBlock = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().div)`
  width: 50%;
  padding: 15%;
  @media (max-width: 767px) {
    display: none;
  }
  @media (max-width: 992px) {
    padding: 15% 10%;
  }
`;
const PageHeaderWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().div)`
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;
const LoginHeading = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().div)`
  font-size: 44px;
  font-weight: 800;
  letter-spacing: 2px;
`;


/***/ })

};
;