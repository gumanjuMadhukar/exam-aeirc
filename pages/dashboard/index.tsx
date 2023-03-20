import styled from "styled-components";
import { Row, Col } from "antd";
import PageFooter from "components/layout/page-footer";

const Dashboard: NextPageWithLayout = (): JSX.Element => {
  return (
    <>
      <DashboardContainer>
        <CardsContainer>
          <h1>Welcome, !</h1>
          <Row justify="space-between" gutter={[16, 24]}>
            <Col span={8}></Col>
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
