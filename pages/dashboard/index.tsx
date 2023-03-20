import styled from "styled-components";
import { Card, Row, Col, Button, Skeleton, ConfigProvider } from "antd";
import {
  LoginOutlined,
  LogoutOutlined,
  InfoCircleFilled,
} from "@ant-design/icons";
import CheckInfo from "components/check-info";
import { useEffect, useRef, useState } from "react";
import { DATE_OPTIONS } from "constants/common";
import CheckInOutModal from "components/dashboard/CheckInOutModal";
import DashboardDrawer from "components/dashboard/DashboardDrawer";
import { useQuery } from "react-query";
import { getMyAttendence } from "apis/dashboard";
import { addTimes } from "utils/dateTime";
import { Colors } from "utils/colors";
import dayjs from "dayjs";
import { duration } from "moment";
import Cookies from "js-cookie";
import PageFooter from "components/layout/page-footer";

const Dashboard: NextPageWithLayout = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDrawer, setDrawerOpen] = useState(false);
  const [toggleCheckInOutButton, setToggleCheckInOutButton] = useState(false);
  const [hover, setHover] = useState(false);
  const [username, setUsername] = useState<string | any>();

  return (
    <>
      <DashboardContainer>
        <CardsContainer>
          <h1>Welcome, !</h1>
          <Row justify="space-between" gutter={[16, 24]}>
            <Col span={8}>
              {/* <Card
                title={<div style={{ fontWeight: '700' }}>Card Title</div>}
                bordered={false}
                hoverable={true}
                headStyle={{ borderBottom: 'none' }}
                bodyStyle={{ paddingTop: '0' }}
              >
                <p>Card Content Here </p>
                <p>Card Content Here </p>
                <p>Card Content Here </p>
                <p>Card Content Here </p>
              </Card> */}{" "}
            </Col>
            <Col lg={10} sm={24} md={24}></Col>
          </Row>
        </CardsContainer>
        <PageFooter />
      </DashboardContainer>
    </>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
  background-color: #f0f2f5;
  height: 100vh;
`;
const CardsContainer = styled.div`
  padding: 20px;
  height: 100vh;
`;
const CheckInfoContainer = styled.div`
  display: grid;
  grid-template-columns: auto 2px auto 2px auto;
  grid-column-gap: 5px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    grid-template-columns: auto 1px auto 1px 20px;
  }
`;

const CheckDivider = styled.div`
  border: 1px solid #eeeeee;
  margin-right: 5px;
`;
const CheckInOutBar = styled.div`
  position: fixed;
  bottom: 0;
  background: #fff;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 100vw;
`;
const CheckbarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 260px;
  @media (max-width: 576px) {
    margin-right: 120px;
  }
  position: relative;
  padding-right: 20px;
  gap: 20px;
  flex-wrap: wrap;
`;
