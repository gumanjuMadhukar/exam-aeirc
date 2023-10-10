"use strict";
exports.id = 8816;
exports.ids = [8816];
exports.modules = {

/***/ 8816:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cp": () => (/* binding */ changePassword),
/* harmony export */   "MA": () => (/* binding */ resendOtpVerify),
/* harmony export */   "MY": () => (/* binding */ otpVerify),
/* harmony export */   "P_": () => (/* binding */ forgotPasswordOtpVerify),
/* harmony export */   "c0": () => (/* binding */ resetPassword),
/* harmony export */   "kS": () => (/* binding */ logout),
/* harmony export */   "kW": () => (/* binding */ studentLogin),
/* harmony export */   "ub": () => (/* binding */ getEmailForForgotPassword),
/* harmony export */   "x4": () => (/* binding */ login),
/* harmony export */   "z2": () => (/* binding */ register)
/* harmony export */ });
/* unused harmony export auth */
/* harmony import */ var _configs_urls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3836);
/* harmony import */ var _utils_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4985);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_http__WEBPACK_IMPORTED_MODULE_1__]);
_utils_http__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function login(data) {
    return (0,_utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
        url: "login",
        method: "post",
        data
    });
}
function studentLogin(data) {
    return (0,_utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
        url: "generateToken",
        method: "post",
        data
    });
}
function register(data) {
    return (0,_utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
        url: "/user/register",
        method: "post",
        data
    });
}
function otpVerify(data) {
    return (0,_utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
        url: "/user/verify",
        method: "post",
        data
    });
}
function forgotPasswordOtpVerify(data) {
    return (0,_utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
        url: "/auth/verify-otp",
        method: "post",
        data
    });
}
function resetPassword(data) {
    return (0,_utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
        url: "/auth/reset-password",
        method: "post",
        data
    });
}
function resendOtpVerify(userId) {
    return (0,_utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
        url: "/user/resend-verification" + "/" + userId,
        method: "post"
    });
}
function getEmailForForgotPassword(data) {
    return (0,_utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
        url: "/auth/forgot-password",
        method: "post",
        data
    });
}
function auth() {
    return http({
        url: "/auth",
        method: "get"
    });
}
function changePassword(data) {
    return (0,_utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
        url: _configs_urls__WEBPACK_IMPORTED_MODULE_0__/* ["default"].changePassword */ .Z.changePassword,
        method: "post",
        data
    });
}
function logout() {
    return (0,_utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
        url: "/auth/logout",
        method: "post"
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3836:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_0__);

const urls = {
    login: "/auth/login",
    forgotPassword: "/auth/forgot-pw",
    register: "/auth/register",
    changePassword: "auth/change-password",
    student: "/student",
    commonNavItems: [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: _ant_design_icons__WEBPACK_IMPORTED_MODULE_0__.HomeOutlined
        },
        {
            title: "Holiday",
            path: "/holiday",
            icon: _ant_design_icons__WEBPACK_IMPORTED_MODULE_0__.CalendarOutlined
        }
    ],
    employeeNavitems: [
        {
            title: "My Profile",
            path: "/employee/my-profile",
            icon: _ant_design_icons__WEBPACK_IMPORTED_MODULE_0__.ManOutlined
        },
        {
            title: "Attendence",
            path: "/employee/attendance",
            icon: _ant_design_icons__WEBPACK_IMPORTED_MODULE_0__.ClockCircleOutlined
        },
        {
            title: "Leaves",
            path: "/employee/leaves",
            icon: _ant_design_icons__WEBPACK_IMPORTED_MODULE_0__.LogoutOutlined
        }
    ],
    adminNavitems: [
        {
            title: "Users",
            path: "/admin/users",
            icon: _ant_design_icons__WEBPACK_IMPORTED_MODULE_0__.UserOutlined
        }
    ],
    administrationNavitems: [
        {
            title: "Program",
            path: "/dir/program",
            icon: _ant_design_icons__WEBPACK_IMPORTED_MODULE_0__.BookOutlined
        },
        {
            title: "Student",
            path: "/dir/student",
            icon: _ant_design_icons__WEBPACK_IMPORTED_MODULE_0__.UserOutlined
        },
        {
            title: "Shift",
            path: "/dir/shift",
            icon: _ant_design_icons__WEBPACK_IMPORTED_MODULE_0__.HistoryOutlined
        },
        {
            title: "Settings",
            path: "/dir/settings",
            icon: _ant_design_icons__WEBPACK_IMPORTED_MODULE_0__.SettingOutlined
        }
    ]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (urls);


/***/ })

};
;