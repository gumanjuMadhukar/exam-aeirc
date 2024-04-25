(() => {
var exports = {};
exports.id = 2888;
exports.ids = [2888,3038,1027];
exports.modules = {

/***/ 9854:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ UserAPI)
/* harmony export */ });
/* harmony import */ var apis_resource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4545);
/* harmony import */ var utils_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4985);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([apis_resource__WEBPACK_IMPORTED_MODULE_0__, utils_http__WEBPACK_IMPORTED_MODULE_1__]);
([apis_resource__WEBPACK_IMPORTED_MODULE_0__, utils_http__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


class UserAPI extends apis_resource__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z {
    changePassword(data) {
        return (0,utils_http__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
            url: `/auth/password-change`,
            method: "post",
            data
        });
    }
    constructor(){
        super("users");
    }
}


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3754:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x": () => (/* binding */ ChangePasswordModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1175);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_query__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var utils_colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(144);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var apis_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9854);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([apis_user__WEBPACK_IMPORTED_MODULE_5__]);
apis_user__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







const ChangePasswordModal = (props)=>{
    const { isModalOpen , handleCancel  } = props;
    const userAPI = new apis_user__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
    const changePasswordMutation = (0,react_query__WEBPACK_IMPORTED_MODULE_2__.useMutation)((data)=>userAPI.changePassword(data));
    const { mutate: createUser , isLoading  } = changePasswordMutation;
    const onFinish = async (data)=>{
        try {
            createUser(data, {
                onSuccess: (res)=>{
                    handleCancel();
                    antd__WEBPACK_IMPORTED_MODULE_1__.message.success(res?.data?.message);
                    router.push("auth/login");
                },
                onError: (data)=>{
                    const errorMessage = data?.response?.data?.message;
                    antd__WEBPACK_IMPORTED_MODULE_1__.message.error(errorMessage);
                }
            });
        } catch (error) {
            // Handle any other errors that may occur
            console.error("Error creating user:", error);
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Modal, {
        title: "Change Password",
        open: isModalOpen,
        onCancel: handleCancel,
        footer: null,
        width: "50vw",
        className: "modal-content-responsive",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Spin, {
            spinning: isLoading,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Form, {
                name: "basic",
                onFinish: onFinish,
                autoComplete: "off",
                layout: "vertical",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_1__.Row, {
                    style: {
                        justifyContent: "space-between"
                    },
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Col, {
                            lg: 11,
                            xs: 24,
                            md: 11,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                                label: "Old Password",
                                name: "password",
                                rules: [
                                    {
                                        required: true,
                                        message: "Please enter your old password!"
                                    }
                                ],
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Input.Password, {})
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Col, {
                            lg: 11,
                            xs: 24,
                            md: 11,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                                label: "New Password",
                                name: "new_password",
                                rules: [
                                    {
                                        required: true,
                                        message: "Please enter your new password!"
                                    }
                                ],
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Input.Password, {})
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Col, {
                            xs: 24,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(CustomizedButtonGroup, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                        size: "large",
                                        onClick: handleCancel,
                                        children: "Cancel"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                        style: {
                                            backgroundColor: utils_colors__WEBPACK_IMPORTED_MODULE_3__/* .Colors.PRIMARY */ .w.PRIMARY,
                                            color: "#fff",
                                            marginLeft: "10px"
                                        },
                                        size: "large",
                                        htmlType: "submit",
                                        children: "Save"
                                    })
                                ]
                            })
                        })
                    ]
                })
            })
        })
    });
};
const CustomizedButtonGroup = (styled_components__WEBPACK_IMPORTED_MODULE_4___default().div)`
  float: right;
  margin-top: 10px;
  right: 0;
`;

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 667:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var services_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1137);
/* harmony import */ var utils_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9328);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var components_admin_password_ChangePasswordModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3754);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([services_auth__WEBPACK_IMPORTED_MODULE_4__, utils_helpers__WEBPACK_IMPORTED_MODULE_5__, components_admin_password_ChangePasswordModal__WEBPACK_IMPORTED_MODULE_7__]);
([services_auth__WEBPACK_IMPORTED_MODULE_4__, utils_helpers__WEBPACK_IMPORTED_MODULE_5__, components_admin_password_ChangePasswordModal__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const { useToken  } = antd__WEBPACK_IMPORTED_MODULE_3__.theme;
const DropdownMenu = ()=>{
    const { token  } = useToken();
    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
        padding: "8px"
    };
    const menuStyle = {
        boxShadow: "none",
        fontWeight: "600",
        fontSize: "14px",
        justifyContent: "space-between"
    };
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setName((0,utils_helpers__WEBPACK_IMPORTED_MODULE_5__/* .getInitials */ .Qm)());
    });
    const [createUserModalOpen, setCreateUserModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const openCloseModal = ()=>{
        setCreateUserModalOpen(!createUserModalOpen);
    };
    const items = [
        {
            key: "1",
            label: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_6___default()), {
                href: "/employee/my-profile",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.ManOutlined, {}),
                    " My Profile"
                ]
            })
        },
        {
            key: "2",
            label: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                onClick: services_auth__WEBPACK_IMPORTED_MODULE_4__/* .logout */ .k,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.PoweroffOutlined, {}),
                    " Logout"
                ]
            })
        },
        {
            key: "3",
            label: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                onClick: openCloseModal,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.PoweroffOutlined, {}),
                    " Change Password"
                ]
            })
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Dropdown, {
                menu: {
                    items
                },
                overlayStyle: {
                    padding: "10px"
                },
                dropdownRender: (menu)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        style: contentStyle,
                        children: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().cloneElement(menu, {
                            style: menuStyle
                        })
                    }),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    onClick: (e)=>e.preventDefault(),
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_3__.Space, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Avatar, {
                                size: "large",
                                style: {
                                    backgroundColor: "#FFFFFF",
                                    color: "#000000",
                                    boxShadow: "0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 3px 6px -4px rgba(0, 0, 0, 0.12)",
                                    fontWeight: "600",
                                    fontSize: "18px",
                                    marginLeft: "10px"
                                },
                                children: name
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.DownOutlined, {})
                        ]
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(components_admin_password_ChangePasswordModal__WEBPACK_IMPORTED_MODULE_7__/* .ChangePasswordModal */ .x, {
                handleCancel: openCloseModal,
                isModalOpen: createUserModalOpen
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownMenu);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8778:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var utils_enums__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2481);
/* harmony import */ var utils_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9328);
/* harmony import */ var _configs_urls__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3836);
/* harmony import */ var _dropdown_menu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(667);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var styles_authCSS__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4907);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([utils_helpers__WEBPACK_IMPORTED_MODULE_5__, _dropdown_menu__WEBPACK_IMPORTED_MODULE_7__]);
([utils_helpers__WEBPACK_IMPORTED_MODULE_5__, _dropdown_menu__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* eslint-disable @next/next/no-img-element */ 









const { Header , Content , Sider  } = antd__WEBPACK_IMPORTED_MODULE_1__.Layout;
const items = (router, navItems, isChild = false)=>navItems.map((ni, _idx)=>{
        const key = ni.title;
        const isSelected = ni.path === router.pathname;
        const hasChildren = !!ni?.children;
        const className = isChild ? "navbar-child-item" : "navbar-parent-item";
        return {
            label: ni.title,
            ...ni.path && {
                onClick: ()=>ni.path && router.push(ni.path)
            },
            icon: ni.icon && /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(ni.icon, {
                style: {
                    width: 25,
                    fontSize: 18
                }
            }),
            key,
            className: `${className} ${isSelected ? isChild ? "navbar-item-selected-child" : "navbar-item-selected" : ""}`,
            ...hasChildren && {
                children: ni.children && items(router, ni?.children, true)
            }
        };
    });
const SidebarLayout = ({ role , children  })=>{
    const [collapsed, setCollapsed] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const { token: { colorBgContainer  }  } = antd__WEBPACK_IMPORTED_MODULE_1__.theme.useToken();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const navItems = role ? [
        ...(_configs_urls__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z?.commonNavItems || []).filter((item)=>item.title !== "Holiday"),
        ...role === utils_enums__WEBPACK_IMPORTED_MODULE_4__/* .Roles.ADMIN */ .G7.ADMIN || role === utils_enums__WEBPACK_IMPORTED_MODULE_4__/* .Roles.SUPERADMIN */ .G7.SUPERADMIN ? _configs_urls__WEBPACK_IMPORTED_MODULE_6__/* ["default"].adminNavitems */ .Z.adminNavitems : role === utils_enums__WEBPACK_IMPORTED_MODULE_4__/* .Roles.ADMINISTRATOR */ .G7.ADMINISTRATOR ? _configs_urls__WEBPACK_IMPORTED_MODULE_6__/* ["default"].administrationNavitems */ .Z.administrationNavitems : _configs_urls__WEBPACK_IMPORTED_MODULE_6__/* ["default"].adminNavitems */ .Z.adminNavitems
    ] : [];
    const defaultOpenKeys = (0,utils_helpers__WEBPACK_IMPORTED_MODULE_5__/* .getDefaultOpenKeys */ .hS)(router.pathname);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_1__.Layout, {
        hasSider: true,
        style: {
            display: "flex",
            height: "100vh"
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Sider, {
                className: "sider",
                width: 246,
                breakpoint: "md",
                trigger: null,
                collapsible: true,
                collapsed: collapsed,
                onBreakpoint: (broken)=>{
                    setCollapsed(broken);
                },
                style: {
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    transition: "all 0.2s"
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "auto auto",
                            padding: "14px 20px 0px 28px",
                            marginBottom: "10px"
                        },
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(styles_authCSS__WEBPACK_IMPORTED_MODULE_9__/* .LoginHeading */ .XK, {
                            style: {
                                color: "white"
                            },
                            children: "AEIRC"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Menu, {
                        theme: "dark",
                        mode: "inline",
                        style: collapsed ? {
                            paddingRight: "10px"
                        } : {
                            paddingRight: "24px"
                        },
                        selectedKeys: navItems.filter((it)=>it.path === router.pathname || router.pathname.includes("holiday") && it.path?.includes("holiday") === router.pathname.includes("holiday")).map((it)=>it.title),
                        items: items(router, navItems),
                        defaultOpenKeys: defaultOpenKeys
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_1__.Layout, {
                className: "site-layout",
                style: collapsed ? {
                    marginLeft: 80,
                    transition: "margin 0.2s"
                } : {
                    marginLeft: 246,
                    transition: "margin 0.2s"
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Affix, {
                        offsetTop: 0,
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Header, {
                            style: {
                                padding: 0,
                                background: colorBgContainer,
                                top: 0,
                                paddingRight: "25px",
                                paddingLeft: "25px",
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "space-between",
                                boxShadow: " 0px 0px 4px rgba(0, 0, 0, 0.2)"
                            },
                            children: [
                                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_8__.MenuOutlined, {
                                    className: "trigger",
                                    style: {
                                        cursor: "pointer"
                                    },
                                    onClick: ()=>window.innerWidth > 768 ? setCollapsed(!collapsed) : setCollapsed(true)
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    style: {
                                        right: 0,
                                        textAlign: "right"
                                    },
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            style: {
                                                marginRight: "20px",
                                                fontSize: 16,
                                                fontWeight: 600
                                            }
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_dropdown_menu__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {})
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Content, {
                        style: {
                            minHeight: "100vh"
                        },
                        children: children
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SidebarLayout);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 446:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "jE": () => (/* binding */ publicRoutes)
});

// UNUSED EXPORTS: config, default

;// CONCATENATED MODULE: external "next/server"
const server_namespaceObject = require("next/server");
// EXTERNAL MODULE: ./utils/enums.ts
var enums = __webpack_require__(2481);
;// CONCATENATED MODULE: ./middleware.ts


const config = {
    matcher: [
        /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */ "/((?!.*\\.).*)"
    ]
};
const publicRoutes = [
    "/auth/register",
    "/auth/login",
    "/auth/committee-login",
    "/auth/forgot-pw",
    "/auth/register-verification",
    "/auth/reset-password",
    "/auth/reset-verification",
    // "/dashboard",
    "/student/auth",
    "/student/auth/finish"
];
function verifyOrRedirectRoute(continueRoute, redirectUrl, isLogin) {
    if (continueRoute && !isLogin) {
        return NextResponse.next();
    }
    return NextResponse.redirect(redirectUrl);
}
function middleware(req) {
    let verify = req.cookies.get("token");
    let role = req.cookies.get("role");
    let url = req.nextUrl.clone();
    if (url.pathname === "/") {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }
    const pattern = new URLPattern();
    const pageName = pattern.exec(url)?.pathname.input.split(/\/\d/)[0];
    if (!pageName) {
        return NextResponse.next();
    }
    if (verify) {
        if (url.pathname.startsWith("/employee") && role?.value !== Roles.EMPLOYEE || url.pathname.startsWith("/admin") && role?.value !== Roles.ADMIN && role?.value !== Roles.SUPERADMIN || url.pathname.startsWith("/dir") && role?.value !== Roles.ADMINISTRATOR || url.pathname.startsWith("/student") && role?.value !== Roles.STUDENT) {
            url.pathname = "/dashboard";
            return verifyOrRedirectRoute(publicRoutes.includes(pageName), url);
        } else {
            url.pathname = "/dashboard";
            return verifyOrRedirectRoute(true, url, pageName.startsWith("/auth"));
        }
    } else {
        if (url.pathname.startsWith("/student")) {
            url.pathname = "/student/auth";
            return verifyOrRedirectRoute(publicRoutes.includes(pageName), url);
        }
        url.pathname = "/student/auth";
        return verifyOrRedirectRoute(publicRoutes.includes(pageName), url);
    }
}


/***/ }),

/***/ 3847:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6764);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1175);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_query__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_query_devtools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5918);
/* harmony import */ var react_query_devtools__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_query_devtools__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var components_layout_sidebar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8778);
/* harmony import */ var middleware__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(446);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var utils_colors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(144);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9915);
/* harmony import */ var nextjs_progressbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8890);
/* harmony import */ var nextjs_progressbar__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(nextjs_progressbar__WEBPACK_IMPORTED_MODULE_11__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([components_layout_sidebar__WEBPACK_IMPORTED_MODULE_6__, js_cookie__WEBPACK_IMPORTED_MODULE_10__]);
([components_layout_sidebar__WEBPACK_IMPORTED_MODULE_6__, js_cookie__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);












function App({ Component , pageProps  }) {
    const [role, setRole] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_8__.useRouter)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const getRole = js_cookie__WEBPACK_IMPORTED_MODULE_10__["default"].get("role");
        setRole(getRole);
    }, [
        js_cookie__WEBPACK_IMPORTED_MODULE_10__["default"].get("role")
    ]);
    const getLayout = Component.getLayout ?? ((page)=>{
        return middleware__WEBPACK_IMPORTED_MODULE_7__/* .publicRoutes.includes */ .jE.includes(router.pathname) || page.type?.name === "Verification" || router.pathname.startsWith("/student") ? page : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(components_layout_sidebar__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
            role: role,
            children: page
        });
    });
    const [queryClient] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(()=>new react_query__WEBPACK_IMPORTED_MODULE_3__.QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false,
                    refetchOnReconnect: false
                }
            }
        }));
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_5__.ConfigProvider, {
        theme: {
            token: {
                colorPrimary: utils_colors__WEBPACK_IMPORTED_MODULE_9__/* .Colors.PRIMARY */ .w.PRIMARY,
                colorPrimaryBg: utils_colors__WEBPACK_IMPORTED_MODULE_9__/* .Colors.COLOR_PRIMARY_BG */ .w.COLOR_PRIMARY_BG,
                borderRadius: 2,
                boxShadow: "none"
            }
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_query__WEBPACK_IMPORTED_MODULE_3__.QueryClientProvider, {
            client: queryClient,
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_query__WEBPACK_IMPORTED_MODULE_3__.Hydrate, {
                state: pageProps.dehydratedState,
                children: [
                    getLayout(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                        ...pageProps
                    })),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((nextjs_progressbar__WEBPACK_IMPORTED_MODULE_11___default()), {
                        color: utils_colors__WEBPACK_IMPORTED_MODULE_9__/* .Colors.PRIMARY */ .w.PRIMARY
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_query_devtools__WEBPACK_IMPORTED_MODULE_4__.ReactQueryDevtools, {
                        initialIsOpen: false
                    })
                ]
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1137:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "k": () => (/* binding */ logout)
/* harmony export */ });
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9915);
/* harmony import */ var _apis_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8816);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([js_cookie__WEBPACK_IMPORTED_MODULE_0__, _apis_auth__WEBPACK_IMPORTED_MODULE_1__]);
([js_cookie__WEBPACK_IMPORTED_MODULE_0__, _apis_auth__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


/**
 * Log out of the system.
 *
 */ async function logout() {
    (0,_apis_auth__WEBPACK_IMPORTED_MODULE_1__/* .logout */ .kS)().finally(()=>{
        js_cookie__WEBPACK_IMPORTED_MODULE_0__["default"].remove("token");
        js_cookie__WEBPACK_IMPORTED_MODULE_0__["default"].remove("role");
        js_cookie__WEBPACK_IMPORTED_MODULE_0__["default"].remove("refresh-token");
        window.location.href = "/auth/login";
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2481:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "G7": () => (/* binding */ Roles)
/* harmony export */ });
/* unused harmony exports LeaveActionMenu, LeaveStatus, Leaves */
var LeaveActionMenu;
(function(LeaveActionMenu) {
    LeaveActionMenu["APPROVE"] = "APPROVE";
    LeaveActionMenu["DECLINE"] = "DECLINE";
    LeaveActionMenu["VIEW"] = "VIEW";
    LeaveActionMenu["EDIT"] = "EDIT";
    LeaveActionMenu["DELETE"] = "DELETE";
})(LeaveActionMenu || (LeaveActionMenu = {}));
var LeaveStatus;
(function(LeaveStatus) {
    LeaveStatus["APPROVED"] = "APPROVED";
    LeaveStatus["PENDING"] = "PENDING";
    LeaveStatus["REJECTED"] = "REJECTED";
})(LeaveStatus || (LeaveStatus = {}));
var Roles;
(function(Roles) {
    Roles["ADMIN"] = "admin";
    Roles["EMPLOYEE"] = "Employee";
    Roles["SUPERADMIN"] = "superadmin";
    Roles["ADMINISTRATOR"] = "administrator";
    Roles["STUDENT"] = "Student";
})(Roles || (Roles = {}));
var Leaves;
(function(Leaves) {
    Leaves["SICK"] = "SICK";
    Leaves["CASUAL"] = "CASUAL";
})(Leaves || (Leaves = {}));


/***/ }),

/***/ 9328:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Qm": () => (/* binding */ getInitials),
/* harmony export */   "hS": () => (/* binding */ getDefaultOpenKeys)
/* harmony export */ });
/* unused harmony exports showTagColor, imageFullPath, getTextCapitilize, truncateText, dataURItoBlob */
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9915);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([js_cookie__WEBPACK_IMPORTED_MODULE_0__]);
js_cookie__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const showTagColor = (name)=>{
    if (name === "APPROVED") {
        return "green";
    } else if (name === "PENDING") {
        return "blue";
    } else if (name === "REJECTED") {
        return "red";
    } else {
        return "blue";
    }
};
const imageFullPath = (imageUrl, placeholderImage)=>{
    return imageUrl ? "http://localhost:8000/api" + "/" + imageUrl : placeholderImage;
};
const getTextCapitilize = (str)=>{
    if (!str) return;
    const lowerCase = str.toLowerCase();
    return lowerCase?.charAt(0).toUpperCase() + lowerCase?.slice(1);
};
const getInitials = ()=>{
    const fullName = js_cookie__WEBPACK_IMPORTED_MODULE_0__["default"].get("user");
    if (!fullName) return;
    const nameArray = fullName.split(" ");
    const firstName = nameArray[0];
    const lastName = nameArray[nameArray.length - 1];
    const initials = firstName.charAt(0) + lastName.charAt(0);
    return initials.toUpperCase();
};
const getDefaultOpenKeys = (pathname)=>{
    if (pathname.includes("payroll")) {
        return [
            "Payroll"
        ];
    }
    return [];
};
const truncateText = (text)=>{
    if (text.length > 12) {
        return text.substring(0, 12) + "...";
    } else {
        return text;
    }
};
function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for(let i = 0; i < byteString.length; i++){
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([
        ab
    ], {
        type: mimeString
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6764:
/***/ (() => {



/***/ }),

/***/ 7066:
/***/ ((module) => {

"use strict";
module.exports = require("@ant-design/icons");

/***/ }),

/***/ 5725:
/***/ ((module) => {

"use strict";
module.exports = require("antd");

/***/ }),

/***/ 9469:
/***/ ((module) => {

"use strict";
module.exports = require("axios-auth-refresh");

/***/ }),

/***/ 8982:
/***/ ((module) => {

"use strict";
module.exports = require("cookies-next");

/***/ }),

/***/ 5567:
/***/ ((module) => {

"use strict";
module.exports = require("jwt-decode");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 8890:
/***/ ((module) => {

"use strict";
module.exports = require("nextjs-progressbar");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ 1175:
/***/ ((module) => {

"use strict";
module.exports = require("react-query");

/***/ }),

/***/ 5918:
/***/ ((module) => {

"use strict";
module.exports = require("react-query/devtools");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 7518:
/***/ ((module) => {

"use strict";
module.exports = require("styled-components");

/***/ }),

/***/ 9648:
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ }),

/***/ 9915:
/***/ ((module) => {

"use strict";
module.exports = import("js-cookie");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [9210,676,1664,4985,3622,8816,4907], () => (__webpack_exec__(3847)));
module.exports = __webpack_exports__;

})();