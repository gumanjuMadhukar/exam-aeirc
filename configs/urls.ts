import {
  HomeOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  LogoutOutlined,
  ManOutlined,
  UserOutlined,
  ReadOutlined,
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
  administrationNavitems: [
    {
      title: "Attendance",
      path: "/admin/attendance",
      icon: ClockCircleOutlined,
    },
    {
      title: "Users",
      path: "/admin/employee",
      icon: UserOutlined,
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
    // {
    //   title: 'Salary',
    //   path: '/admin/salary',
    //   icon: MoneyCollectOutlined
    // },

    // {
    //   title: 'Settings',
    //   path: '/admin/settings',
    //   icon: SettingOutlined
    // }
  ],
};

export default urls;
