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
  message,
} from "antd";
import Link from "next/link";
import {
  UserAddOutlined,
  DeleteOutlined,
  EyeOutlined,
  EllipsisOutlined,
  ExclamationOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from "constants/common";
import StudentAPI from "apis/student";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  PageHeader,
  PageHeaderNaviagtion,
  SearchBar,
  SearchBarContent,
  TableBodyContainer,
  TitleContent,
} from "styles/styled/PageHeader";
import { Colors } from "utils/colors";
import ConfirmModal from "components/ConfirmModal";
import { ImportStudentModal } from "components/admin/student/importStudentModal";

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

const ViewDropDown = ({
  showModalView,
  showModalEdit,
  openCloseDeleteLeaveModal,
  id,
}: IViewDropDown) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div onClick={() => showModalView(id)}>
          <EyeOutlined />
          {" View Question"}
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={() => showModalEdit(id)}>
          <EyeOutlined />
          {" View Students"}
        </div>
      ),
    },
    {
      key: "3",
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

const Student = () => {
  const [searchValue, setSearchValue] = useState("");

  const studentAPI = new StudentAPI();
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  const [_openView, setOpenView] = useState(false);
  const [_openEdit, setOpenEdit] = useState(false);
  const queryClient = useQueryClient();
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
      title: "Email",
      key: "email",
      dataIndex: "email",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Symbol Number",
      key: "symbol_number",
      dataIndex: "symbol_number",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Phone Number",
      key: "phone_number",
      dataIndex: "phone_number",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Program",
      key: "subject",
      render: (row: any) => <text>{row.subject.name}</text>,
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Date of Birth",
      key: "date_of_birth",
      dataIndex: "date_of_birth",
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
  const [currentItem, setCurrentItem] = useState<string>("");

  const openCloseDeleteLeaveModal = (id?: string) => {
    id ? setCurrentItem(id) : setCurrentItem("");
    setIsDeleteLeaveModalOpen(!isDeleteLeaveModalOpen);
  };
  const [filterParams, setFilterParams] =
    useState<FilterParams>(DefaultFilterParams);

  const queryList = useQuery(
    [
      "StudentList",
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
      const response = await studentAPI.list(queryParams);
      return response?.data;
    }
  );

  const programList = queryList?.data?.data;
  const metaData = queryList?.data?.meta;

  // const handleSearch = (e: any) => {
  //   const { name, value } = e.target;
  //   setFilterParams((prevState) => ({
  //     ...prevState,
  //     currentPage: INITIAL_CURRENT_PAGE,
  //     search: searchValue,
  //   }));
  // };

  const showModalView = (id: string) => {
    setCurrentItem(id);
    setOpenView(true);
  };

  // const hideModalView = () => {
  //   setCurrentItem("");
  //   setOpenView(false);
  // };

  const showModalEdit = (id: string) => {
    setCurrentItem(id);
    setOpenEdit(true);
  };

  const removeEmployeeDocsMutation = useMutation((employeeId: any) =>
    studentAPI.destroy(employeeId)
  );

  const onConfirmDelete = () => {
    removeEmployeeDocsMutation.mutate(currentItem, {
      onSuccess: () => {
        queryClient.invalidateQueries(["StudentList"]);
        message.success("Removed Student Successfully");
        openCloseDeleteLeaveModal();
      },
      onError: (data: any) => {
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage);
      },
    });
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
              <span style={{ color: Colors.BLACK }}>Student</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <TitleContent>
            <h2>Student</h2>
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
              Add Student
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
                  type="ghost"
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
          columns={programListColumns}
          dataSource={programList}
          scroll={{ x: 1000 }}
          pagination={
            queryList?.data?.meta?.total > 10 && {
              defaultPageSize: 10,
              total: metaData?.total,
              hideOnSinglePage: true,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              onChange: (page, pageSize) => {
                setFilterParams({
                  ...filterParams,
                  currentPage: page,
                  pageSize,
                });
              },
              className: "bg-white-halfrem",
              responsive: true,
            }
          }
        />
      </TableBodyContainer>
      <ConfirmModal
        buttonTitle="Confirm"
        openCloseModal={openCloseDeleteLeaveModal}
        open={isDeleteLeaveModalOpen}
        confirmText="remove the document"
        onConfirmModal={onConfirmDelete}
        icon={<ExclamationOutlined style={{ color: Colors.DANGER }} />}
      />
      <ImportStudentModal
        handleCancel={openCloseModal}
        isModalOpen={createUserModalOpen}
      />
    </UsersContainer>
  );
};

export default Student;

const UsersContainer = styled.div``;
