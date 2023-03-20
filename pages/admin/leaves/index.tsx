import {
  Button,
  Table,
  Tag,
  Dropdown,
  Space,
  MenuProps,
  message,
  Pagination,
  Tooltip
} from 'antd';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  approveLeave,
  declineLeave,
  deleteLeave,
  getAllLeaves,
  LeaveDeclineBody,
  LeaveTypeResponse,
  leaveTypes
} from 'apis/leave';
import { useState } from 'react';
import { PageHeaderWrapper } from 'styles/authCSS';
import PageHeader from 'components/layout/page-header';
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from 'constants/common';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import {
  MoreOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationOutlined,
  PlusOutlined
} from '@ant-design/icons';
import ApplyLeaveModal from './includes/ApplyLeaveModal';
import ViewLeaveModal from './includes/ViewLeaveModal';
import ConfirmModal from 'components/ConfirmModal';
import LeaveDetails from './includes/LeaveDetails';
import LeaveFilter from './includes/LeaveFilter';
import styled from 'styled-components';
import { LeaveActionMenu, LeaveStatus } from 'utils/enums';
import { calculateDifferenceBetweenTwoDates } from 'utils/dateTime';
import { Colors } from 'utils/colors';
import ViewLeaveSummaryModal from 'components/leaves/ViewLeaveSummary';
import Link from 'next/link';

const HeaderItems = [
  {
    name: 'Leave',
    link: ''
  }
];

export interface FilterParams {
  currentPage: number;
  pageSize: number;
  leaveTypeId: string | undefined;
  leaveStatusId: string | undefined;
  search?: string;
  startDate: string;
  endDate: string;
}

function AdminLeave() {
  const queryClient = useQueryClient();

  const [isApplyLeaveModalOpen, setIsApplyLeaveModalOpen] = useState(false);
  const [isViewLeaveModalOpen, setIsViewLeaveModalOpen] = useState(false);
  const [isConfirmLeaveModalOpen, setIsConfirmLeaveModalOpen] = useState(false);
  const [isDeclineLeaveModalOpen, setIsDeclineLeaveModalOpen] = useState(false);
  const [isDeleteLeaveModalOpen, setIsDeleteLeaveModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveListDataType | null>(
    null
  );
  const [isOpenCloseSummaryModal, setIsOpenCloseSummaryModal] =
    useState<boolean>(false);

  const { data: leavesTypesData } = useQuery('leavesTypes', leaveTypes);

  const leaveTypesResp: LeaveTypeResponse[] | undefined =
    leavesTypesData?.data?.data;

  const approveLeaveMutation = useMutation((id: number) => approveLeave(id));
  const declineLeaveMutation = useMutation((body: LeaveDeclineBody) =>
    declineLeave(body)
  );
  const deleteLeaveMutation = useMutation((id: number) => deleteLeave(id));

  const [filterParams, setFilterParams] = useState<FilterParams>({
    currentPage: INITIAL_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    leaveTypeId: '',
    leaveStatusId: '',
    search: '',
    startDate: dayjs().startOf('year').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('year').format('YYYY-MM-DD')
  });

  const { data: allLeaves } = useQuery(['allLeaves', filterParams], () => {
    const queryParams: any = {
      page: filterParams.currentPage,
      limit: filterParams.pageSize
      // start_date: filterParams.startDate,
      // end_date: filterParams.endDate
    };
    if (filterParams.leaveTypeId)
      queryParams.leaveTypeId = filterParams.leaveTypeId;
    if (filterParams.leaveStatusId)
      queryParams.leaveStatusId = filterParams.leaveStatusId;
    if (filterParams.search) queryParams.search = filterParams.search;
    if (filterParams.startDate) queryParams.start_date = filterParams.startDate;
    if (filterParams.endDate) queryParams.end_date = filterParams.endDate;

    return getAllLeaves(queryParams);
  });

  const leavesList = allLeaves?.data?.data?.leaves;
  const leavesMetaData = allLeaves?.data?.data?.meta_data;

  const openCloseApplyLeaveModal = () => {
    setIsApplyLeaveModalOpen(!isApplyLeaveModalOpen);
  };

  const openCloseConfirmLeaveModal = () => {
    setIsConfirmLeaveModalOpen(!isConfirmLeaveModalOpen);
  };

  const openCloseDeclineLeaveModal = () => {
    setIsDeclineLeaveModalOpen(!isDeclineLeaveModalOpen);
  };

  const openCloseDeleteLeaveModal = () => {
    setIsDeleteLeaveModalOpen(!isDeleteLeaveModalOpen);
  };

  const openCloseViewLeaveModal = () => {
    setIsViewLeaveModalOpen(!isViewLeaveModalOpen);
    if (isViewLeaveModalOpen) {
      setSelectedLeave(null);
    }
  };

  const openCloseSummaryModal = () => {
    setIsOpenCloseSummaryModal(!isOpenCloseSummaryModal);
  };

  const onConfirmApprove = () => {
    let leaveId = selectedLeave?.id;
    approveLeaveMutation.mutate(leaveId, {
      onSuccess: () => {
        queryClient.invalidateQueries(['allLeaves', filterParams]);
        message.success('Leave Approve Successfully');
        openCloseConfirmLeaveModal();
      },
      onError: (data: any) => {
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage);
      }
    });
  };

  const onConfirmDecline = (rejectReason: string = '') => {
    let body = {
      reject_reason: rejectReason,
      leaveId: selectedLeave?.id
    };
    declineLeaveMutation.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries(['allLeaves', filterParams]);
        message.success('Leave Declined Successfully');
        openCloseDeclineLeaveModal();
      },
      onError: (data: any) => {
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage);
      }
    });
  };

  const onConfirmDelete = () => {
    let leaveId = selectedLeave?.id;
    deleteLeaveMutation.mutate(leaveId, {
      onSuccess: () => {
        queryClient.invalidateQueries(['allLeaves', filterParams]);
        message.success('Leave Cancelled Successfully');
        openCloseDeleteLeaveModal();
      },
      onError: (data: any) => {
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage);
      }
    });
  };

  const items: MenuProps['items'] = [
    ...(selectedLeave?.leaveStatus?.name === LeaveStatus.PENDING
      ? [
          {
            key: LeaveActionMenu.APPROVE,
            icon: <CheckOutlined />,
            label: 'Approve',
            onClick: () => openCloseConfirmLeaveModal()
          },
          {
            key: LeaveActionMenu.DECLINE,
            icon: <CloseOutlined />,
            label: 'Decline',
            onClick: () => openCloseDeclineLeaveModal()
          }
        ]
      : []),
    {
      key: LeaveActionMenu.VIEW,
      icon: <EyeOutlined />,
      label: 'View',
      onClick: () => openCloseViewLeaveModal()
    },
    ...(selectedLeave?.leaveStatus?.name !== LeaveStatus.REJECTED
      ? [
          {
            key: LeaveActionMenu.DELETE,
            icon: <DeleteOutlined />,
            label: 'Cancel',
            onClick: () => openCloseDeleteLeaveModal()
          }
        ]
      : [])
  ];

  const leaveListColumns: ColumnsType<any> = [
    {
      title: 'Employee',
      dataIndex: 'employee',
      key: 'employee',
      render: text => (
        <Link href={`employee/${text?.id}`} style={{ fontWeight: '600' }}>
          {text?.name}
        </Link>
      ),
      responsive: ['sm']
    },
    {
      title: 'Leave Type',
      dataIndex: 'leaveType',
      key: 'leaveType',
      render: text => <p>{text?.alias || 'N/A'}</p>,
      responsive: ['sm']
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      render: text => <p>{text || 'N/A'}</p>,
      responsive: ['sm']
    },
    {
      title: 'Status',
      dataIndex: 'leaveStatus',
      key: 'leaveStatus',
      render: (text, record) => (
        <>
          <Tag
            color={
              text?.name === LeaveStatus.APPROVED
                ? 'green'
                : text?.name === LeaveStatus.PENDING
                ? 'blue'
                : 'red'
            }
          >
            {text?.alias}
          </Tag>
        </>
      ),
      responsive: ['sm']
    },
    {
      title: 'No. of days',
      dataIndex: 'days',
      key: 'days',
      render: (_, record) => {
        return (
          <p>
            {calculateDifferenceBetweenTwoDates(
              record.end_date,
              record.start_date,
              record.shift
            )}
          </p>
        );
      },
      responsive: ['sm']
    },
    {
      title: 'From',
      dataIndex: 'start_date',
      key: 'start_date',
      render: text => <p>{dayjs(text).format('YYYY-MM-DD')}</p>,
      responsive: ['sm']
    },
    {
      title: 'To',
      dataIndex: 'end_date',
      key: 'end_date',
      render: text => <p>{dayjs(text).format('YYYY-MM-DD')}</p>,
      responsive: ['sm']
    },
    {
      title: '',
      dataIndex: 'leaveStatus',
      key: 'leaveStatus',
      render: (text, record) => (
        <>
          <Dropdown menu={{ items }} trigger={['click']}>
            <a
              onClick={(e: any) => {
                e.preventDefault();
                setSelectedLeave(record);
              }}
            >
              <Space>
                <MoreOutlined />
              </Space>
            </a>
          </Dropdown>
          {/* )} */}
        </>
      ),
      responsive: ['sm']
    }
  ];

  return (
    <div>
      <PageHeaderWrapper>
        <PageHeader
          items={HeaderItems}
          titleContent="Leaves"
          buttonLabel="Apply Leave"
          icon={<PlusOutlined />}
          buttonCb={openCloseApplyLeaveModal}
          secondButtonLabel="Leave Summary"
          secondButtonCb={openCloseSummaryModal}
        />
      </PageHeaderWrapper>
      <LeaveDetails
        filterParams={filterParams}
        setFilterParams={setFilterParams}
      />
      <LeaveFilter
        filterParams={filterParams}
        setFilterParams={setFilterParams}
      />
      <LeaveTableWrapper>
        <Table
          columns={leaveListColumns}
          dataSource={leavesList}
          scroll={{ x: 1000 }}
          pagination={
            leavesMetaData?.total_items > 10 && {
              position: ['bottomRight'],
              defaultPageSize: 10,
              showSizeChanger: true,
              total: leavesMetaData?.total_items,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              onChange: (page, pageSize) => {
                setFilterParams({
                  ...filterParams,
                  currentPage: page,
                  pageSize
                });
              },
              responsive: true,
              className: 'bg-white-halfrem'
            }
          }
        />
      </LeaveTableWrapper>
      <ApplyLeaveModal
        isModalOpen={isApplyLeaveModalOpen}
        handleCancel={openCloseApplyLeaveModal}
        filterParams={filterParams}
      />
      <ViewLeaveModal
        isModalOpen={isViewLeaveModalOpen}
        handleCancel={openCloseViewLeaveModal}
        selectedLeave={selectedLeave}
      />
      <ConfirmModal
        buttonTitle="Approve"
        openCloseModal={openCloseConfirmLeaveModal}
        open={isConfirmLeaveModalOpen}
        confirmText="approve the leave"
        onConfirmModal={onConfirmApprove}
        icon={<CheckCircleOutlined style={{ color: Colors.SUCCESS }} />}
      />
      <ConfirmModal
        buttonTitle="Decline"
        openCloseModal={openCloseDeclineLeaveModal}
        open={isDeclineLeaveModalOpen}
        confirmText="decline the leave"
        onConfirmModal={(rejectReason?: string) =>
          onConfirmDecline(rejectReason)
        }
        icon={<CloseCircleOutlined style={{ color: Colors.DANGER }} />}
      />
      <ConfirmModal
        buttonTitle="Confirm"
        openCloseModal={openCloseDeleteLeaveModal}
        open={isDeleteLeaveModalOpen}
        confirmText="cancel the leave"
        onConfirmModal={onConfirmDelete}
        icon={<ExclamationOutlined style={{ color: Colors.DANGER }} />}
      />
      <ViewLeaveSummaryModal
        handleCancel={openCloseSummaryModal}
        isModalOpen={isOpenCloseSummaryModal}
        leavesTypeData={leaveTypesResp}
      />
    </div>
  );
}

export default AdminLeave;

const LeaveTableWrapper = styled.div`
  padding: 30px;
  padding-top: 0;
`;

export const ViewAction = styled.div`
  cursor: pointer;
`;
