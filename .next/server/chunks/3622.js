"use strict";
exports.id = 3622;
exports.ids = [3622];
exports.modules = {

/***/ 4545:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Resource)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
/* harmony import */ var utils_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4985);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__, utils_http__WEBPACK_IMPORTED_MODULE_1__]);
([axios__WEBPACK_IMPORTED_MODULE_0__, utils_http__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


/**
 * Simple REST resource class
 */ const CancelToken = axios__WEBPACK_IMPORTED_MODULE_0__["default"].CancelToken;
let cancel;
class Resource {
    constructor(uri){
        this.uri = uri;
    }
    list(query) {
        if (cancel) {
            cancel(); // cancel request
        }
        return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
            url: "/" + this.uri,
            method: "get",
            params: query,
            cancelToken: new CancelToken(function executor(c) {
                cancel = c;
            })
        });
    }
    get(id) {
        return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
            url: "/" + this.uri + "/" + id,
            method: "get"
        });
    }
    store(resource, headers) {
        return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
            url: "/" + this.uri,
            method: "post",
            data: resource,
            headers: headers
        });
    }
    update(id, resource) {
        return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
            url: "/" + this.uri + "/" + id,
            method: "put",
            data: resource
        });
    }
    destroy(id) {
        return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
            url: "/" + this.uri + "/" + id,
            method: "delete"
        });
    }
}


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 144:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "w": () => (/* binding */ Colors)
/* harmony export */ });
const Colors = {
    PRIMARY: "#55BAFF",
    SECONDARY: "#1679ca",
    BORDER_COLOR: "#BFBFBF",
    COLOR_PRIMARY_BG: "#171F2E",
    WHITE: "#FFF",
    MAIN_BACKGROUND: "#f0f2f6",
    SUCCESS: "#52C41A",
    DANGER: "#F5222D",
    TEXT_COLOR: "#262626",
    LIGHT_BLACK_COLOR: "#595959",
    LIGHT_TEXT_COLOR: "#8c8c8c",
    LIGHT_BG: "#f0f0f0",
    LIGHTER_BG: "#f6f6f6",
    SHIFT_ICON_BG_COLOR: "#389E0D",
    RED: "#FF4D4F",
    BLACK: "#404040",
    DISABLED: "#a6a1a1",
    DISABLED_BG: "#e9e9e9",
    BTN_BORDER_OUTLINE: "#d9d9d9",
    YELLOW_LIGHT: "#FAAD14",
    SUCCESS_BG: "#F6FFED",
    GREEN: "#389E0D",
    GREY8: "#595959",
    GREYABALONE: "#D6CFC7"
};


/***/ })

};
;