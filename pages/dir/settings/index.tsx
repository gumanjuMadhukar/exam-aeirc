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
  Form,
  Card,
  Radio,
  Switch,
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
import ProgramAPI from "apis/program";
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

const Settings = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isNegativeMarking, setIsNegativeMarking] = useState<boolean>(false);

  const router = useRouter();
  const programAPI = new ProgramAPI();
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);

  const [filterParams, setFilterParams] =
    useState<FilterParams>(DefaultFilterParams);

  const queryList = useQuery(
    [
      "ProgramList",
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
      const response = await programAPI.list(queryParams);
      return response?.data;
    }
  );

  const programList = queryList?.data?.data;
  const metaData = queryList?.data?.meta;

  const onChange = (checked: boolean) => {
    // console.log(`switch to ${checked}`);
    setIsNegativeMarking(checked);
  };
  const onFinish = (data: any) => {};
  return (
    <UsersContainer>
      <PageHeader>
        <PageHeaderNaviagtion>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/dashboard">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span style={{ color: Colors.BLACK }}>Settings</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <TitleContent>
            <h2>Settings</h2>
            {/* <Button
              style={{
                background: Colors.COLOR_PRIMARY_BG,
                boxShadow: "none",
                color: Colors.WHITE,
              }}
              // type="primary"
              icon={<UserAddOutlined />}
              onClick={openCloseModal}
            >
              Add New Program
            </Button> */}
          </TitleContent>
        </PageHeaderNaviagtion>
      </PageHeader>
      <Card style={{ margin: "20px" }}>
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Row style={{ justifyContent: "space-between" }}>
            <Col lg={11} xs={24} md={11}>
              <Form.Item
                label="Total Question Per Student"
                name="total_question"
                // initialValue={firstName}
                rules={[
                  {
                    required: true,
                    message:
                      "Please enter total number of question for a student!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col lg={11} xs={24} md={11}>
              <Form.Item
                label="Exam Time"
                name="exam_time"
                // initialValue={middleName}
                rules={[
                  {
                    required: true,
                    message: "Please enter exam time! ",
                  },
                ]}
              >
                <Input placeholder="HH:mm" />
              </Form.Item>
            </Col>

            <Col lg={11} xs={24} md={11}>
              <Form.Item
                label="Marks Holding per question"
                name="marks_per_question"
                // initialValue={lastName}
                rules={[
                  {
                    required: true,
                    message: "Please enter marks for per question!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col lg={11} xs={24} md={11}>
              <Form.Item
                label="Passing Mark"
                name="passing_mark"
                // initialValue={lastName}
                rules={[
                  {
                    required: true,
                    message: "Please enter passing marks!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={11} xs={24} md={11}>
              <Form.Item
                label="Is Negative Marking"
                name="is_negative_marking"
                // initialValue={data?.gender}
                rules={[{ required: true, message: "Please choose gender!" }]}
              >
                <Switch onChange={onChange} />
              </Form.Item>
            </Col>

            {isNegativeMarking && (
              <Col lg={11} xs={24} md={11}>
                <Form.Item
                  label="Marks deduct per wrong answerx"
                  name="negative_marking_per_question"
                  // initialValue={data?.user?.username}
                  rules={[
                    {
                      required: isNegativeMarking ? true : false,
                      message: "Please enter is negative marking!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            )}

            <Col xs={24}>
              <CustomizedButtonGroup>
                <Button
                  style={{
                    backgroundColor: Colors.PRIMARY,
                    color: "#fff",
                    marginLeft: "10px",
                  }}
                  size="large"
                  htmlType="submit"
                >
                  Save
                </Button>
              </CustomizedButtonGroup>
            </Col>
          </Row>
        </Form>
      </Card>
    </UsersContainer>
  );
};

export default Settings;

const UsersContainer = styled.div``;

const StyledPagination = styled(Pagination)`
  // position: absolute;
  // bottom: 24px;
  // right: 24px;
`;

const CustomizedButtonGroup = styled.div`
  float: right;
  margin-top: 10px;
  right: 0;
`;
