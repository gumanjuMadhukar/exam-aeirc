import { Dropdown, MenuProps } from 'antd';
import {
  EyeOutlined,
  EllipsisOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { LeaveResponse } from 'apis/leave';
import { LeaveStatus } from 'utils/enums';
import { LeaveCancelParams } from 'pages/employee/leaves';

interface IViewDropDown {
  handleViewModalToggle: (id: string) => void;
  id: string;
  record: LeaveResponse;
  setIsLeaveCancelModal: (leaveCancel: LeaveCancelParams) => void;
}

const ViewDropDown = ({
  handleViewModalToggle,
  id,
  record,
  setIsLeaveCancelModal
}: IViewDropDown) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <EyeOutlined />,
      label: 'View',
      onClick: () => handleViewModalToggle(id)
    },
    ...(record?.leaveStatus?.name === LeaveStatus.PENDING
      ? [
          {
            key: 2,
            icon: <DeleteOutlined />,
            label: 'Cancel',
            onClick: () =>
              setIsLeaveCancelModal({
                open: true,
                id
              })
          }
        ]
      : [])
  ];

  return (
    <Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
      <EllipsisOutlined className="rotate-90" />
    </Dropdown>
  );
};
export default ViewDropDown;

export const ViewAction = styled.div`
  cursor: pointer;
  font-size: 14px;
`;

export const ActionWrapper = styled.div``;
