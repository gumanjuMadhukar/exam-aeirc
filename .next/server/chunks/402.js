"use strict";
exports.id = 402;
exports.ids = [402];
exports.modules = {

/***/ 237:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ StudentAPI),
/* harmony export */   "s": () => (/* binding */ uploadStudent)
/* harmony export */ });
/* harmony import */ var apis_resource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4545);
/* harmony import */ var utils_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4985);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([apis_resource__WEBPACK_IMPORTED_MODULE_0__, utils_http__WEBPACK_IMPORTED_MODULE_1__]);
([apis_resource__WEBPACK_IMPORTED_MODULE_0__, utils_http__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


class StudentAPI extends apis_resource__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z {
    getStudentBasedOnSubject(subject_id) {
        return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
            url: `/getStudentBasedOnSubject/${subject_id}`,
            method: "get"
        });
    }
    constructor(){
        super("student");
    }
}

function uploadStudent({ file , subject_id  }) {
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("subject_id", subject_id);
    return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
        url: `/importStudents`,
        method: "post",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 402:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var utils_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(144);
/* harmony import */ var styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var apis_student__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(237);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9915);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1175);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_query__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2245);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var apis_question__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8392);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([apis_student__WEBPACK_IMPORTED_MODULE_4__, js_cookie__WEBPACK_IMPORTED_MODULE_8__, apis_question__WEBPACK_IMPORTED_MODULE_11__]);
([apis_student__WEBPACK_IMPORTED_MODULE_4__, js_cookie__WEBPACK_IMPORTED_MODULE_8__, apis_question__WEBPACK_IMPORTED_MODULE_11__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);












const BasicInformation = (props)=>{
    const { data  } = props;
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_7__.useRouter)();
    const queryClient = (0,react_query__WEBPACK_IMPORTED_MODULE_9__.useQueryClient)();
    // const [editBasicInformationModalOpen, setEditBasicInformationModalOpen] =
    //   useState(false);
    // const openCloseModal = () => {
    //   setEditBasicInformationModalOpen(!editBasicInformationModalOpen);
    // };
    const [_isChecked, _setIsChecked] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [form] = antd__WEBPACK_IMPORTED_MODULE_6__.Form.useForm();
    const studentAPI = new apis_student__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z();
    // const mediaAPI = new MediaAPI();
    const student_id = js_cookie__WEBPACK_IMPORTED_MODULE_8__["default"].get("student_id");
    const updateStudentData = (0,react_query__WEBPACK_IMPORTED_MODULE_9__.useMutation)((data)=>studentAPI.update(student_id, data));
    // const addMediaData = useMutation((data: any) => uploadMyDocs(data));
    const allocateQuestion = (0,react_query__WEBPACK_IMPORTED_MODULE_9__.useMutation)(apis_question__WEBPACK_IMPORTED_MODULE_11__/* .allocateRandomQuestion */ .Bk, {
        onSuccess: ()=>{
            queryClient.invalidateQueries([
                "StudentData"
            ]);
            enterFullScreen();
            // router.push("/student/dashboard/quiz/ExamWithPagination");
            router.push("/student/dashboard/quiz");
        },
        onError: (_data)=>{
        // const errorMessageWithNetworkIssue = data?.message;
        // const errorMessage = data?.response?.data?.message;
        }
    });
    // const handleCheckboxChange = (e: any) => {
    //   setIsChecked(e.target.checked);
    // };
    const enterFullScreen = ()=>{
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
    };
    // enterFullScreen();
    const handleSubmit = (data)=>{
        // Handle form submission logic here
        // handleCapturePhoto();
        const newData = {
            is_terms_and_condition_accepted: data.checkbox,
            start_time: moment__WEBPACK_IMPORTED_MODULE_10___default()()
        };
        const allocateData = {
            student_id
        };
        updateStudentData.mutate(newData, {
            onSuccess: ()=>{
                allocateQuestion.mutate(allocateData);
            },
            onError: (_data)=>{
            // const errorMessageWithNetworkIssue = data?.message;
            // const errorMessage = data?.response?.data?.message;
            }
        });
    };
    const validateCheckbox = (_rule, value)=>{
        if (!value) {
            return Promise.reject("Checkbox is required");
        }
        return Promise.resolve();
    };
    const empData = data;
    // const videoRef = useRef<HTMLVideoElement>(null);
    // const canvasRef = useRef<HTMLCanvasElement>(null);
    // const imageRef = useRef<HTMLImageElement>(null);
    // const handleCapturePhoto = () => {
    //   const videoElement = videoRef.current;
    //   const canvasElement = canvasRef.current;
    //   const imageElement = imageRef.current;
    //   if (videoElement && canvasElement && imageElement) {
    //     // Get the video element dimensions
    //     const videoWidth = videoElement.videoWidth;
    //     const videoHeight = videoElement.videoHeight;
    //     // Set the canvas element dimensions to match the video element
    //     canvasElement.width = videoWidth;
    //     canvasElement.height = videoHeight;
    //     // Draw the current video frame onto the canvas
    //     const canvasContext = canvasElement.getContext("2d");
    //     if (canvasContext) {
    //       canvasContext.drawImage(videoElement, 0, 0, videoWidth, videoHeight);
    //       const imageDataUrl = canvasElement.toDataURL("image/jpeg"); // Get the data URL of the captured photo
    //       const formData = new FormData();
    //       formData.append("photo", dataURItoBlob(imageDataUrl));
    //       formData.append("image_type", "SELF");
    //       formData.append("origanization", "NHPC");
    //       formData.append("symbol_number", data.symbol_number);
    //       formData.append("student_id", "2");
    //       addMediaData.mutate(formData, {
    //         onSuccess: () => {},
    //         onError: (data: any) => {
    //           const errorMessageWithNetworkIssue = data?.message;
    //           const errorMessage = data?.response?.data?.message;
    //         },
    //       });
    //     }
    //   }
    // };
    // useEffect(() => {
    //   handleStartCamera();
    // }, []);
    // const handleStartCamera = async () => {
    //   const videoElement = videoRef.current;
    //   if (videoElement) {
    //     try {
    //       // Get user media (camera) and set it as video source
    //       const mediaStream = await navigator.mediaDevices.getUserMedia({
    //         video: true,
    //       });
    //       videoElement.srcObject = mediaStream;
    //     } catch (error) {
    //       console.error("Error accessing camera:", error);
    //     }
    //   }
    // };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__/* .DetailWrapper */ .c0, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__/* .DetailTitleWrapper */ .wg, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__/* .DetailTitle */ .fw, {
                        children: "Basic Information"
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_6__.Row, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(LeftProfile, {
                            lg: 8,
                            md: 24,
                            sm: 24,
                            xs: 24,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ImageWrapper, {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ProfileImage, {
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_6__.Image, {
                                            className: `profile-img`,
                                            src: `http://103.175.192.52/storage/documents/${empData?.photo}`,
                                            alt: "avatar"
                                        })
                                    })
                                })
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_6__.Col, {
                            lg: 8,
                            md: 24,
                            sm: 24,
                            xs: 24,
                            className: "search-col-margin",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__/* .DetailItem */ .Te, {
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
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__/* .DetailTitleWrapper */ .wg, {
                    style: {
                        marginTop: "20px"
                    },
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(styles_profileInformation__WEBPACK_IMPORTED_MODULE_2__/* .DetailTitle */ .fw, {
                        children: "Instructions"
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_6__.Form, {
                    form: form,
                    onFinish: handleSubmit,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_6__.Form.Item, {
                            name: "checkbox",
                            getValueFromEvent: (e)=>e.target.checked,
                            rules: [
                                {
                                    validator: validateCheckbox
                                }
                            ],
                            required: true,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_6__.Checkbox, {
                                children: "I declare all the data displayed here belongs me or if there is any mistake on the data that is of my responsibility"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_6__.Button, {
                            type: "primary",
                            htmlType: "submit",
                            style: {
                                left: "50%",
                                right: "50%",
                                height: "30px"
                            },
                            children: "Take Examination"
                        })
                    ]
                })
            ]
        })
    });
};
const LeftProfile = styled_components__WEBPACK_IMPORTED_MODULE_5___default()(antd__WEBPACK_IMPORTED_MODULE_6__.Col)`
  background-color: #fff;
  // height: 300px;
`;
const ProfileImage = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().div)`
  width: 200px;
  text-align: center;
  border: 2px solid #000;
  .ant-image {
    width: 100%;
    padding: 10px;
    .profile-img {
      &.img-padding {
        padding: 40px;
      }
      background: ${utils_colors__WEBPACK_IMPORTED_MODULE_1__/* .Colors.LIGHTER_BG */ .w.LIGHTER_BG};
      // border-radius: 50%;
    }
  }
`;
// const ProfileButton = styled.div`
//   text-align: center;
//   margin-top: 15px;
//   cursor: pointer;
// `;
// const ProfileText = styled.span`
//   border: 1px dotted ${Colors.BORDER_COLOR};
//   color: ${Colors.BORDER_COLOR};
//   font-size: 14px;
//   padding: 0 5px;
// `;
const ImageWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().div)`
  display: flex;
  // align-items: center;
  // justify-content: center;
  height: 100%;
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BasicInformation);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;