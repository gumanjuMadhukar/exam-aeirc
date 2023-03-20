type LoginPayload = {
  email: string;
  password: string;
};

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}
interface ForgotPasswordPayload {
  email: string;
}
interface ResetPasswordPayload {
  userId: number;
  newPassword: string;
  confirmPassword: string;
}

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type CheckinPayload = {
  check_in: Date;
  working_from: string;
  in_comment?: string;
};
type CheckoutPayload = {
  check_out: Date;
  out_comment?: string;
};
interface EmployeeListDataType {
  id: string;
  key: string;
  name: string;
  status: string[];
  designation?: string;
  action?: any;
}

type LeaveTypeOption = {
  value: id;
  label: string;
  allotedDays: string;
};

type ApplyLeavesPayload = {
  data_range?: date;
  leaveTypeId: number;
  start_date: string;
  end_date: string;
  shift: string;
  reason: string;
};
interface HolidayListDataType {
  name: string;
  date: string;
}
interface HolidayUpdateType {
  id: string;
  record: [];
}

interface LeaveListDataType {
  employee: any;
  end_date: date;
  id: strings;
  leaveStatus?: {
    alias: string;
    id: string;
    name: string;
  };
  leaveType: {
    alias: string;
    name: string;
  };
  reason: string;
  reject_reason: string;
  requested_on: date;
  shift: string;
  start_date: date;
}

interface EmployeeBasicInfoResponse {
  id: number;
  name: string;
  fathers_name: string;
  mothers_name: string;
  dob: date;
  address: string;
  permanent_address: string;
  phone_number: number;
  emergency_contact: number;
  gender: string;
  marital_status: boolean;
  joined_date: date;
  citizenship_number: string;
  bank_name: string;
  bank_account_name: string;
  bank_account_number: number;
  pan_number: number;
  cit_number: number;
  profile_picture: string;
  prevRemaining: [string];
  designation: {
    id: number;
    name: string;
  };
  nationality: {
    id: numner;
    country: string;
    nationality: string;
  };
}

interface AttendanceDataType {
  date: date;
  day: strings;
  check_in: date;
  check_out: date;
  shift?: string;
  worked_seconds: string;
}
interface AllowanceBonus {
  name: string;
  amount: string;
}

interface InsuranceData {
  name: string;
  annual_total: string;
}
interface PayrollSummaryListDataType {
  key: string | number;
  empName: string;
  attendedDays: number | string;
  ctc: number | string;
  grossSalary: number | string;
  totalAddition?: number | string;
  totalDeduction?: number | string;
  taxes: number | string;
  netSalary: number | string;
  status?: number | string;
  empId: string;
  withheld: boolean;
}
