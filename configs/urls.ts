import {
  HomeOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  LogoutOutlined,
  ManOutlined,
  SettingOutlined,
  BookOutlined,
  HistoryOutlined,
  UserOutlined,
} from "@ant-design/icons";

const urls = {
  login: "/auth/login",
  comitteLogin: "/auth/committee-login",
  forgotPassword: "/auth/forgot-pw",
  register: "/auth/register",
  changePassword: "auth/change-password",
  student: "/student",

  commonNavItems: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: HomeOutlined,
    },
    {
      title: "Holiday",
      path: "/holiday",
      icon: CalendarOutlined,
    },
  ],
  employeeNavitems: [
    {
      title: "My Profile",
      path: "/employee/my-profile",
      icon: ManOutlined,
    },
    {
      title: "Attendence",
      path: "/employee/attendance",
      icon: ClockCircleOutlined,
    },
    {
      title: "Leaves",
      path: "/employee/leaves",
      icon: LogoutOutlined,
    },
  ],
  adminNavitems: [
    {
      title: "Users",
      path: "/admin/users",
      icon: UserOutlined,
    },
    // {
    //   title: "Attendance",
    //   path: "/admin/attendance",
    //   icon: ClockCircleOutlined,
    // },

    // {
    //   title: "Program",
    //   path: "/admin/programs",
    //   icon: UserOutlined,
    // },

    // {
    //   title: "Payroll",
    //   icon: ReadOutlined,
    //   children: [
    //     {
    //       title: "Go Payroll",
    //       path: "/admin/payroll/go-payroll",
    //       key: "go-payroll",
    //     },
    //   ],
    // },
    // {
    //   title: "Leaves",
    //   path: "/admin/leaves",
    //   icon: LogoutOutlined,
    // },
  ],
  administrationNavitems: [
    {
      title: "Program",
      path: "/dir/program",
      icon: BookOutlined,
    },
    {
      title: "Student",
      path: "/dir/student",
      icon: UserOutlined,
    },
    {
      title: "Shift",
      path: "/dir/shift",
      icon: HistoryOutlined,
    },
    {
      title: "Settings",
      path: "/dir/settings",
      icon: SettingOutlined,
    },
  ],
};

export default urls;
