"use strict";
exports.id = 9120;
exports.ids = [9120];
exports.modules = {

/***/ 9120:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D0": () => (/* binding */ INITIAL_CURRENT_PAGE),
/* harmony export */   "L8": () => (/* binding */ DEFAULT_PAGE_SIZE)
/* harmony export */ });
/* unused harmony exports NO_RECORD, hourMinuteSecondRegex, DATE_OPTIONS, checkinOptions, workingFromOptions, employeeTabItems */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__);

const NO_RECORD = "No Record";

const hourMinuteSecondRegex = (/* unused pure expression or super */ null && (`/.*(\d{2}:\d{2}:\d{2}).*/`));
const DATE_OPTIONS = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
};
const checkinOptions = [
    {
        label: "Current Time",
        value: "current_time"
    },
    {
        label: "Select Time",
        value: "select_time"
    }
];
const workingFromOptions = [
    {
        label: "Office",
        value: "OFFICE"
    },
    {
        label: "Home",
        value: "HOME"
    }
];
//Employee table
const pushQueryToUrl = (query, router)=>{
    router.replace({
        query: {
            ...router.query,
            currentTab: query
        }
    });
};
const employeeTabItems = (router)=>[
        {
            label: "Activated",
            key: "activated",
            icon: /*#__PURE__*/ _jsx(UnorderedListOutlined, {}),
            onClick: (e)=>{
                pushQueryToUrl(e.key, router);
            }
        },
        {
            label: "Deactivated",
            key: "deactivated",
            icon: /*#__PURE__*/ _jsx(UsergroupDeleteOutlined, {}),
            onClick: (e)=>{
                pushQueryToUrl(e.key, router);
            }
        }
    ];
const INITIAL_CURRENT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;


/***/ })

};
;