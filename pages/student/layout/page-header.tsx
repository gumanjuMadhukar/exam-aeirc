import { Col, Row } from "antd";
import styled from "styled-components";
import Clock from "utils/clock";

const PageHeader = () => {
  return (
    <PageHeaderNaviagtion>
      <Row justify="space-between" gutter={[16, 24]}>
        <Col span={8}>
          <img
            src="profile-default.png"
            style={{ border: "1px solid black" }}
          ></img>
        </Col>
        <Col
          span={8}
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginTop: "25px",
            fontSize: "25px",
          }}
        >
          18 / 100 Question
        </Col>
        <Col
          span={8}
          style={{
            textAlign: "right",
            fontWeight: "bold",
            marginTop: "20px",
            fontSize: "25px",
          }}
        >
          <Clock />
        </Col>
      </Row>
    </PageHeaderNaviagtion>
  );
};

export default PageHeader;

const PageHeaderNaviagtion = styled.div`
  top: 0;
  position: fixed;
  width: 100%;
  background: #fff;
  padding: 5px;
`;
