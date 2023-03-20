import styled from 'styled-components';
import {
  Breadcrumb,
  Menu,
  Pagination,
  Card,
  Row,
  Col,
  Button,
  Radio,
} from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  PageHeader,
  PageHeaderNaviagtion,
  TitleContent
} from 'styles/styled/PageHeader';
import { goPayrollTabItems } from 'constants/common';

const GoPayroll = () => {
  const router = useRouter();

  return (
    <GoPayrollContainer>
      <PageHeader>
        <PageHeaderNaviagtion>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/dashboard">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Go Payroll</Breadcrumb.Item>
          </Breadcrumb>
          <TitleContent>
            <h2>Go Payroll</h2>
          </TitleContent>
          <StyledMenu
            selectedKeys={[
              (router.query.currentTab as string) || 'create-payroll'
            ]}
            mode="horizontal"
            items={goPayrollTabItems(router)}
          />
        </PageHeaderNaviagtion>
      </PageHeader>
      <GoPayrollContent>
        <CardsContainer>
          <Row justify="space-between">
            <Col>
              <Card
                bordered={false}
                hoverable={false}
                bodyStyle={{ padding: 10 }}
              >
                <Row>
                  <Radio.Group>
                    <Radio value="current-payroll">Current Payroll</Radio>
                    <Radio value="withheld-payroll">Withheld Payroll</Radio>
                  </Radio.Group>
                </Row>

                <TextDetails>Payment Date: <span style = {{ fontWeight: 700, display: 'flex', justifyItems:'flex-start' }}> 5 Jan 2023</span></TextDetails>
                <TextDetails>No of Employees: <span>42</span></TextDetails>
                <TextDetails>Payroll Month: <span>December 2022</span></TextDetails>

                <Row>
                  <AddButton type="primary"> Create Payroll</AddButton>
                </Row>
              </Card>
            </Col>
          </Row>
        </CardsContainer>
      </GoPayrollContent>
    </GoPayrollContainer>
  );
};

export default GoPayroll;

const GoPayrollContainer = styled.div``;

const GoPayrollContent = styled.div`
  background: #fff;
  width: auto;
  margin: 20px;
`;

const CardsContainer = styled.div`
  padding: 20px;
`;

const AddButton = styled(Button)`
  border-radius: 0px;
  box-shadow: none;
  width: 100%;
  margin-top:20px;
`;

const StyledPagination = styled(Pagination)`
  // position: absolute;
  // bottom: 24px;
  // right: 24px;
`;

const TextDetails = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    line-height: 1.5em;
    margin-top: 15px;
`;


const StyledMenu = styled(Menu)`
 _selected:{
  border-bottom: black;
  color:black;
 }
`;