export const NO_RECORD = 'No Record';

import {
  UnorderedListOutlined,
  UsergroupDeleteOutlined,
  CaretRightOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { NextRouter } from 'next/router';

export const hourMinuteSecondRegex: string = `/.*(\d{2}:\d{2}:\d{2}).*/`;

export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric'
};

export const checkinOptions = [
  { label: 'Current Time', value: 'current_time' },
  { label: 'Select Time', value: 'select_time' }
];
export const workingFromOptions = [
  { label: 'Office', value: 'OFFICE' },
  { label: 'Home', value: 'HOME' }
];

//Employee table

const pushQueryToUrl = (query: any, router: NextRouter) => {
  router.replace({
    query: { ...router.query, currentTab: query }
  });
};

export const employeeTabItems = (router: NextRouter) => [
  {
    label: 'Activated',
    key: 'activated',
    icon: <UnorderedListOutlined />,
    onClick: (e: any) => {
      pushQueryToUrl(e.key, router);
    }
  },
  {
    label: 'Deactivated',
    key: 'deactivated',
    icon: <UsergroupDeleteOutlined />,
    onClick: (e: any) => {
      pushQueryToUrl(e.key, router);
    }
  }
];

export const goPayrollTabItems = (router: NextRouter) => [
  {
    label: 'Create Payroll',
    key: 'create-payroll',
    icon: <CaretRightOutlined />,
    onClick: (e: any) => {
      pushQueryToUrl(e.key, router);
    }
  },
  {
    label: 'Payroll History',
    key: 'payroll-history',
    icon: <HistoryOutlined />,
    onClick: (e: any) => {
      pushQueryToUrl(e.key, router);
    }
  }
];

export const INITIAL_CURRENT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
