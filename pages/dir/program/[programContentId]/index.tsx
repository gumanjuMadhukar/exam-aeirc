import styled from "styled-components";
import {
  Breadcrumb,
  Button,
  Input,
  Table,
  Row,
  Col,
  message,
  MenuProps,
  Dropdown,
} from "antd";
import Link from "next/link";
import {
  UserAddOutlined,
  DeleteOutlined,
  EyeOutlined,
  ExclamationOutlined,
  EllipsisOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from "constants/common";
import ProgramAPI, { programContent } from "apis/program";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
import ConfirmModal from "components/ConfirmModal";
import { CreateProgramContentModal } from "components/admin/program/CreateProgramContentModal";
import { ImportQuestionCourseContentWise } from "components/admin/program/ImportQuestionCourseContentWise";

interface FilterParams {
  currentPage: number;
  pageSize: number;
  status: string;
  search: string;
  subject_id: string;
}

const DefaultFilterParams = {
  currentPage: INITIAL_CURRENT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  status: "true",
  search: "",
  subject_id: "",
};

interface IViewDropDown {
  // showModalView: (id: string) => void;
  openCloseEditModal: (id: string) => void;
  openCloseDeleteLeaveModal: (id?: string | undefined) => void;
  id: string;
  programContentId: string | string[] | undefined;
}

const ViewDropDown = ({
  openCloseEditModal,
  openCloseDeleteLeaveModal,
  id,
  programContentId,
}: IViewDropDown) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href={`/dir/program/${programContentId}/${id}`}>
          <EyeOutlined />
          {" View"}
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={() => openCloseEditModal(id)}>
          <EditOutlined />
          {" Edit"}
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

const UsersContainer = styled.div``;

const ProgramContent = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const programAPI = new ProgramAPI();
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  const [uploadQuestionModalOpen, setUploadQuestionModalOpen] = useState(false);
  const [isEditModel, setIsEditModal] = useState(false);
  const queryClient = useQueryClient();
  const { programContentId } = router.query;
  const id = programContentId;
  const openCloseModal = () => {
    setCreateUserModalOpen(!createUserModalOpen);
  };

  const openCloseUploadQuestionModal = () => {
    setUploadQuestionModalOpen(!uploadQuestionModalOpen);
  };

  const openCloseEditModal = () => {
    setIsEditModal(!isEditModel);
  };
  const programListColumns: any = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Question to allocate",
      dataIndex: "question_count",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Total Question",
      dataIndex: "question_count",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "",
      dataIndex: "",
      render: (row: any) => (
        <ViewDropDown
          openCloseEditModal={openCloseEditModal}
          openCloseDeleteLeaveModal={openCloseDeleteLeaveModal}
          id={row.id}
          programContentId={programContentId ? programContentId : ""}
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

  const { data: courseContentData } = useQuery(
    ["CourseContent", { filterParams, id }],
    programContent,
    {
      enabled: !!id,
    }
  );

  const removeEmployeeDocsMutation = useMutation((employeeId: any) =>
    programAPI.destroy(employeeId)
  );

  const onConfirmDelete = () => {
    removeEmployeeDocsMutation.mutate(currentItem, {
      onSuccess: () => {
        queryClient.invalidateQueries(["ProgramList"]);
        message.success("Removed Program Successfully");
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
              <span style={{ color: Colors.BLACK }}>Program</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <TitleContent>
            <h2>Program</h2>
            <div>
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
                Add New Course Content
              </Button>
            </div>
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
          dataSource={courseContentData?.data}
          scroll={{ x: 1000 }}
          style={{ cursor: "pointer" }}
          pagination={
            courseContentData?.meta?.total > 10 && {
              defaultPageSize: 10,
              total: courseContentData?.meta?.total,
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
      <CreateProgramContentModal
        handleCancel={openCloseModal}
        isModalOpen={createUserModalOpen}
        subject_id={id ? id : ""}
      />
      <ImportQuestionCourseContentWise
        handleCancel={openCloseUploadQuestionModal}
        isModalOpen={uploadQuestionModalOpen}
      />
    </UsersContainer>
  );
};

export default ProgramContent;
