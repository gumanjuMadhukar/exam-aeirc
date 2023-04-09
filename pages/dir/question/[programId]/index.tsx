import styled from "styled-components";
import {
  Breadcrumb,
  Button,
  Input,
  Table,
  Pagination,
  MenuProps,
  Row,
  Col,
  Dropdown,
  message,
  Tag,
} from "antd";
import Link from "next/link";
import {
  UserAddOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  EllipsisOutlined,
  ExclamationOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from "constants/common";
import QuestionAPI from "apis/question";
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
import { ImportProgramModal } from "components/admin/program/ImportProgramModal";
import ConfirmModal from "components/ConfirmModal";
import { ImportQuestionModal } from "components/admin/question/importQuestionModal";
import ProgramAPI from "apis/program";

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
        <div onClick={() => showModalView(id)}>
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

const Question = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const { programId } = router.query;
  const programAPI = new ProgramAPI();
  const questionAPI = new QuestionAPI();
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const queryClient = useQueryClient();
  const openCloseModal = () => {
    setCreateUserModalOpen(!createUserModalOpen);
  };
  const programListColumns: any = [
    {
      title: "S.N",
      render: (text: any, record: any, index: number) => index + 1,
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Question",
      key: "question_text",
      dataIndex: "question_text",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Question Type",
      dataIndex: "question_type",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Options",
      render: (row: any) => (
        <text>
          {row.options.map((option: any) => `${option.option_text} : `)}
        </text>
      ),
      responsive: ["sm", "md", "lg"],
    },
    ,
    {
      title: "Correct Answer",
      render: (row: any) => (
        <text>
          {row.options.map((option: any) =>
            row.correct_answers.map((correct: any) => {
              if (option.id === correct.option_id)
                // Update here: Use === for comparison
                return (
                  <StyledTag color={"success"}>{option.option_text}</StyledTag>
                );
            })
          )}
        </text>
      ),
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
      "QuestionList",
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
      const response = await questionAPI.getQuestionBasedOnSubject(programId);
      return response?.data;
    }
  );

  const programList = queryList?.data?.data;

  const metaData = queryList?.data?.meta;

  const handleSearch = (e: any) => {
    const { name, value } = e.target;
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

  const hideModalView = () => {
    setCurrentItem("");
    setOpenView(false);
  };

  const showModalEdit = (id: string) => {
    setCurrentItem(id);
    setOpenEdit(true);
  };

  const programListQuery = useQuery("program-list", () =>
    programAPI.get(programId).then((res: any) => res.data)
  );

  const program = programListQuery?.data?.data;

  const removeEmployeeDocsMutation = useMutation((employeeId: any) =>
    questionAPI.destroy(employeeId)
  );

  const onConfirmDelete = () => {
    removeEmployeeDocsMutation.mutate(currentItem, {
      onSuccess: () => {
        queryClient.invalidateQueries(["QuestionList"]);
        message.success("Removed Question Successfully");
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
              <span style={{ color: Colors.BLACK }}>
                Question of {program?.name}
              </span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <TitleContent>
            <h2>Question of {program?.name}</h2>
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
              Import Question
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
      <ImportQuestionModal
        handleCancel={openCloseModal}
        isModalOpen={createUserModalOpen}
      />
    </UsersContainer>
  );
};

export default Question;

const UsersContainer = styled.div``;

const StyledPagination = styled(Pagination)`
  // position: absolute;
  // bottom: 24px;
  // right: 24px;
`;

const StyledTag = styled(Tag)`
  margin-left: 15px;
`;