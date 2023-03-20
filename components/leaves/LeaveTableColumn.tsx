import { Tag } from 'antd';
import { LeaveResponse } from 'apis/leave';
import dayjs from 'dayjs';
import { calculateDifferenceBetweenTwoDates } from 'utils/dateTime';
import { showTagColor } from 'utils/helpers';
import { LeaveCancelParams } from 'pages/employee/leaves';
import ViewDropDown from './ViewDropDown';

interface ILeaveListColumns {
  handleViewModalToggle: (id: string | boolean) => void;
  setIsLeaveCancelModal: (leaveCancel: LeaveCancelParams) => void;
}

export const leaveListColumns = ({
  handleViewModalToggle,
  setIsLeaveCancelModal
}: ILeaveListColumns) => [
  {
    title: 'Leave Type',
    dataIndex: ['leaveType', 'alias'],
    key: 'leaveType'
  },
  {
    title: 'Reason',
    dataIndex: 'reason',
    key: 'reason  '
  },
  {
    title: 'No. of days',
    key: 'noOfDays',
    render: (row: LeaveResponse) => (
      <p>
        {calculateDifferenceBetweenTwoDates(
          row.end_date,
          row.start_date,
          row.shift
        )}
      </p>
    )
  },
  {
    title: 'From',
    dataIndex: 'start_date',
    key: 'from',
    render: (from: string) => <p>{dayjs(from).format('DD MMM YYYY')}</p>
  },
  {
    title: 'To',
    dataIndex: 'end_date',
    key: 'to',
    render: (to: string) => <p>{dayjs(to).format('DD MMM YYYY')}</p>
  },
  {
    title: 'Leave Status',
    dataIndex: ['leaveStatus', 'name'],
    key: 'leaveStatus',
    render: (leaveStatus: string) => (
      <Tag color={showTagColor(leaveStatus)} key={leaveStatus}>
        {leaveStatus}
      </Tag>
    )
  },
  {
    title: 'Action',
    dataIndex: 'id',
    key: 'action',
    render: (id: string, record: LeaveResponse) => {
      return (
        <ViewDropDown
          handleViewModalToggle={handleViewModalToggle}
          id={id}
          record={record}
          setIsLeaveCancelModal={setIsLeaveCancelModal}
        />
      );
    }
  }
];
