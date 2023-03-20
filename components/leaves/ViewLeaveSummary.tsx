import { Col, Modal, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { LeaveTypeResponse, leaveTypes } from 'apis/leave';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { isMap } from 'util/types';
import { Colors } from 'utils/colors';
import { isAdmin, isSuperAdmin } from 'utils/roles';

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  leavesTypeData: LeaveTypeResponse[] | leavesProps[] | undefined;
}

interface leavesProps {
  possibleTotal: number;
  totalTaken: number;
}

const columns: ColumnsType<any> = [
  {
    title: 'Leave Type',
    dataIndex: 'leaveType',
    key: 'leaveType',
    render: text => <a>{text}</a>
  },
  {
    title: 'Balance',
    dataIndex: 'days',
    key: 'days'
  },
  {
    title: 'Total Taken',
    dataIndex: 'taken',
    key: 'taken'
  }
];

const ViewLeaveSummaryModal = ({
  handleCancel,
  isModalOpen,
  leavesTypeData
}: Props) => {
  const data = !isSuperAdmin()
    ? leavesTypeData &&
      Object?.entries(leavesTypeData).map(([key, value]) => ({
        key: key,
        leaveType: key,
        days: value.possibleTotal - (value.totalTaken || 0),
        taken: value.totalTaken || 0
      }))
    : leavesTypeData?.map((item, i) => {
        const { alias, alloted_days } = item as LeaveTypeResponse;
        return {
          key: i,
          leaveType: alias,
          days: alloted_days,
          taken: 0
        };
      });
  return (
    <Modal
      title={<LeaveModalTitle>Leave Summary</LeaveModalTitle>}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <StyledTable
        bordered
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </Modal>
  );
};

export default ViewLeaveSummaryModal;

const LeaveModalTitle = styled.div`
  font-weight: bold;
`;

const StyledTable = styled(Table)`
  margin-top: 25px;
  &.ant-table-wrapper .ant-table-thead > tr > th,
  &.ant-table-wrapper .ant-table-tbody > tr > td {
    padding: 10px 10px !important;
  }
  tr {
    th {
      background-color: ${Colors.PRIMARY} !important;
      color: ${Colors.WHITE} !important;
    }
    td {
      &:last-child {
        font-weight: bold;
      }
    }
  }
`;
