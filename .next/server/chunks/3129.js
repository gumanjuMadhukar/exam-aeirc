"use strict";
exports.id = 3129;
exports.ids = [3129];
exports.modules = {

/***/ 9001:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ SettingAPI)
/* harmony export */ });
/* harmony import */ var apis_resource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4545);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([apis_resource__WEBPACK_IMPORTED_MODULE_0__]);
apis_resource__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

class SettingAPI extends apis_resource__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z {
    constructor(){
        super("setting");
    }
}


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3129:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var apis_setting__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9001);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1175);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_query__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var utils_colors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(144);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([apis_setting__WEBPACK_IMPORTED_MODULE_4__]);
apis_setting__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







const SettingForm = (props)=>{
    const { data , isLoading  } = props;
    const [isNegativeMarking, setIsNegativeMarking] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [isOptionRightMarking, setOptionRightMarking] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [active, setActive] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const settingAPI = new apis_setting__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z();
    const queryClient = (0,react_query__WEBPACK_IMPORTED_MODULE_5__.useQueryClient)();
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (data) {
            setActive(data?.active);
        }
    }, [
        data
    ]);
    const storeSetting = (0,react_query__WEBPACK_IMPORTED_MODULE_5__.useMutation)((data)=>settingAPI.store(data));
    const onChange = (checked)=>{
        // console.log(`switch to ${checked}`);
        setIsNegativeMarking(checked);
    };
    const onChangeOptionRight = (checked)=>{
        // console.log(`switch to ${checked}`);
        setOptionRightMarking(checked);
    };
    const onFinish = (data)=>{
        const newData = {
            ...data,
            is_negative_marking: isNegativeMarking,
            an_option_right_marking: isOptionRightMarking
        };
        storeSetting.mutate(newData, {
            onSuccess: ()=>{
                queryClient.invalidateQueries([
                    "SettingData"
                ]);
                antd__WEBPACK_IMPORTED_MODULE_2__.message.success("Setting has been added successfully");
            },
            onError: (_data)=>{
            // const errorMessageWithNetworkIssue = data?.message;
            // const errorMessage = data?.response?.data?.message;
            }
        });
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Card, {
        style: {
            margin: "20px"
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Spin, {
            spinning: isLoading,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Form, {
                name: "basic",
                onFinish: onFinish,
                autoComplete: "off",
                layout: "vertical",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Row, {
                    style: {
                        justifyContent: "space-between"
                    },
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Col, {
                            lg: 11,
                            xs: 24,
                            md: 11,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                                label: "Total Question Per Student",
                                name: "number_of_question_per_student",
                                initialValue: data?.number_of_question_per_student,
                                rules: [
                                    {
                                        required: true,
                                        message: "Please enter total number of question for a student!"
                                    }
                                ],
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {})
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Col, {
                            lg: 11,
                            xs: 24,
                            md: 11,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                                label: "Exam Time",
                                name: "exam_time",
                                initialValue: data ? data?.exam_time : "",
                                rules: [
                                    {
                                        required: true,
                                        message: "Please enter exam time! "
                                    }
                                ],
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {})
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Col, {
                            lg: 11,
                            xs: 24,
                            md: 11,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                                label: "Marks Holding per question",
                                name: "marks_per_question",
                                initialValue: data?.marks_per_question,
                                rules: [
                                    {
                                        required: true,
                                        message: "Please enter marks for per question!"
                                    }
                                ],
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {})
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Col, {
                            lg: 11,
                            xs: 24,
                            md: 11,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                                label: "Passing Mark",
                                name: "passing_mark",
                                initialValue: data?.passing_mark,
                                rules: [
                                    {
                                        required: true,
                                        message: "Please enter passing marks!"
                                    }
                                ],
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {})
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Col, {
                            lg: 11,
                            xs: 24,
                            md: 11,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                                label: "Is Negative Marking",
                                name: "is_negative_marking",
                                initialValue: data?.is_negative_marking,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Switch, {
                                    onChange: onChange
                                })
                            })
                        }),
                        isNegativeMarking && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Col, {
                            lg: 11,
                            xs: 24,
                            md: 11,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                                label: "Marks deduct per wrong answerx",
                                name: "negative_marking_per_question",
                                initialValue: data?.negative_marking_per_question,
                                rules: [
                                    {
                                        required: isNegativeMarking ? true : false,
                                        message: "Please enter is negative marking!"
                                    }
                                ],
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {
                                    disabled: active
                                })
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Col, {
                            lg: 11,
                            xs: 24,
                            md: 11,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                                label: "If an option is right then allocate marks",
                                name: "an_option_right_marking",
                                initialValue: data?.an_option_right_marking,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Switch, {
                                    onChange: onChangeOptionRight,
                                    disabled: active
                                })
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Col, {
                            xs: 24,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CustomizedButtonGroup, {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                    style: {
                                        backgroundColor: utils_colors__WEBPACK_IMPORTED_MODULE_6__/* .Colors.PRIMARY */ .w.PRIMARY,
                                        color: "#fff",
                                        marginLeft: "10px"
                                    },
                                    size: "large",
                                    htmlType: "submit",
                                    disabled: active,
                                    children: active ? "Update" : "Save"
                                })
                            })
                        })
                    ]
                })
            })
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingForm);
const CustomizedButtonGroup = (styled_components__WEBPACK_IMPORTED_MODULE_1___default().div)`
  float: right;
  margin-top: 10px;
  right: 0;
`;

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;