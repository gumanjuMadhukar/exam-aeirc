import styled from "styled-components";
import {
  Breadcrumb,
  Button,
  Input,
  Table,
  MenuProps,
  Row,
  Col,
  Dropdown,
} from "antd";
import Link from "next/link";
import {
  UserAddOutlined,
  DeleteOutlined,
  EyeOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from "constants/common";
import { useQuery } from "react-query";
import {
  PageHeader,
  PageHeaderNaviagtion,
  SearchBar,
  SearchBarContent,
  TableBodyContainer,
  TitleContent,
} from "styles/styled/PageHeader";
import { Colors } from "utils/colors";

import { getShift } from "apis/shift";
import { CreateShiftModal } from "components/admin/shift/CreateShiftModal";

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

interface IViewDropDown {
  showModalView: (id: string) => void;
  showModalEdit: (id: string) => void;
  openCloseDeleteLeaveModal: (id?: string | undefined) => void;
  id: string;
}

const ViewDropDown = ({ openCloseDeleteLeaveModal, id }: IViewDropDown) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href={`question/${id}`}>
          <EyeOutlined />
          {" View"}
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={() => openCloseDeleteLeaveModal(id)}>
          <DeleteOutlined />
          {" Delete"}
        </div>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <EllipsisOutlined className="rotate-90" />
    </Dropdown>
  );
};

const Shift = () => {
  const [searchValue, setSearchValue] = useState("");

  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  const [_openView, setOpenView] = useState(false);
  const [_openEdit, setOpenEdit] = useState(false);

  const openCloseModal = () => {
    setCreateUserModalOpen(!createUserModalOpen);
  };
  const programListColumns: any = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Date",
      dataIndex: "date",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Start Date ",
      dataIndex: "start_time",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Total Capacity",
      dataIndex: "total_students",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Tolerance Time",
      dataIndex: "tolerance_time",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Status",
      dataIndex: "status",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Shift End Time",
      dataIndex: "end_time",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "",
      dataIndex: "",
      render: (row: any) => (
        <ViewDropDown
          showModalView={showModalView}
          showModalEdit={showModalEdit}
          openCloseDeleteLeaveModal={openCloseDeleteLeaveModal}
          id={row.id}
        />
      ),
    },
  ];
  const [isDeleteLeaveModalOpen, setIsDeleteLeaveModalOpen] = useState(false);
  const [_currentItem, setCurrentItem] = useState<string>("");

  const openCloseDeleteLeaveModal = (id?: string) => {
    id ? setCurrentItem(id) : setCurrentItem("");
    setIsDeleteLeaveModalOpen(!isDeleteLeaveModalOpen);
  };
  const [filterParams, setFilterParams] =
    useState<FilterParams>(DefaultFilterParams);

  const { data: Shift } = useQuery(["Shift", { filterParams }], getShift);

  const shifList = Shift;

  const handleSearch = (_e: any) => {
    setFilterParams((prevState) => ({
      ...prevState,
      currentPage: INITIAL_CURRENT_PAGE,
      search: searchValue,
    }));
  };

  const showModalView = (id: string) => {
    setCurrentItem(id);
    setOpenView(true);
  };

  const showModalEdit = (id: string) => {
    setCurrentItem(id);
    setOpenEdit(true);
  };

  return (
    <UsersContainer>
      <PageHeader>
        <PageHeaderNaviagtion>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/dashboard">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span style={{ color: Colors.BLACK }}>Shift</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <TitleContent>
            <h2>Shift</h2>
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
              Add Shift
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
        <Table
          columns={programListColumns}
          dataSource={shifList}
          scroll={{ x: 1000 }}
          style={{ cursor: "pointer" }}
        />
      </TableBodyContainer>

      <CreateShiftModal
        handleCancel={openCloseModal}
        isModalOpen={createUserModalOpen}
      />
    </UsersContainer>
  );
};

export default Shift;

const UsersContainer = styled.div``;
