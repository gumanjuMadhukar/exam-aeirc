import styled from "styled-components";
import {
  Breadcrumb,
  Button,
  Input,
  Menu,
  Table,
  Pagination,
  Image,
  Row,
  Col,
} from "antd";
import Link from "next/link";
import { UserAddOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from "constants/common";

import {
  PageHeader,
  PageHeaderNaviagtion,
  SearchBar,
  SearchBarContent,
  TableBodyContainer,
  TitleContent,
} from "styles/styled/PageHeader";
import { Colors } from "utils/colors";

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

const Programs = () => {
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
              style={{
                background: Colors.COLOR_PRIMARY_BG,
                boxShadow: "none",
                color: Colors.WHITE,
              }}
              // type="primary"
              icon={<UserAddOutlined />}
            >
              Add New Employee
            </Button>
          </TitleContent>
        </PageHeaderNaviagtion>
        <SearchBar>
          <SearchBarContent></SearchBarContent>
        </SearchBar>
      </PageHeader>

      {/* <AddEmployeeModal
        handleCancel={openCloseModal}
        isModalOpen={createUserModalOpen}
      /> */}
    </EmployeeContainer>
  );
};

export default Programs;

const EmployeeContainer = styled.div``;

const StyledPagination = styled(Pagination)`
  // position: absolute;
  // bottom: 24px;
  // right: 24px;
`;
