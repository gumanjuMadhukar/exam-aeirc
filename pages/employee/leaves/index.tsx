import { message, Card, Typography, Table, Skeleton } from 'antd';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  applyLeave,
  leave,
  LeaveResponse,
  LeaveTypeResponse,
  leaveTypes,
  leaveDetails,
  deleteLeave
} from 'apis/leave';
import { useState } from 'react';
import { TableBodyContainer } from 'styles/styled/PageHeader';

import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import LeaveModal from 'components/leaves/Modal';
import { leaveListColumns } from 'components/leaves/LeaveTableColumn';
import { dataSetData, doughnutOptions, plugins } from 'utils/doughnutOptions';
import { ApplyLeaveModal } from 'components/leaves/ApplyLeaveModal';
import {
  calculateDifferenceBetweenTwoDates,
  totalAllotedLeaveCalculation
} from 'utils/dateTime';
import LeaveFilter from 'pages/admin/leaves/includes/LeaveFilter';
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from 'constants/common';
import dayjs from 'dayjs';
import { FilterParams } from 'pages/admin/leaves';
import { PageHeaderWrapper } from 'styles/authCSS';
import PageHeader from 'components/layout/page-header';
import ViewLeaveModal from 'components/leaves/ViewLeaveSummary';
import ConfirmModal from 'components/ConfirmModal';
import { Colors } from 'utils/colors';
import { ExclamationOutlined, PlusOutlined } from '@ant-design/icons';

Chart.register(ArcElement);

const { Text, Title } = Typography;

const HeaderItems = [
  {
    name: 'Home',
    link: ''
  },
  {
    name: 'Leave',
    link: ''
  }
];

export type LeaveCancelParams = {
  open: boolean;
  id: number | string;
};

function Leaves() {
  const [filterParams, setFilterParams] = useState<FilterParams>({
    currentPage: INITIAL_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    leaveTypeId: '',
    leaveStatusId: '',
    startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('month').format('YYYY-MM-DD')
  });

  const deleteLeaveMutation = useMutation((id: number | string) =>
    deleteLeave(id)
  );

  const { data: leavesTypesData } = useQuery('leavesTypes', leaveTypes);

  const leaveTypesResp: LeaveTypeResponse[] | undefined =
    leavesTypesData?.data?.data;

  const { data: leaveData } = useQuery(['leave', filterParams], () => {
    const queryParams: any = {
      page: filterParams.currentPage,
      limit: filterParams.pageSize,
      start_date: filterParams.startDate,
      end_date: filterParams.endDate
    };
    if (filterParams.leaveTypeId)
      queryParams.leaveTypeId = filterParams.leaveTypeId;
    if (filterParams.leaveStatusId)
      queryParams.leaveStatusId = filterParams.leaveStatusId;

    return leave(queryParams);
  });

  const { data: leaveDetailsData } = useQuery('leaveDetails', leaveDetails);

  const applyLeaveMutation = useMutation((data: ApplyLeavesPayload) =>
    applyLeave(data)
  );

  const leaveTaken = leaveDetailsData?.data?.data?.leavesTotal;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLeaveViewModalOpen, setIsLeaveViewModalOpen] = useState<any>(false);
  const [isOpenCloseSummaryModal, setIsOpenCloseSummaryModal] =
    useState<boolean>(false);
  const [isLeaveCancelModal, setIsLeaveCancelModal] =
    useState<LeaveCancelParams>({
      open: false,
      id: ''
    });
  const queryClient = useQueryClient();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openCloseSummaryModal = () => {
    setIsOpenCloseSummaryModal(!isOpenCloseSummaryModal);
  };

  const handleCloseLeaveCancel = () => {
    setIsLeaveCancelModal({
      ...isLeaveCancelModal,
      open: !isLeaveCancelModal
    });
  };

  const handleViewModalToggle = (id: string | boolean) => {
    isLeaveViewModalOpen || !id
      ? setIsLeaveViewModalOpen(false)
      : setIsLeaveViewModalOpen(id);
  };

  const onFinish = (data: ApplyLeavesPayload) => {
    const newData = {
      ...data,
      start_date: data?.data_range[0]?.format('YYYY-MM-DD'),
      end_date: data?.data_range[1]?.format('YYYY-MM-DD')
    };
    delete newData.data_range;

    applyLeaveMutation.mutate(newData, {
      onSuccess: () => {
        handleCancel();
        queryClient.invalidateQueries(['leave', filterParams]);
        queryClient.invalidateQueries(['leaveDetails']);
        message.success('Leave Applied Successfully');
      },
      onError: (data: any) => {
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage);
      }
    });
  };

  const leaveTypesOption = leavesTypesData?.data.data.length
    ? leavesTypesData?.data?.data?.map((item: LeaveTypeResponse) => ({
        label: item.alias,
        value: item.id,
        allotedDays: item.alloted_days
      }))
    : [];

  const totalLeavesTaken = {} as any;

  leaveData?.data?.data.forEach(item => {
    if (item.leaveStatus.name === 'APPROVED') {
      if (item.shift === 'FULL') {
        totalLeavesTaken[item.leaveType.name] = {
          taken:
            (totalLeavesTaken[item.leaveType.name]?.taken || 0) +
            calculateDifferenceBetweenTwoDates(
              item.end_date,
              item.start_date,
              item.shift
            ),
          total: item.leaveType.alloted_days
        };
      }
      if (item.shift.includes('HALF_')) {
        totalLeavesTaken[item.leaveType.name] = {
          taken: (totalLeavesTaken[item.leaveType.name]?.taken || 0) + 0.5,
          total: item.leaveType.alloted_days
        };
      }
    }
  });

  const onConfirmDelete = () => {
    let leaveId = isLeaveCancelModal?.id;
    deleteLeaveMutation.mutate(leaveId, {
      onSuccess: () => {
        queryClient.invalidateQueries(['leave', filterParams]);
        message.success('Leave Cancelled Successfully');
        setIsLeaveCancelModal({
          open: false,
          id: ''
        });
      },
      onError: (data: any) => {
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage);
      }
    });
  };

  if (Object.keys(totalLeavesTaken).length === 0 && !leaveData)
    return <Skeleton />;

  return (
    <div>
      <PageHeaderWrapper>
        <PageHeader
          items={HeaderItems}
          titleContent="Leaves"
          buttonLabel="Apply Leave"
          buttonCb={showModal}
          icon={<PlusOutlined />}
          secondButtonLabel="Leave Summary"
          secondButtonCb={openCloseSummaryModal}
        />
      </PageHeaderWrapper>
      <ApplyLeaveModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onFinish={onFinish}
        leaveTypesOption={leaveTypesOption}
      />

      <div
        style={{ display: 'flex', justifyContent: 'space-between' }}
        className="responsive-leave-display"
      >
        {['CASUAL', 'SICK'].map((leaveType, idx) => (
          <div
            style={{ width: '50%' }}
            className="responsive-leave-graph"
            key={idx}
          >
            <Card
              style={{ margin: '25px', marginRight: idx === 1 ? 25 : 0 }}
              key={leaveTypesOption[idx]?.label}
              className="responsive-leave-card"
            >
              <Text type="secondary">{leaveTypesOption[idx]?.label}</Text>
              <Title level={4}>
                {`
                ${totalLeavesTaken[leaveType]?.taken || 0} / ${
                  leaveTypesOption[idx]?.allotedDays +
                  totalAllotedLeaveCalculation(leaveType, leaveDetailsData)
                }
              `}
              </Title>
              <div>
                <Doughnut
                  data={dataSetData(
                    leaveTypesOption[idx]?.allotedDays +
                      totalAllotedLeaveCalculation(leaveType, leaveDetailsData),
                    totalLeavesTaken[leaveType]?.taken || 0
                  )}
                  options={doughnutOptions}
                  plugins={
                    plugins(
                      leaveTypesOption[idx]?.allotedDays +
                        totalAllotedLeaveCalculation(
                          leaveType,
                          leaveDetailsData
                        ) -
                        (totalLeavesTaken[leaveType]?.taken || 0)
                    ) as any
                  }
                />
              </div>
            </Card>
          </div>
        ))}
      </div>
      <LeaveFilter
        filterParams={filterParams}
        setFilterParams={setFilterParams}
        hideSearch={true}
      />
      <TableBodyContainer>
        <Table
          columns={leaveListColumns({
            handleViewModalToggle,
            setIsLeaveCancelModal
          })}
          scroll={{ x: 700 }}
          dataSource={leaveData?.data?.data}
          pagination={
            leaveData?.data?.data &&
            leaveData?.data?.data?.length > 10 && {
              defaultPageSize: 10,
              showSizeChanger: true,
              className: 'bg-white-halfrem',
              // total: leaveData.data?.metaData?.total_items,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              responsive: true
            }
          }
        />
      </TableBodyContainer>
      <LeaveModal
        handleCancel={handleViewModalToggle}
        isLeaveViewModalOpen={isLeaveViewModalOpen}
        selectedLeave={
          leaveData?.data?.data?.find(
            item => item.id == isLeaveViewModalOpen
          ) as LeaveResponse
        }
      />
      <ConfirmModal
        buttonTitle="Confirm"
        openCloseModal={handleCloseLeaveCancel}
        open={isLeaveCancelModal?.open}
        confirmText="cancel the leave"
        onConfirmModal={onConfirmDelete}
        icon={<ExclamationOutlined style={{ color: Colors.DANGER }} />}
      />
      <ViewLeaveModal
        handleCancel={openCloseSummaryModal}
        isModalOpen={isOpenCloseSummaryModal}
        leavesTypeData={leaveTaken}
      />
    </div>
  );
}

export default Leaves;
