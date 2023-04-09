import {
  HomeOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  LogoutOutlined,
  ManOutlined,
  UserOutlined,
  ReadOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const urls = {
  login: "/auth/login",
  forgotPassword: "/auth/forgot-pw",
  register: "/auth/register",
  changePassword: "auth/change-password",
  student: "student",

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
    {
      title: "Attendance",
      path: "/admin/attendance",
      icon: ClockCircleOutlined,
    },

    {
      title: "Program",
      path: "/admin/programs",
      icon: UserOutlined,
    },

    {
      title: "Payroll",
      icon: ReadOutlined,
      children: [
        {
          title: "Go Payroll",
          path: "/admin/payroll/go-payroll",
          key: "go-payroll",
        },
      ],
    },
    {
      title: "Leaves",
      path: "/admin/leaves",
      icon: LogoutOutlined,
    },
  ],
  administrationNavitems: [
    {
      title: "Program",
      path: "/dir/program",
      icon: UserOutlined,
    },
    {
      title: "Student",
      path: "/dir/student",
      icon: LogoutOutlined,
    },
    {
      title: "Quiz",
      path: "/dir/quiz",
      icon: SettingOutlined,
    },
    {
      title: "Settings",
      path: "/adminis/settings",
      icon: SettingOutlined,
    },
  ],
};

export default urls;
