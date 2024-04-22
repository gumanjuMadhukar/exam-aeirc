import styled from "styled-components";
import { Row, Col, Button, Radio, Space, RadioChangeEvent, Card } from "antd";
import PageFooter from "./layout/page-footer";
import PageHeader from "./layout/page-header";
import { useState } from "react";

const Student: NextPageWithLayout = (): JSX.Element => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  return (
    <>
      <PageHeader />
      <DashboardContainer>
        <QuestionContainer>
          <Row>
            <Col span={18} style={{ padding: "40px" }}>
              <Row>
                <Col span={24}>
                  <TitleText> Hello this is nepal</TitleText>
                </Col>
                <Col
                  span={24}
                  style={{
                    paddingLeft: "30px",
                    paddingTop: "10px",
                    fontSize: "20px",
                  }}
                >
                  <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                      <Radio
                        value={1}
                        style={{
                          paddingTop: "10px",
                          fontSize: "20px",
                        }}
                      >
                        Option A
                      </Radio>
                      <Radio
                        value={2}
                        style={{
                          paddingTop: "10px",
                          fontSize: "20px",
                        }}
                      >
                        Option B
                      </Radio>
                      <Radio
                        value={3}
                        style={{
                          paddingTop: "10px",
                          fontSize: "20px",
                        }}
                      >
                        Option C
                      </Radio>
                      <Radio
                        value={3}
                        style={{
                          paddingTop: "10px",
                          fontSize: "20px",
                        }}
                      >
                        Option D
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Col>
                <Col
                  span={24}
                  style={{
                    marginTop: "4em",
                  }}
                >
                  <Button
                    style={{
                      float: "right",
                      fontSize: "16px",
                    }}
                    size="large"
                    type="primary"
                  >
                    Next
                  </Button>
                  <Button
                    style={{
                      float: "right",
                      fontSize: "16px",
                      color: "red",
                      marginLeft: "10px",
                      marginRight: "10px",
                      border: "1px solid red",
                    }}
                    size="large"
                    ghost
                  >
                    Prev
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col span={6} style={{ paddingRight: "20px" }}>
              <Card title="Card title" bordered={false}>
                <Box></Box>
              </Card>
            </Col>
          </Row>
        </QuestionContainer>
        <PageFooter />
      </DashboardContainer>
    </>
  );
};

export default Student;

const DashboardContainer = styled.div`
  background-color: #f0f2f5;
  margin-top: 150px;
`;

const QuestionContainer = styled.div``;

const TitleText = styled.div`
  font-size: 32px;
  letter-spacing: 2px;
  padding: 10px;
`;

const Box = styled.div``;
