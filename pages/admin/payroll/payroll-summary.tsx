import styled from 'styled-components';
import {
  Button,
  Input,
  Table,
  Card,
  Dropdown,
  Tag,
  Tooltip,
  Space,
  MenuProps,
  message
} from 'antd';

import {
  ArrowLeftOutlined,
  InfoCircleFilled,
  PauseCircleOutlined,
  RedoOutlined,
  CheckCircleOutlined,
  EllipsisOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from 'constants/common';
import {
  PageHeader,
  SearchBar,
  SearchBarContent,
  TableBodyContainer,
  TitleContent
} from 'styles/styled/PageHeader';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  getCurrentPayroll,
  publishPayroll,
  withHeldAndRevertSalary
} from 'apis/admin/salary';
import {
  DateFormaMonthFullNameYear,
  DateFormaMonthHalfNameYear,
  DateFormatDay
} from 'utils/DateFormat';
import { useRouter } from 'next/router';
import { Colors } from 'utils/colors';
import { MoreOutlined } from '@ant-design/icons';
import EditPayrollSalary from 'components/payroll/EditPayrollSalary';
import ConfirmModal from 'components/ConfirmModal';

interface FilterParams {
  currentPage: number;
  pageSize: number;
  search: string;
}

export interface FilterParamsReq {
  page: number;
  limit: number;
  search: string;
}

export interface WithheldAndRevertReqType {
  employeeId: number | null;
  date: Date;
}

const PayrollSummary = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isOpenEditSalary, setIsOpenEditSalary] = useState(false);
  const [isOpenWithholdSalary, setIsOpenWithholdSalary] = useState(false);
  const [isOpenPublishPayroll, setIsOpenPublishPayroll] = useState(false);
  const withheldSalaryMutation = useMutation((body: WithheldAndRevertReqType) =>
    withHeldAndRevertSalary(body)
  );
  const publishPayrollMutation = useMutation((body: string) =>
    publishPayroll()
  );

  const [selectedEmployee, setSelectedEmployee] =
    useState<PayrollSummaryListDataType>();

  const [searchValue, setSearchValue] = useState('');
  const [filterParams, setFilterParams] = useState<FilterParams>({
    currentPage: INITIAL_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    search: ''
  });

  const openCloseEditSalary = () => {
    setIsOpenEditSalary(!isOpenEditSalary);
  };

  const openCloseWithholdSalary = () => {
    setIsOpenWithholdSalary(!isOpenWithholdSalary);
  };

  const openClosePublishPayroll = () => {
    setIsOpenPublishPayroll(!isOpenPublishPayroll);
  };

  const { data: currentPayroll, isLoading } = useQuery(
    ['currentPayroll', filterParams],
    async () => {
      const queryParams: FilterParamsReq = {
        page: filterParams.currentPage,
        limit: filterParams.pageSize,
        search: filterParams.search
      };
      if (filterParams.search) queryParams.search = filterParams.search;

      const data = await getCurrentPayroll(queryParams);
      return data;
    }
  );

  const employeePaymentInfo = currentPayroll?.data?.data?.employeePaymentInfo;
  const payrollDetails = currentPayroll?.data?.data?.payrollDetails;

  const metaData = currentPayroll?.data?.meta_data;

  const handleSearch = () => {
    setFilterParams(prevState => ({
      ...prevState,
      currentPage: INITIAL_CURRENT_PAGE,
      search: searchValue
    }));
  };

  const handleReset = () => {
    setFilterParams(prev => ({
      ...prev,
      currentPage: INITIAL_CURRENT_PAGE,
      pageSize: DEFAULT_PAGE_SIZE,
      search: ''
    }));
    setSearchValue('');
  };

  const handleBackButtomClick = () => {
    router.push('go-payroll');
  };

  const onConfirmWithhold = () => {
    let body = {
      employeeId: selectedEmployee?.empId
        ? parseInt(selectedEmployee?.empId)
        : null,
      date: payrollDetails?.payrollMonth
    };
    withheldSalaryMutation.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries(['currentPayroll', filterParams]);
        message.success(
          `Salary withhold ${
            selectedEmployee?.withheld ? 'reverted' : ''
          } successfully`
        );
        openCloseWithholdSalary();
      },
      onError: (data: any) => {
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage);
      }
    });
  };

  const onConfirmPublishPayroll = () => {
    publishPayrollMutation.mutate('', {
      onSuccess: () => {
        queryClient.invalidateQueries(['currentPayroll', filterParams]);
        message.success(`Salary published successfully`);
        openClosePublishPayroll();
      },
      onError: (data: any) => {
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage);
      }
    });
  };

  const publishBtnItems: MenuProps['items'] = [
    {
      key: 'cancelPayroll',
      label: 'Cancel Payroll'
      // onClick: () => openCloseWithholdSalary()
    },
    {
      key: 'makeChanges',
      label: 'Make Changes'
      // onClick: () => openCloseEditSalary()
    }
  ];

  const items: MenuProps['items'] = [
    {
      key: 'revert',
      label: `${selectedEmployee?.withheld ? 'Revert' : ''}  Withhold Salary`,
      onClick: () => openCloseWithholdSalary()
    },
    {
      key: 'edit',
      label: 'Edit',
      onClick: () => openCloseEditSalary()
    }
  ];

  const payrollSummaryListColumns: ColumnsType<PayrollSummaryListDataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        return (
          <>
            {' '}
            <a>{record?.empName}</a>
            {record?.withheld && (
              <StyledTag color={'warning'} key={record?.status}>
                Salary Hold{' '}
                <Tooltip title="salary hold"> {<InfoCircleFilled />}</Tooltip>
              </StyledTag>
            )}
          </>
        );
      }
    },
    {
      title: 'Pay Days',
      dataIndex: 'attendedDays',
      key: 'payDays',
      render: text => <a>{text}</a>
    },
    {
      title: 'Monthly CTC',
      dataIndex: 'ctc',
      key: 'monthly_ctc',
      render: text => <a>{text}</a>
    },
    {
      title: 'Gross Salary',
      dataIndex: 'grossSalary',
      key: 'grossSalary',
      render: text => <a>{text}</a>
    },
    {
      title: 'Additions',
      dataIndex: 'totalAddition',
      key: 'totalAdditon',
      render: text => <a>{text}</a>
    },
    {
      title: 'Deductions',
      dataIndex: 'totalDeduction',
      key: 'totalDeduction',
      render: text => <a>{text}</a>
    },
    {
      title: 'Taxes',
      dataIndex: 'taxes',
      key: 'taxes',
      render: text => <a>{text}</a>
    },
    {
      title: 'Net Salary',
      dataIndex: 'netSalary',
      key: 'netSalary',
      render: text => (
        <>
          <Dropdown menu={{ items }}>
            <a>{text}</a>
          </Dropdown>
        </>
      )
    },
    {
      title: '',
      dataIndex: 'leaveStatus',
      key: 'leaveStatus',
      render: (text, record) => (
        <>
          <Dropdown menu={{ items }} trigger={['click']}>
            <a
              onClick={() => {
                setSelectedEmployee(record);
              }}
            >
              <Space>
                <MoreOutlined />
              </Space>
            </a>
          </Dropdown>
        </>
      )
    }
  ];
  return (
    <PayrollSummaryContainer>
      <PageHeader>
        <PageHeaderNaviagtionPayrollSummary>
          <TitleContent>
            <h4
              onClick={handleBackButtomClick}
              style={{ cursor: 'pointer', fontWeight: 'normal' }}
            >
              {' '}
              <ArrowLeftOutlined /> Back
            </h4>
            {payrollDetails &&
              (payrollDetails?.buttonState === 'DISABLED' ? (
                <Dropdown
                  menu={{
                    items: publishBtnItems
                  }}
                  trigger={['click']}
                >
                  <ItemDropdownBtn>
                    <EllipsisOutlined />
                  </ItemDropdownBtn>
                </Dropdown>
              ) : (
                <StyledButton onClick={openClosePublishPayroll}>
                  Submit & Publish
                </StyledButton>
              ))}
          </TitleContent>
          <PayrollSuccess>
            Payroll Finalized for{' '}
            {DateFormaMonthHalfNameYear(payrollDetails?.payrollMonth)}.
          </PayrollSuccess>
          <CardContainer>
            <Card style={{ width: '268px' }}>
              <Title>Pay</Title>
              <Text>
                {DateFormatDay(payrollDetails?.paymentDate)}
                {` `}
                <span
                  style={{
                    fontSize: `12px`,
                    fontWeight: `500`,
                    color: `#595959`
                  }}
                >
                  {DateFormaMonthHalfNameYear(payrollDetails?.paymentDate)}
                </span>{' '}
              </Text>
            </Card>
            <Card style={{ width: '268px' }}>
              <Title>Total Employee</Title>
              <Text>{payrollDetails?.employees}</Text>
            </Card>
          </CardContainer>
        </PageHeaderNaviagtionPayrollSummary>

        <PayloadTitleHeader>
          Payroll Summary (
          {DateFormaMonthFullNameYear(payrollDetails?.payrollMonth)})
        </PayloadTitleHeader>
        <SearchBar>
          <SearchBarContent>
            <Input
              name="search"
              id="search"
              type="text"
              placeholder="Search By Name"
              autoComplete="false"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
            <Button danger onClick={handleReset}>
              Reset
            </Button>
            <Button
              type="primary"
              style={{ boxShadow: 'none', minWidth: '150px' }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </SearchBarContent>
        </SearchBar>
      </PageHeader>
      <TableBodyContainer>
        <Table
          columns={payrollSummaryListColumns}
          dataSource={employeePaymentInfo}
          loading={isLoading}
          pagination={
            currentPayroll?.data?.meta_data?.total_items > 10 && {
              defaultPageSize: 1,
              total: metaData?.total_items,
              hideOnSinglePage: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              onChange: (page, pageSize) => {
                setFilterParams({
                  ...filterParams,
                  currentPage: page
                });
              }
            }
          }
        />
      </TableBodyContainer>
      <EditPayrollSalary
        isModalOpen={isOpenEditSalary}
        handleCancel={openCloseEditSalary}
        selectedEmployee={selectedEmployee}
      />
      <ConfirmModal
        modalHeader={`${
          selectedEmployee?.withheld ? 'Revert' : ''
        } Withhold Salary`}
        buttonTitle="Yes"
        openCloseModal={openCloseWithholdSalary}
        open={isOpenWithholdSalary}
        confirmText={`${
          selectedEmployee?.withheld ? 'revert' : ''
        } withhold Salary of ${selectedEmployee?.empName}`}
        onConfirmModal={onConfirmWithhold}
        icon={
          selectedEmployee?.withheld ? (
            <RedoOutlined style={{ color: Colors.YELLOW_LIGHT }} />
          ) : (
            <PauseCircleOutlined style={{ color: Colors.YELLOW_LIGHT }} />
          )
        }
      />
      <ConfirmModal
        modalHeader={`Publish Payroll`}
        buttonTitle="Publish"
        openCloseModal={openClosePublishPayroll}
        open={isOpenPublishPayroll}
        confirmText={
          <span>
            You are about to publish this payroll for the month of
            <b> {DateFormaMonthFullNameYear(payrollDetails?.payrollMonth)}</b>.
            Are you sure you want to publish it
          </span>
        }
        onConfirmModal={onConfirmPublishPayroll}
        icon={<CheckCircleOutlined style={{ color: Colors.SUCCESS }} />}
      />
    </PayrollSummaryContainer>
  );
};

export default PayrollSummary;

const PayrollSummaryContainer = styled.div``;

const PageHeaderNaviagtionPayrollSummary = styled.div`
  padding: 24px;
  padding-top: 5px;
`;

const PayloadTitleHeader = styled.div`
  margin: 24px;
  padding: 15px;
  background: #fff;
  display: flex;
  font-size: 16px;
  font-weight: 700;
  justify-content: center;
`;

const Title = styled.div`
  color: #8c8c8c;
  font-size: 14px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 550px;
  width: 100%;
`;

const Text = styled.div`
  font-weight: 700;
  font-size: 24px;
  display: inline;
`;

const StyledTag = styled(Tag)`
  margin-left: 15px;
`;

const StyledButton = styled(Button)`
  background: ${Colors.COLOR_PRIMARY_BG};
  color: ${Colors.WHITE};
  box-shadow: none;
  &:hover {
    border-color: ${Colors.COLOR_PRIMARY_BG} !important;
    background: ${Colors.COLOR_PRIMARY_BG};
    color: ${Colors.WHITE} !important;
  }
`;

const ItemDropdownBtn = styled(Button)`
  height: 32px;
  width: 32px;
  padding: 0;
`;

const PayrollSuccess = styled.div`
  background: ${Colors.SUCCESS_BG};
  border: 1px solid ${Colors.SUCCESS};
  color: ${Colors.SHIFT_ICON_BG_COLOR};
  border-radius: 2px;
  padding: 5px 24px;
  margin-bottom: 24px;
`;
