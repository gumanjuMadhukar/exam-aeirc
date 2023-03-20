import { Col } from 'antd';
import styled from 'styled-components';

interface Props {
  working_days: number;
  working_hours: string | number;
}

const AttendanceDetailsCard = (props: Props) => {
  const { working_days, working_hours } = props;
  return (
    <>
      <Col span={5}>
        <TotalAttendanceDetailsContainer>
          <TotalAttendanceDetailsTitle>
            Total Attendance Details
          </TotalAttendanceDetailsTitle>
          <TotalAttendanceDetailsContent>
            <TextDetails>
              No. of Days:{' '}
              <span style={{ color: '#FF7000' }}>{working_days} days</span>
            </TextDetails>
            <TextDetails>
              No. Of Hours:{' '}
              <span style={{ color: '#FF7000', marginLeft: '35px' }}>
                {working_hours} hrs
              </span>
            </TextDetails>
          </TotalAttendanceDetailsContent>
        </TotalAttendanceDetailsContainer>
      </Col>
    </>
  );
};
export default AttendanceDetailsCard;

const TotalAttendanceDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 128px;
  background: #ffffff;
  border-radius: 2px;
`;
const TotalAttendanceDetailsTitle = styled.div`
  padding: 10px;
  width: 100%;
  height: 38px;
  color: #ffffff;
  background: #171f2e;
`;
const TotalAttendanceDetailsContent = styled.div`
  border-radius: 2px;
  padding: 0px 10px;
`;

const TextDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  line-height: 1.5em;
  padding-top: 15px;
`;
