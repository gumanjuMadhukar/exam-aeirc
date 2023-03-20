import styled from 'styled-components';
import {
  Button,
  Table,
  Breadcrumb,
  Select,
  DatePicker,
  Form,
  Row,
  Col,
  Skeleton
} from 'antd';
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import {
  DATE_OPTIONS,
  DEFAULT_PAGE_SIZE,
  INITIAL_CURRENT_PAGE
} from 'constants/common';
import {
  PageHeader,
  PageHeaderNaviagtion,
  SearchBar,
  TableBodyContainer,
  TitleContent
} from 'styles/styled/PageHeader';
import Link from 'next/link';
import AttendanceAPI from 'apis/attendance';
import { CheckCircleFilled } from '@ant-design/icons';
import {
  DateFormat,
  DateFormatYMD,
  getCurrentMonth,
  getCurrentYear,
  SecondIntoHours,
  TimeFormatHMM
} from 'utils/DateFormat';
import { useQuery } from 'react-query';
import { MONTH_SELECT, rangePresets } from 'constants/schema';
import dayjs, { Dayjs } from 'dayjs';
import AttendanceDetailsCard from 'components/attendance/AttendanceDetailsCard';
import { getMyAttendence } from 'apis/dashboard';
import CheckInOutModal from 'components/dashboard/CheckInOutModal';
import { addTimes } from 'utils/dateTime';
import DashboardDrawer from 'components/dashboard/DashboardDrawer';
import PageFooter from 'components/layout/page-footer';
import { Colors } from 'utils/colors';
import { FirstHalf, SecondHalf } from 'utils/icon';

const attendanceListColumns: ColumnsType<AttendanceDataType> = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (_, record) => {
      return (
        <>
          <a className="semi-bold">{DateFormat(record.date)}</a>
        </>
      );
    }
  },
  {
    title: 'Day',
    dataIndex: 'day',
    key: 'day',
    render: text => <a>{text}</a>
  },
  {
    title: 'Check In',
    dataIndex: 'check_in',
    key: 'check_in',
    render: text => <a className="center">{TimeFormatHMM(text)}</a>
  },
  {
    title: 'Check Out',
    dataIndex: 'check_out',
    key: 'check_out',
    render: text => <a className="center">{TimeFormatHMM(text)}</a>
  },
  {
    title: 'Shift Status',
    dataIndex: 'shift',
    key: 'shift',
    render: text => {
      return <div className="center">{shift(text)}</div>;
    }
  },
  {
    title: 'Worked Hours',
    dataIndex: 'worked_seconds',
    key: 'worked_seconds',
    render: text => <a className="center">{SecondIntoHours(text)}</a>
  }
];

interface FilterParams {
  currentPage: number;
  pageSize: number;
  month?: number | string;
  year?: number | string;
  start_date?: string | Date | null;
  end_date?: string | Date | null;
}

const shift = (value: any) => {
  switch (value) {
    case 'LEAVE':
      return '-';
    case null:
      return (
        <CheckCircleFilled style={{ color: Colors.SHIFT_ICON_BG_COLOR }} />
      );
    case 'HALF_SECOND':
      return <SecondHalf />;
    case 'HALF_FIRST':
      return <FirstHalf />;
    case 'FULL':
      return (
        <CheckCircleFilled style={{ color: Colors.SHIFT_ICON_BG_COLOR }} />
      );
  }
};

const Attendance = () => {
  const [startDate, setStartDate] = useState<Date | null | string>();
  const [endDate, setEndDate] = useState<Date | null | string>();
  const [dateRange, setDateRange] = useState<boolean>(false);
  const [month, setMonth] = useState<any>(getCurrentMonth());
  const [year, setYear] = useState<any>(null);
  const [dateRangeValue, setDateRangeValue] = useState<any>([]);
  const [openDrawer, setDrawerOpen] = useState(false);
  const [attendanceInfoData, setAttendanceInfoData] = useState<any>();
  const [openAttendanceDetails, setAttendanceDetails] = useState(false);
  const [data, setData] = useState<any>(null);

  const attendanceAPI = new AttendanceAPI();

  const { RangePicker } = DatePicker;

  const handleTableRowClick = async (record: any) => {
    setAttendanceInfoData(dayjs(record.date).format('YYYY-MM-DD'));
    setDrawerOpen(true);
  };

  async function fetchAttendanceData() {
    const queryParams: any = {
      date: attendanceInfoData
    };
    const data = await attendanceAPI.attendence(queryParams);
    setData(data);
  }

  useEffect(() => {
    if (openDrawer) {
      fetchAttendanceData();
    }
  }, [openDrawer]);

  const onClose = () => {
    setDrawerOpen(false);
  };
  const [filterParams, setFilterParams] = useState<FilterParams>({
    currentPage: INITIAL_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    month: month,
    year: !dateRange ? getCurrentYear() : year,
    start_date: '',
    end_date: ''
  });

  const queryList = useQuery(
    [
      'attendenceList',
      {
        page: filterParams.currentPage,
        limit: filterParams.pageSize,
        month: filterParams.month,
        year: filterParams.year,
        start_date: filterParams.start_date,
        end_date: filterParams.end_date
      }
    ],
    async () => {
      let { month, year, start_date, end_date } = filterParams;
      const queryParams: any = {
        page: filterParams.currentPage,
        limit: filterParams.pageSize
      };
      if (month) queryParams.month = month;
      if (year) queryParams.year = year;
      if (start_date) queryParams.start_date = DateFormatYMD(startDate);
      if (end_date) queryParams.end_date = DateFormatYMD(endDate);
      const response = await attendanceAPI.attendenceSummaryList(queryParams);
      return response?.data?.data;
    }
  );
  const attendanceList = queryList?.data;
  const metaData = queryList?.data?.meta_data;

  const handleSearch = (e: any) => {
    setFilterParams(prevState => ({
      ...prevState,
      currentPage: INITIAL_CURRENT_PAGE,
      start_date: startDate,
      end_date: endDate,
      year: !dateRange
        ? year
          ? dayjs(year).format('YYYY')
          : getCurrentYear()
        : '',
      month: !dateRange ? (month ? month : getCurrentMonth()) : ''
    }));
    dateRange && setAttendanceDetails(true);
  };

  function handleReset() {
    setFilterParams(prev => ({
      ...prev,
      currentPage: INITIAL_CURRENT_PAGE,
      year: getCurrentYear(),
      month: getCurrentMonth(),
      start_date: null,
      end_date: null
    }));
    setYear(null);
    setMonth('');
    setStartDate(null);
    setEndDate(null);
    setDateRange(false);
    setDateRangeValue([]);
    setAttendanceDetails(false);
  }

  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      setMonth('');
      setYear(null);
      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]);
      setDateRange(true);
      setDateRangeValue(dates);
    }
  };

  let totalWorkedSecond = 0;
  attendanceList?.attendanceSummary?.map((data: any) => {
    if (data.worked_seconds)
      totalWorkedSecond = totalWorkedSecond + parseInt(data.worked_seconds);
  });
  const currentYear = dayjs().year();

  const handleChange = (page: any, pageSize: any) => {
    setFilterParams({
      ...filterParams,
      currentPage: page
    });
  };
  return (
    <>
      <PayrollSummaryContainer>
        <PageHeader>
          <PageHeaderNaviagtion>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link href="/dashboard">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Attendence</Breadcrumb.Item>
            </Breadcrumb>
            <TitleContent>
              <h2>Attendence</h2>
            </TitleContent>
          </PageHeaderNaviagtion>
          <SearchBar>
            <Form>
              <SearchBarContentRedisgn>
                <Select
                  value={!!month ? month : getCurrentMonth()}
                  options={MONTH_SELECT}
                  onChange={value => setMonth(value)}
                  disabled={dateRangeValue.length > 0 ? true : false}
                  placeholder="Select Month"
                />

                <DatePicker
                  picker="year"
                  value={!!year ? year : dayjs(`${currentYear}-01-01`)}
                  onChange={dateStrings => setYear(dateStrings)}
                  disabled={dateRangeValue.length > 0 ? true : false}
                />
                <SelectDateRange>
                  <RangePicker
                    allowClear={true}
                    autoComplete="false"
                    presets={rangePresets}
                    onChange={onRangeChange}
                    value={dateRangeValue}
                    style={{ width: '100%' }}
                  />
                </SelectDateRange>
                <Button danger onClick={handleReset}>
                  Reset
                </Button>
                <Button
                  type="primary"
                  style={{ boxShadow: 'none' }}
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </SearchBarContentRedisgn>
            </Form>
          </SearchBar>
        </PageHeader>
        <TableBodyContainer style={{ minHeight: '100vh' }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <Col span={!!openAttendanceDetails ? 18 : 24}>
              <Table
                className="attendanceTable"
                columns={attendanceListColumns}
                dataSource={attendanceList?.attendanceSummary}
                scroll={{ x: 1000 }}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: event => {
                      handleTableRowClick(record);
                    }
                  };
                }}
                pagination={
                  attendanceList?.count > 10 && {
                    defaultPageSize: 1,
                    total: metaData?.total_items,
                    hideOnSinglePage: true,
                    showSizeChanger: true,
                    className: 'bg-white-halfrem',
                    responsive: true,
                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`,
                    onChange: (page, pageSize) => {
                      setFilterParams({
                        ...filterParams,
                        currentPage: page,
                        pageSize
                      });
                    }
                  }
                }
              />
            </Col>
            {!!openAttendanceDetails && (
              <AttendanceDetailsCard
                working_days={attendanceList?.count}
                working_hours={SecondIntoHours(totalWorkedSecond)}
              />
            )}
          </Row>
        </TableBodyContainer>
        <DashboardDrawer
          openDrawer={openDrawer}
          onClose={onClose}
          in_at={data?.data.data.in_at}
          out_at={data?.data.data.out_at}
          logs={data?.data.data.logs}
          date={attendanceInfoData}
        />
        <PageFooter />
      </PayrollSummaryContainer>
    </>
  );
};

export default Attendance;

const PayrollSummaryContainer = styled.div`
  height: 100vh;
`;

const SearchBarContentRedisgn = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: auto auto;
  }
  gap: 10px;
  padding: 16px;
`;

const SelectDateRange = styled.div`
  grid-area: 1 / 3 / auto / span 2;
  @media (max-width: 768px) {
    grid-column: span 2;
  }
`;
