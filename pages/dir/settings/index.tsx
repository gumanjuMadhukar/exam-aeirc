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
  Spin,
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
import SettingAPI from "apis/setting";

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
  const [isOptionRightMarking, setOptionRightMarking] =
    useState<boolean>(false);

  const [active, setActive] = useState<boolean>(false);

  const router = useRouter();
  const programAPI = new ProgramAPI();
  const settingAPI = new SettingAPI();
  const queryClient = useQueryClient();

  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);

  const [filterParams, setFilterParams] =
    useState<FilterParams>(DefaultFilterParams);

  const { data: attendanceData, isLoading } = useQuery(
    ["SettingData"],
    async () => {
      const response = await settingAPI.list();
      return response?.data;
    }
  );

  const data = attendanceData;

  console.log(attendanceData?.number_of_question_per_student, "This data");
  console.log(data);
  useEffect(() => {
    if (data) {
      setActive(data?.active);
    }
  }, [data]);

  const storeSetting = useMutation((data: any) => settingAPI.store(data));

  console.log(data?.exam_time, "this is data");

  const onChange = (checked: boolean) => {
    // console.log(`switch to ${checked}`);
    setIsNegativeMarking(checked);
  };

  const onChangeOptionRight = (checked: boolean) => {
    // console.log(`switch to ${checked}`);
    setOptionRightMarking(checked);
  };
  const onFinish = (data: any) => {
    const newData = {
      ...data,
      is_negative_marking: isNegativeMarking,
      an_option_right_marking: isOptionRightMarking,
    };
    storeSetting.mutate(newData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["SettingData"]);
      },
      onError: (data: any) => {
        const errorMessageWithNetworkIssue = data?.message;
        const errorMessage = data?.response?.data?.message;
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
        <Spin spinning={isLoading}>
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
                  name="number_of_question_per_student"
                  initialValue={data?.number_of_question_per_student}
                  rules={[
                    {
                      required: true,
                      message:
                        "Please enter total number of question for a student!",
                    },
                  ]}
                >
                  <Input disabled={active} />
                </Form.Item>
              </Col>

              <Col lg={11} xs={24} md={11}>
                <Form.Item
                  label="Exam Time"
                  name="exam_time"
                  initialValue={data?.exam_time}
                  rules={[
                    {
                      required: true,
                      message: "Please enter exam time! ",
                    },
                  ]}
                >
                  <Input disabled={active} />
                </Form.Item>
              </Col>

              <Col lg={11} xs={24} md={11}>
                <Form.Item
                  label="Marks Holding per question"
                  name="marks_per_question"
                  initialValue={data?.mark_per_question}
                  rules={[
                    {
                      required: true,
                      message: "Please enter marks for per question!",
                    },
                  ]}
                >
                  <Input
                    disabled={active}
                    value={data?.mark_per_question || ""}
                  />
                </Form.Item>
              </Col>

              <Col lg={11} xs={24} md={11}>
                <Form.Item
                  label="Passing Mark"
                  name="passing_mark"
                  initialValue={data?.passing_mark}
                  rules={[
                    {
                      required: true,
                      message: "Please enter passing marks!",
                    },
                  ]}
                >
                  <Input disabled={active} />
                </Form.Item>
              </Col>
              <Col lg={11} xs={24} md={11}>
                <Form.Item
                  label="Is Negative Marking"
                  name="is_negative_marking"
                  initialValue={data?.is_negative_marking}
                >
                  <Switch onChange={onChange} disabled={active} />
                </Form.Item>
              </Col>

              {isNegativeMarking && (
                <Col lg={11} xs={24} md={11}>
                  <Form.Item
                    label="Marks deduct per wrong answerx"
                    name="negative_marking_per_question"
                    initialValue={data?.negative_marking_per_question}
                    rules={[
                      {
                        required: isNegativeMarking ? true : false,
                        message: "Please enter is negative marking!",
                      },
                    ]}
                  >
                    <Input disabled={active} />
                  </Form.Item>
                </Col>
              )}

              <Col lg={11} xs={24} md={11}>
                <Form.Item
                  label="If an option is right then allocate marks"
                  name="an_option_right_marking"
                  initialValue={data?.an_option_right_marking}
                >
                  <Switch onChange={onChangeOptionRight} disabled={active} />
                </Form.Item>
              </Col>

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
                    disabled={active}
                  >
                    {active ? "Update" : "Save"}
                  </Button>
                </CustomizedButtonGroup>
              </Col>
            </Row>
          </Form>
        </Spin>
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
