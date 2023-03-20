import { Table, Image, Tooltip, Button, Popover } from 'antd';
import { useQuery, useQueryClient } from 'react-query';
import { useState } from 'react';
import { PageHeaderWrapper } from 'styles/authCSS';
import PageHeader from 'components/layout/page-header';
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from 'constants/common';
import { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';
import AttendenceFilter from 'components/attendence/employee/AttendenceFilter';
import { getAllAttendance, getAttendenceOfUser } from 'apis/admin/attendance';
import { getDaysInMonth } from 'utils/jsxdateTiem';
import DashboardDrawer from 'components/dashboard/DashboardDrawer';
import { imageFullPath, truncateText } from 'utils/helpers';
import { UnorderedListOutlined } from '@ant-design/icons';

import { getCurrentMonth } from 'utils/DateFormat';
import {
  FirstHalf,
  FullDay,
  Holiday,
  Leave,
  SecondHalf,
  Weekend
} from 'utils/icon';
import { DetailLabel } from 'styles/profileInformation';
import { Colors } from 'utils/colors';
import ViewLegendsModal from 'components/attendance/ViewLegends';
import ViewLegends from 'components/attendance/ViewLegends';

const HeaderItems = [
  {
    name: 'Attendance Overview',
    link: ''
  }
];

export interface FilterParams {
  currentPage: number;
  pageSize: number;
  month: string | undefined;
  year: string | undefined;
  search: string;
  order: string;
}

export interface UserAttendanceFilterParams {
  employeeId?: string;
  date: string;
  userDetails: any;
  textToBeDisplayed?: JSX.Element | string;
}

const Attendence = () => {
  const queryClient = useQueryClient();
  const [openDrawer, setDrawerOpen] = useState(false);

  const [filterParams, setFilterParams] = useState<FilterParams>({
    currentPage: INITIAL_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    month: getCurrentMonth().toString(),
    year: new Date().getFullYear().toString(),
    search: '',
    order: 'ASC'
  });

  const [currentUser, setCurrentUser] = useState<UserAttendanceFilterParams>({
    employeeId: '',
    date: '',
    userDetails: {},
    textToBeDisplayed: ''
  });

  const { data: attendanceData, isLoading } = useQuery(
    [
      'getAttendenceOfUser',
      {
        employeeId: currentUser.employeeId,
        date: currentUser.date
      }
    ],
    async () => {
      const queryParams = {
        date: currentUser.date,
        employeeId: currentUser.employeeId,
        userDetails: currentUser
      };
      const response = await getAttendenceOfUser(queryParams);
      return response?.data?.data;
    },
    { enabled: Boolean(currentUser.employeeId) }
  );

  const { data: allAttendance } = useQuery(
    ['allAttendance', filterParams],
    async () => {
      const queryParams: any = {
        page: filterParams.currentPage,
        limit: filterParams.pageSize
      };
      queryParams.month = filterParams.month
        ? filterParams.month
        : getCurrentMonth().toString();
      if (filterParams.year) queryParams.year = filterParams.year;
      if (filterParams.search) queryParams.search = filterParams.search;
      queryParams.sortBy = 'NAME';
      if (filterParams.order) queryParams.order = filterParams.order;

      const data = await getAllAttendance(queryParams);

      if (data.status === 200) {
        data?.data?.data?.employees?.forEach((emp: any) => {
          emp.leave.push({ holidays: data?.data?.data?.holidays ?? [] });
        });
      }

      return {
        data: data.data
      };
    }
  );

  const attendanceList = allAttendance?.data?.data?.employees;

  const attendanceMetaData = allAttendance?.data?.data?.meta_data;

  const onClose = () => {
    queryClient.invalidateQueries([
      'getAttendenceOfUser',
      {
        employeeId: currentUser.employeeId,
        date: currentUser.date
      }
    ]);
    setDrawerOpen(false);
  };

  const handleCurrentUser = (
    userDetails: any,
    day: string,
    textToBeDisplayed: JSX.Element | string
  ) => {
    const month = filterParams.month || getCurrentMonth();
    const year = filterParams.year;
    setCurrentUser({
      employeeId: userDetails.id,
      date: `${year}-${month}-${day}`,
      userDetails: userDetails,
      textToBeDisplayed
    });
    setDrawerOpen(true);
  };

  const attendanceListColumns: ColumnsType<any> = [
    {
      title: 'Employee',
      key: 'name',
      render: employee => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Image
            width={32}
            alt="avatar"
            src={imageFullPath(
              employee.profile_picture,
              '/images/default_profile_picture.jpeg'
            )}
            preview={false}
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
              height: 32,
              width: 32,
              objectPosition: 'center',
              display: 'inline-block'
            }}
          />
          <div
            style={{
              marginLeft: '1rem',
              display: 'inline-block',
              fontWeight: '700',
              width: '200px' /* Set the width of the container */,
              overflow: 'hidden' /* Hide the overflowing text */,
              whiteSpace: 'nowrap'
            }}
          >
            <Tooltip placement="top" title={employee.name}>
              <p className="truncate m-0">{truncateText(employee.name)}</p>
            </Tooltip>
          </div>
        </div>
      ),
      responsive: ['sm'],
      sorter: a => {},
      width: 200,
      fixed: 'left'
    },
    ...(getDaysInMonth(
      filterParams.month ?? getCurrentMonth().toString(),
      filterParams.year ?? new Date().getFullYear().toString(),
      handleCurrentUser,
      attendanceList || []
    ) as any),
    {
      title: 'Working Days',
      dataIndex: 'total',
      key: 'total',
      width: 100,
      render: total => {
        return <strong>{total}</strong>;
      },
      responsive: ['sm'],
      className: 'total-title'
    }
  ];

  return (
    <div>
      <PageHeaderWrapper>
        <PageHeader
          items={HeaderItems}
          titleContent="Attendance Overview"
          buttonLabel=""
        />
      </PageHeaderWrapper>
      <div style={{ marginTop: '2rem' }}>
        <AttendenceFilter
          filterParams={filterParams}
          setFilterParams={setFilterParams}
        />
      </div>

      <div className="attendance-legends">
        <div className="attendance-legends-row">
          <div className="display-flex text-align-left">
            {/* <ViewLegends /> */}
            <Popover
              placement="bottomRight"
              title={'Legends'}
              content={ViewLegends}
              // open={true}
              // arrow={mergedArrow}
            >
              <Button icon={<UnorderedListOutlined />}>View Legends</Button>
            </Popover>
          </div>
        </div>
      </div>
      <AttendanceTableWrapper>
        <TableWrapper
          columns={attendanceListColumns}
          bordered
          dataSource={attendanceList}
          scroll={{ y: 600, x: 3000 }}
          onChange={(a, b, sorter: any) => {
            setFilterParams({
              ...filterParams,
              order: sorter.order === 'descend' ? 'DESC' : 'ASC'
            });
            return;
          }}
          pagination={
            attendanceMetaData?.total_items > 10 && {
              defaultPageSize: DEFAULT_PAGE_SIZE,
              total: attendanceMetaData?.total_items,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              onChange: (page, pageSize) => {
                setFilterParams({
                  ...filterParams,
                  currentPage: page,
                  pageSize
                });
              },
              className: 'bg-white-halfrem'
            }
          }
        />
      </AttendanceTableWrapper>
      {!isLoading && (
        <DashboardDrawer
          openDrawer={openDrawer}
          onClose={onClose}
          in_at={attendanceData?.in_at}
          out_at={attendanceData?.out_at}
          logs={attendanceData?.logs}
          date={currentUser.date}
          currentUser={currentUser}
        />
      )}
      {/* <ViewLegendsModal isModalOpen={true} /> */}
    </div>
  );
};

export default Attendence;

const AttendanceTableWrapper = styled.div`
  padding: 30px;
  padding-top: 0;
`;

const TableWrapper = styled(Table)`
  .ant-table {
    max-width: 100%;
    overflow-x: auto;
  }
`;

const LegendsText = styled.p`
  color: ${Colors.LIGHT_TEXT_COLOR};
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 12px;
    font-weight: 400;
  }
`;
