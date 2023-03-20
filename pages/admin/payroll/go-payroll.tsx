import styled from 'styled-components';
import { Menu, Card, Row, Col, Button, Radio, Skeleton } from 'antd';
import { useRouter } from 'next/router';
import { goPayrollTabItems } from 'constants/common';
import { useQuery } from 'react-query';
import { getCurrentPayrollInfo } from 'apis/admin/salary';
import {
  DateFormatDayMonthHalfNameYear,
  DateFormatMonthNameYear
} from 'utils/DateFormat';
import PageHeader from 'components/layout/page-header';
import { Colors } from 'utils/colors';

const HeaderItems = [
  {
    name: 'Payroll',
    link: ''
  },
  {
    name: 'Go Payroll',
    link: ''
  }
];

const buttonState = {
  VIEW: 'VIEW',
  DISABLED: 'DISABLED',
  CREATE: 'CREATE'
};

const GoPayroll = () => {
  const router = useRouter();

  const { data: currentPayrollInfo, isLoading } = useQuery(
    ['currentPayrollInfo'],
    async () => {
      const data = await getCurrentPayrollInfo();
      return data?.data?.data;
    }
  );

  if (isLoading) return <Skeleton />;

  const handleButtonClick = () => {
    router.push('payroll-summary');
  };

  return (
    <GoPayrollContainer>
      <PageHeader items={HeaderItems} titleContent="Go Payroll" />
      <StyledMenu
        selectedKeys={[(router.query.currentTab as string) || 'create-payroll']}
        mode="horizontal"
        items={goPayrollTabItems(router)}
      />
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
                  <Radio.Group value="current-payroll">
                    <Radio value="current-payroll" defaultChecked>
                      Current Payroll
                    </Radio>
                    <Radio value="withheld-payroll">Withheld Payroll</Radio>
                  </Radio.Group>
                </Row>

                <TextDetails>
                  Payment Date:{' '}
                  <span
                    style={{
                      fontWeight: 700,
                      display: 'flex',
                      justifyItems: 'flex-start'
                    }}
                  >
                    {' '}
                    {DateFormatDayMonthHalfNameYear(
                      currentPayrollInfo?.paymentDate
                    )}
                  </span>
                </TextDetails>
                <TextDetails>
                  No of Employees:{' '}
                  <span>{currentPayrollInfo?.employeeCount}</span>
                </TextDetails>
                <TextDetails>
                  Payroll Month:{' '}
                  <span>
                    {DateFormatMonthNameYear(currentPayrollInfo?.payrollMonth)}
                  </span>
                </TextDetails>

                <Row>
                  <AddButton
                    type="primary"
                    onClick={handleButtonClick}
                    className={
                      currentPayrollInfo?.buttonState === buttonState.DISABLED
                        ? 'disabled'
                        : ''
                    }
                    disabled={
                      currentPayrollInfo?.buttonState === buttonState.DISABLED
                        ? true
                        : false
                    }
                  >
                    {' '}
                    <span
                      style={{ textTransform: 'capitalize', paddingRight: 5 }}
                    >
                      {currentPayrollInfo?.buttonState === buttonState.DISABLED
                        ? 'Create'
                        : currentPayrollInfo?.buttonState?.toLowerCase()}
                    </span>{' '}
                    Payroll
                  </AddButton>
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
  margin-top: 20px;
  &.disabled {
    color: ${Colors.DISABLED};
    background: ${Colors.DISABLED_BG} !important;
  }
`;

const TextDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  line-height: 1.5em;
  margin-top: 15px;
`;

const StyledMenu = styled(Menu)`
  _selected: {
    border-bottom: black;
    color: black;
  }
`;
