import styled from 'styled-components';
import {
  Breadcrumb,
  Button,
  Input,
  Menu,
  Table,
  Pagination,
  Image,
  Row,
  Col
} from 'antd';
import Link from 'next/link';
import { UserAddOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import {
  DEFAULT_PAGE_SIZE,
  INITIAL_CURRENT_PAGE,
  employeeTabItems
} from 'constants/common';
import ViewDropDown from 'components/employee/ViewDropDown';
import EmployeeAPI from 'apis/employee';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import {
  PageHeader,
  PageHeaderNaviagtion,
  SearchBar,
  SearchBarContent,
  TableBodyContainer,
  TitleContent
} from 'styles/styled/PageHeader';
import { Colors } from 'utils/colors';
import { imageFullPath } from 'utils/helpers';
import { AddEmployeeModal } from 'components/employee/AddEmployeeModal';

interface FilterParams {
  currentPage: number;
  pageSize: number;
  status: string;
  search: string;
}

const DefaultFilterParams = {
  currentPage: INITIAL_CURRENT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  status: 'true',
  search: ''
};

const Employee = () => {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const employeeAPI = new EmployeeAPI();
  const [editBasicInformationModalOpen, setEditBasicInformationModalOpen] =
    useState(false);

  const openCloseModal = () => {
    setEditBasicInformationModalOpen(!editBasicInformationModalOpen);
  };

  const employeeListColumns: ColumnsType<EmployeeListDataType> = [
    {
      title: 'Name',
      key: 'name',
      render: employee => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Image
            width={32}
            alt="avatar"
            src={imageFullPath(
              employee.profile_picture,
              '/images/default_profile_picture.jpeg'
            )}
            style={{ borderRadius: '50%' }}
            preview={false}
          />
          <p
            style={{ paddingLeft: '1rem', cursor: 'pointer' }}
            className="semi-bold m-0"
          >
            {<Link href={`employee/${employee?.id}`}>{employee?.name}</Link>}
          </p>
        </div>
      ),
      responsive: ['sm', 'md', 'lg']
    },
    {
      title: 'Email',
      dataIndex: ['user', 'email'],
      render: text => <p>{text || 'N/A'}</p>,
      responsive: ['sm', 'md', 'lg']
    },
    {
      title: 'Designation',
      dataIndex: ['designation', 'name'],
      render: text => <p>{text || 'N/A'}</p>,
      responsive: ['sm', 'md']
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
      render: text => <p>{text || 'N/A'}</p>,
      responsive: ['sm', 'md', 'lg']
    },
    {
      title: 'Joined date',
      dataIndex: 'joined_date',
      key: 'joined_date',
      render: text => <p>{text || 'N/A'}</p>,
      responsive: ['sm', 'md', 'lg']
    },
    {
      title: 'Action',
      key: 'action',
      render: record => <ViewDropDown record={record} router={router} />,
      responsive: ['sm', 'md', 'lg']
    }
  ];

  const [filterParams, setFilterParams] =
    useState<FilterParams>(DefaultFilterParams);

  const queryList = useQuery(
    [
      'employeeList',
      {
        status: filterParams.status,
        page: filterParams.currentPage,
        limit: filterParams.pageSize,
        search: filterParams.search
      }
    ],
    async () => {
      const queryParams: any = {
        page: filterParams.currentPage,
        limit: filterParams.pageSize
      };
      if (filterParams.status) queryParams.status = filterParams.status;
      if (filterParams.search) queryParams.search = filterParams.search;
      const response = await employeeAPI.listall(queryParams);
      return response?.data?.data;
    }
  );

  const employeeList = queryList?.data;
  const metaData = queryList?.data?.meta_data;

  const handleSearch = (e: any) => {
    const { name, value } = e.target;
    setFilterParams(prevState => ({
      ...prevState,
      currentPage: INITIAL_CURRENT_PAGE,
      search: searchValue
    }));
  };

  useEffect(() => {
    let status: string;
    switch (router.query.currentTab) {
      case 'activated':
        status = 'true';
        break;
      case 'deactivated':
        status = 'false';
        break;
      default:
        status = 'true';
        break;
    }
    setFilterParams(prevState => ({
      ...prevState,
      status: status
    }));
  }, [router.query]);

  return (
    <EmployeeContainer>
      <PageHeader>
        <PageHeaderNaviagtion>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/dashboard">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span style={{ color: Colors.BLACK }}>Employee</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <TitleContent>
            <h2>Employee</h2>
            <Button
              style={{ background: Colors.COLOR_PRIMARY_BG, boxShadow: 'none' }}
              type="primary"
              icon={<UserAddOutlined />}
              onClick={openCloseModal}
            >
              Add New Employee
            </Button>
          </TitleContent>
        </PageHeaderNaviagtion>
        <SearchBar>
          <SearchBarContent>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                span={12}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
              >
                <Input
                  name="search"
                  id="search"
                  type="text"
                  placeholder="Search By Name"
                  autoComplete="false"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                />
              </Col>
              <Col
                span={6}
                xs={{ span: 12 }}
                sm={{ span: 12 }}
                md={{ span: 6 }}
                lg={{ span: 6 }}
                className="search-col-margin"
              >
                <Button
                  type="ghost"
                  ghost
                  style={{
                    boxShadow: 'none',
                    borderColor: Colors.PRIMARY,
                    color: Colors.PRIMARY,
                    width: '100%'
                  }}
                  onClick={() => {
                    setSearchValue('');
                    setFilterParams(DefaultFilterParams);
                  }}
                >
                  Reset
                </Button>
              </Col>
              <Col
                span={6}
                xs={{ span: 12 }}
                sm={{ span: 12 }}
                md={{ span: 6 }}
                lg={{ span: 6 }}
                className="search-col-margin"
              >
                <Button
                  type="primary"
                  style={{ boxShadow: 'none', width: '100%' }}
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </SearchBarContent>
        </SearchBar>
      </PageHeader>
      <TableBodyContainer>
        <Menu
          selectedKeys={[(router.query.currentTab as string) || 'activated']}
          mode="horizontal"
          items={employeeTabItems(router)}
        />
        <Table
          columns={employeeListColumns}
          dataSource={employeeList?.employees}
          // onRow={(record, rowIndex) => {
          //   return {
          //     onClick: event => {
          //     } // click row
          //   };
          // }}
          scroll={{ x: 1000 }}
          pagination={
            employeeList?.meta_data?.total_items > 10 && {
              defaultPageSize: 10,
              total: metaData?.total_items,
              hideOnSinglePage: true,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              onChange: (page, pageSize) => {
                setFilterParams({
                  ...filterParams,
                  currentPage: page,
                  pageSize
                });
              },
              className: 'bg-white-halfrem',
              responsive: true
            }
          }
        />
      </TableBodyContainer>
      <AddEmployeeModal
        handleCancel={openCloseModal}
        isModalOpen={editBasicInformationModalOpen}
      />
    </EmployeeContainer>
  );
};

export default Employee;

const EmployeeContainer = styled.div``;

const StyledPagination = styled(Pagination)`
  // position: absolute;
  // bottom: 24px;
  // right: 24px;
`;
