"use strict";
exports.id = 4985;
exports.ids = [4985];
exports.modules = {

/***/ 4985:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ setTokenInHeader),
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8982);
/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cookies_next__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios_auth_refresh__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9469);
/* harmony import */ var axios_auth_refresh__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios_auth_refresh__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5567);
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




/**
 * Http Utility.
 */ const setTokenInHeader = (ax, token)=>{
    ax.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
const http = axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json"
    }
});
// Create axios interceptor
axios_auth_refresh__WEBPACK_IMPORTED_MODULE_2___default()(http, (_failedRequest)=>{
    // check if the token is expired
    const token = (0,cookies_next__WEBPACK_IMPORTED_MODULE_1__.getCookie)("token");
    const decodedJwt = jwt_decode__WEBPACK_IMPORTED_MODULE_3___default()(token);
    if (decodedJwt.exp * 1000 < Date.now()) {
        // 1. First try request fails - refresh the token.
        setTokenInHeader(http, (0,cookies_next__WEBPACK_IMPORTED_MODULE_1__.getCookie)("token"));
        (0,cookies_next__WEBPACK_IMPORTED_MODULE_1__.deleteCookie)("token");
        if (window) {
            window.location.reload();
        }
        return Promise.resolve();
    } else {
        (0,cookies_next__WEBPACK_IMPORTED_MODULE_1__.deleteCookie)("token");
        if (window) {
            window.location.reload();
        }
        return Promise.resolve();
    }
});
http.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    if (401 == error?.response?.status || 403 == error?.response?.status) {
        (0,cookies_next__WEBPACK_IMPORTED_MODULE_1__.deleteCookie)("token");
        if (window) {
            window.location.reload();
        }
    } else {
        return Promise.reject(error);
    }
    return;
});
setTokenInHeader(http, (0,cookies_next__WEBPACK_IMPORTED_MODULE_1__.getCookie)("token"));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (http);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;