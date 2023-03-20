import styled from 'styled-components';
import { Button, Input, Table, Card, Dropdown, Tag, Tooltip } from 'antd';

import { ArrowLeftOutlined, InfoCircleOutlined } from '@ant-design/icons';
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
import fsPromises from 'fs/promises';
import path from 'path';
import { Colors } from 'utils/colors';

const items = [
  { key: '1', label: 'Revert Withhold Salary' },
  { key: '2', label: 'Edit' }
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
          <a>{record.empName}</a>
          {record?.status === 'salary_hold' && (
            <StyledTag color={'warning'} key={record?.status}>
              Salary Hold{' '}
              <Tooltip title="salary hold"> {<InfoCircleOutlined />}</Tooltip>
            </StyledTag>
          )}
        </>
      );
    }
  },
  {
    title: 'Pay Days',
    dataIndex: 'pay_days',
    key: 'pay_days',
    render: text => <a>{text}</a>
  },
  {
    title: 'Monthly CTC',
    dataIndex: 'monthly_ctc',
    key: 'monthly_ctc',
    render: text => <a>{text}</a>
  },
  {
    title: 'Gross Salary',
    dataIndex: 'gross_salary',
    key: 'gross_salary',
    render: text => <a>{text}</a>
  },
  {
    title: 'Additions',
    dataIndex: 'additions',
    key: 'additons',
    render: text => <a>{text}</a>
  },
  {
    title: 'Deductions',
    dataIndex: 'deducations',
    key: 'deducations',
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
    dataIndex: 'net_salary',
    key: 'net_salary',
    render: text => (
      <>
        <Dropdown menu={{ items }}>
          <a>{text}</a>
        </Dropdown>
      </>
    )
  }
];

interface FilterParams {
  currentPage: number;
  pageSize: number;
  search: string;
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'pages/payroll/payroll.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData.toString());

  return {
    props: objectData
  };
}

const PayrollSummary = (props: any) => {
  const payrollSummaryList = props.data;
  const [searchValue, setSearchValue] = useState('');
  const [filterParams, setFilterParams] = useState<FilterParams>({
    currentPage: INITIAL_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    search: ''
  });

  const metaData = payrollSummaryList?.meta_data;

  const handleSearch = (e: any) => {
    const { name, value } = e.target;
    setFilterParams(prevState => ({
      ...prevState,
      currentPage: INITIAL_CURRENT_PAGE,
      search: searchValue
    }));
  };

  return (
    <PayrollSummaryContainer>
      <PageHeader>
        <PageHeaderNaviagtionPayrollSummary>
          <TitleContent>
            <h4 style={{ fontWeight: 'normal' }}>
              {' '}
              <ArrowLeftOutlined /> Back
            </h4>
            <Button
              style={{
                background: Colors.COLOR_PRIMARY_BG,
                color: Colors.WHITE,
                boxShadow: 'none',
                padding: '0px 40px'
              }}
            >
              Submit & Publish
            </Button>
          </TitleContent>
          <CardContainer>
            <Card style={{ width: '268px' }}>
              <Title>Pay</Title>
              <Text>
                05{' '}
                <span
                  style={{
                    fontSize: `12px`,
                    fontWeight: `500`,
                    color: `#595959`
                  }}
                >
                  Jan 2022
                </span>{' '}
              </Text>
            </Card>
            <Card style={{ width: '268px' }}>
              <Title>Total Employee</Title>
              <Text>12</Text>
            </Card>
          </CardContainer>
        </PageHeaderNaviagtionPayrollSummary>
        <PayloadTitleHeader>Payroll Summer (December 2022)</PayloadTitleHeader>
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
            <Button danger onClick={handleSearch}>
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
          dataSource={payrollSummaryList?.payrollSummary}
          pagination={
            payrollSummaryList?.meta_data.total_items > 10 && {
              defaultPageSize: 1,
              total: metaData?.total_items,
              hideOnSinglePage: true,
              className: 'bg-white-halfrem',
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
    </PayrollSummaryContainer>
  );
};

export default PayrollSummary;

const PayrollSummaryContainer = styled.div``;

const PageHeaderNaviagtionPayrollSummary = styled.div`
  padding: 24px;
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
