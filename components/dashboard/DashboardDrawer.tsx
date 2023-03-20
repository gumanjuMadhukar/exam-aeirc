import {
  Card,
  Drawer,
  Typography,
  Row,
  Space,
  Col,
  theme,
  Divider
} from 'antd';
import {
  RightCircleOutlined,
  LogoutOutlined,
  LoginOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { calculateLogs } from 'utils/dateTime';
import { NO_RECORD } from 'constants/common';
import styled from 'styled-components';
import { Colors } from 'utils/colors';
dayjs.extend(localizedFormat);

const { Text } = Typography;

type currentUser = {
  userDetails: {
    name: string;
  };
  textToBeDisplayed?: JSX.Element | string;
  employeeId?: string;
  date: string;
};

type Props = {
  openDrawer: boolean;
  onClose: () => void;
  in_at: string;
  out_at: string;
  logs: {
    attendance_check_in: string;
    attendance_check_out: string | null;
    attendance_in_comment: string | null;
    attendance_out_comment: string | null;
    duration: string;
  }[];
  date?: string;
  currentUser?: currentUser;
};

function DashboardDrawer({
  openDrawer,
  onClose,
  in_at,
  out_at,
  logs = [],
  date,
  currentUser
}: Props) {
  const {
    token: { colorPrimary }
  } = theme.useToken();

  return (
    <Drawer
      placement="right"
      onClose={onClose}
      open={openDrawer}
      closeIcon={<RightCircleOutlined />}
    >
      <div>
        <Card style={{ width: '100%' }}>
          <TextHeading>{!!date ? '' : `Today's`} Attendance Info</TextHeading>{' '}
          <br />
          <TodayDateText>
            {dayjs(date).format('dddd, MMMM D YYYY')}
          </TodayDateText>
        </Card>

        <CustomizedSpace
          size="middle"
          direction="vertical"
          style={{ width: '100%' }}
        >
          {currentUser && (
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <h3 style={{ marginRight: '5px' }}>
                {currentUser?.userDetails.name}
              </h3>
              {currentUser?.textToBeDisplayed}
            </span>
          )}
          <Text type="secondary" style={{ fontSize: '16px' }}>
            Your Timesheet
          </Text>
          <BorderCard size="small">
            <Text type="secondary">Check-in at</Text>
            <br></br>
            <Text>{in_at ? dayjs(in_at).format('llll') : NO_RECORD}</Text>
          </BorderCard>
          <BorderCard size="small">
            <Text type="secondary">Check-out at</Text>
            <br></br>
            <Text>{out_at ? dayjs(out_at).format('llll') : NO_RECORD}</Text>
          </BorderCard>
          <BorderCard
            size="small"
            bodyStyle={{ background: 'rgb(235 234 234)' }}
          >
            <Text>Total Working Hours</Text>
            <br></br>
            <Text style={{ color: colorPrimary }}>
              {in_at && out_at ? calculateLogs(logs) : NO_RECORD}
            </Text>
          </BorderCard>
          <CustomDivider />
          <Text type="secondary" style={{ fontSize: '16px' }}>
            Your Activity
          </Text>
          {
            <>
              {logs.map((log, index) => (
                <>
                  {log.attendance_check_out && (
                    <Row
                      style={{ display: 'flex' }}
                      key={log.attendance_check_out}
                    >
                      <CustomizedColCheckOut>
                        <LogoutOutlined
                          style={{ fontSize: '2rem', color: '#F5222D' }}
                        />
                      </CustomizedColCheckOut>
                      <Col
                        style={{
                          flex: 0.8,
                          flexDirection: 'row'
                        }}
                      >
                        <TextHeadingActivity>
                          {log.attendance_out_comment
                            ? log.attendance_out_comment
                            : 'Out'}
                        </TextHeadingActivity>
                        <br></br>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {dayjs(log.attendance_check_out).format('LT')}
                        </Text>
                      </Col>
                      <CustomDivider />
                    </Row>
                  )}
                  {log.attendance_check_in && (
                    <Row
                      style={{ display: 'flex' }}
                      key={log.attendance_check_in}
                    >
                      <CustomizedColCheckIn>
                        <LoginOutlined
                          style={{ fontSize: '2rem', color: '#52C41A' }}
                        />
                      </CustomizedColCheckIn>

                      <Col
                        style={{
                          flex: 1,
                          flexDirection: 'row'
                        }}
                      >
                        <TextHeadingActivity>
                          {index === logs.length - 1 ? 'In' : 'Back'}
                        </TextHeadingActivity>

                        {log.attendance_in_comment && (
                          <>
                            <br />
                            <TextCommentActivity>
                              {log.attendance_in_comment}
                            </TextCommentActivity>
                          </>
                        )}
                        <br />
                        <Text type="secondary" style={{ fontSize: '.75rem' }}>
                          {dayjs(log.attendance_check_in).format('LT')}
                        </Text>
                      </Col>
                      <CustomDivider />
                    </Row>
                  )}
                </>
              ))}
            </>
          }
        </CustomizedSpace>
      </div>
    </Drawer>
  );
}

export default DashboardDrawer;

export const TextHeading = styled(Text)`
  font-weight: 700;
  font-size: 18px;
`;

export const TodayDateText = styled.div`
  color: ${Colors.RED};
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
`;

export const CustomizedSpace = styled(Space)`
  padding: 24px;
`;

export const TextMessage = styled.div`
  font-weight: 400;
  font-size: 14px;
`;

export const TextHeadingActivity = styled(Text)`
  font-weight: 700;
  font-size: 14px;
`;

export const TextCommentActivity = styled(Text)`
  font-size: 14px;
`;

export const CustomDivider = styled(Divider)`
  margin-bottom: 0px;
`;

export const CustomizedColCheckOut = styled(Col)`
   display: flex,
   justify-content: center;
   align-items: center;
   border-radius: 50%;
   padding: 10px;
   background: #FFF1F0;
   position: relative;
   top: 0px;
   bottom: 0px;
   margin-right:20px;
`;

export const CustomizedColCheckIn = styled(Col)`
   display: flex,
   justify-content: center;
   align-items: center;
   border-radius: 50%;
   padding: 10px;
   background: #F6FFED;
   position: relative;
   top: 0px;
   bottom: 0px;
   margin-right:20px;
`;

export const BorderCard = styled(Card)`
  border: 1px solid #dddddd;
`;
