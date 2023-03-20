import { Col, Modal, Row, Tag } from 'antd';
import styled from 'styled-components';
import { Colors } from 'utils/colors';
import { DateFormatYMD } from 'utils/DateFormat';
import { calculateDifferenceBetweenTwoDates } from 'utils/dateTime';
import { LeaveStatus } from 'utils/enums';

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  selectedLeave: any;
}

const ViewLeaveModal = ({
  handleCancel,
  isModalOpen,
  selectedLeave
}: Props) => {
  const diff = selectedLeave
    ? calculateDifferenceBetweenTwoDates(
        selectedLeave?.end_date,
        selectedLeave?.start_date,
        selectedLeave?.shift
      )
    : '';
  return (
    <Modal
      title={<LeaveModalTitle>Leave Details</LeaveModalTitle>}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <DetailItem gutter={30}>
        <DetailLabel xs={8}>Leave Type:</DetailLabel>
        <DetailValue xs={16}>{selectedLeave?.leaveType?.name}</DetailValue>
        <DetailLabel xs={8}>Leave From:</DetailLabel>
        <DetailValue xs={16}>
          {DateFormatYMD(selectedLeave?.start_date)}
        </DetailValue>
        <DetailLabel xs={8}>Leave To:</DetailLabel>
        <DetailValue xs={16}>
          {DateFormatYMD(selectedLeave?.end_date)}
        </DetailValue>
        <DetailLabel xs={8}>Shift:</DetailLabel>
        <DetailValue xs={16}>{selectedLeave?.shift}</DetailValue>
        <DetailLabel xs={8}>No. of Days:</DetailLabel>
        <DetailValue xs={16}>{diff}</DetailValue>
        <DetailLabel xs={8}>Reason:</DetailLabel>
        <DetailValue xs={16}>{selectedLeave?.reason}</DetailValue>
        {selectedLeave?.reject_reason && (
          <>
            <DetailLabel xs={8}>Reject Reason:</DetailLabel>
            <DetailValue xs={16}>{selectedLeave?.reject_reason}</DetailValue>
          </>
        )}
        <DetailLabel xs={8}>Leave Status:</DetailLabel>
        <DetailValue xs={16}>
          <StatusSpan>
            <Tag
              color={
                selectedLeave?.leaveStatus?.name === LeaveStatus.APPROVED
                  ? 'green'
                  : selectedLeave?.leaveStatus?.name === LeaveStatus.PENDING
                  ? 'blue'
                  : 'red'
              }
            >
              {selectedLeave?.leaveStatus?.alias}
            </Tag>
          </StatusSpan>
        </DetailValue>
      </DetailItem>
    </Modal>
  );
};

export default ViewLeaveModal;

const DetailItem = styled(Row)`
  width: 100%;
`;

const DetailValue = styled(Col)`
  font-weight: 600;
  margin-bottom: 10px;
`;

const LeaveModalTitle = styled.div``;

const StatusSpan = styled.span`
  font-size: 12px;
  font-weight: normal;
`;

const DetailLabel = styled(Col)`
  color: ${Colors.LIGHT_BLACK_COLOR};
`;