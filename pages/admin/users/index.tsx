import styled from "styled-components";
import { Breadcrumb, Button, Input, Table, Row, Col } from "antd";
import Link from "next/link";
import { UserAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from "constants/common";
import UserAPI from "apis/user";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

import {
  PageHeader,
  PageHeaderNaviagtion,
  SearchBar,
  SearchBarContent,
  TableBodyContainer,
  TitleContent,
} from "styles/styled/PageHeader";
import { Colors } from "utils/colors";
import { AddUserModal } from "components/admin/users/AddUserModal";

interface FilterParams {
  currentPage: number;
  pageSize: number;
  status: string;
  search: string;
}

const DefaultFilterParams = {
  currentPage: INITIAL_CURRENT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  status: "true",
  search: "",
};

const User = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const userAPI = new UserAPI();
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);

  const openCloseModal = () => {
    setCreateUserModalOpen(!createUserModalOpen);
  };
  const userListColumns: any = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Email",
      dataIndex: "email",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Action",
      key: "action",
      responsive: ["sm", "md", "lg"],
    },
  ];

  const [filterParams, setFilterParams] =
    useState<FilterParams>(DefaultFilterParams);

  const queryList = useQuery(
    [
      "employeeList",
      {
        status: filterParams.status,
        page: filterParams.currentPage,
        limit: filterParams.pageSize,
        search: filterParams.search,
      },
    ],
    async () => {
      const queryParams: any = {
        page: filterParams.currentPage,
        limit: filterParams.pageSize,
      };
      if (filterParams.search) queryParams.search = filterParams.search;
      const response = await userAPI.list(queryParams);
      return response?.data?.data;
    }
  );

  const userList = queryList?.data;
  // const metaData = queryList?.data?.meta_data;

  // const handleSearch = (e: any) => {
  //   const { name, value } = e.target;
  //   setFilterParams((prevState) => ({
  //     ...prevState,
  //     currentPage: INITIAL_CURRENT_PAGE,
  //     search: searchValue,
  //   }));
  // };

  return (
    <UsersContainer>
      <PageHeader>
        <PageHeaderNaviagtion>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/dashboard">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span style={{ color: Colors.BLACK }}>Users</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <TitleContent>
            <h2>Users</h2>
            <Button
              style={{
                background: Colors.COLOR_PRIMARY_BG,
                boxShadow: "none",
                color: Colors.WHITE,
              }}
              // type="primary"
              icon={<UserAddOutlined />}
              onClick={openCloseModal}
            >
              Add New User
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
                  onChange={(e) => setSearchValue(e.target.value)}
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
                  ghost
                  style={{
                    boxShadow: "none",
                    borderColor: Colors.PRIMARY,
                    color: Colors.PRIMARY,
                    width: "100%",
                  }}
                  onClick={() => {
                    setSearchValue("");
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
                  style={{ boxShadow: "none", width: "100%" }}
                  // onClick={handleSearch}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </SearchBarContent>
        </SearchBar>
      </PageHeader>
      <TableBodyContainer>
        <Table
          columns={userListColumns}
          dataSource={userList}
          scroll={{ x: 1000 }}
          onRow={(record) => ({
            onClick: () => router.push(`/admin/users/details/${record.id}`),
          })}
          // pagination={
          //   employeeList?.meta_data?.total_items > 10 && {
          //     defaultPageSize: 10,
          //     total: metaData?.total_items,
          //     hideOnSinglePage: true,
          //     showSizeChanger: true,
          //     showTotal: (total, range) =>
          //       `${range[0]}-${range[1]} of ${total} items`,
          //     onChange: (page, pageSize) => {
          //       setFilterParams({
          //         ...filterParams,
          //         currentPage: page,
          //         pageSize,
          //       });
          //     },
          //     className: "bg-white-halfrem",
          //     responsive: true,
          //   }
          // }
        />
      </TableBodyContainer>
      <AddUserModal
        handleCancel={openCloseModal}
        isModalOpen={createUserModalOpen}
      />
    </UsersContainer>
  );
};

export default User;

const UsersContainer = styled.div``;

// const StyledPagination = styled(Pagination)`
//   // position: absolute;
//   // bottom: 24px;
//   // right: 24px;
// `;
