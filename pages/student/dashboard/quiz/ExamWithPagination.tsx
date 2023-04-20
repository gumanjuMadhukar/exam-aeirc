import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import QuestionAPI from "apis/question";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Progress,
  Radio,
  Row,
  Segmented,
  Space,
  Tag,
} from "antd";
import styled from "styled-components";
import { Colors } from "utils/colors";
import html2canvas from "html2canvas";
import { ExclamationOutlined } from "@ant-design/icons";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import ConfirmModal from "components/ConfirmModal";
import PageHeader from "pages/student/layout/page-header";
import Clock from "utils/clock";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import withKeyboardDisabled from "./WithKeyboardDisabled";
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from "constants/common";

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

type Props = {};
const ExamWithPagination: React.FC<Props> = (props) => {
  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem?.requestFullscreen();
    }
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      console.log(event);
      if (event) {
        event.preventDefault();
      }
      enterFullScreen();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const questionAPI = new QuestionAPI();
  const queryClient = useQueryClient();
  const router = useRouter();
  const student_id = Cookies.get("student_id");
  const [filterParams, setFilterParams] =
    useState<FilterParams>(DefaultFilterParams);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [submitQuiz, setSumitQuiz] = useState<boolean>(false);
  const [answered, setAnswered] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const queryList = useQuery(
    [
      "RandomList",
      {
        page: filterParams.currentPage,
        limit: filterParams.pageSize,
      },
    ],
    async () => {
      const queryParams: any = {
        page: filterParams.currentPage,
        limit: filterParams.pageSize,
      };

      const response = await questionAPI.getPaginatedQuestion(queryParams, 2);

      return response?.data?.data;
    }
  );

  const [questions, setQuestions] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [undefinedQuestions, setUndefinedQuestions] = useState<string[]>([]);
  useEffect(() => {
    setQuestions(queryList?.data);
  }, [queryList]);

  console.log(questions);
  const Next = () => {
    setFilterParams({
      ...filterParams,
      currentPage: filterParams.currentPage + 1,
    });
  };
  const Prev = () => {
    setFilterParams({
      ...filterParams,
      currentPage: filterParams.currentPage - 1,
    });
  };

  const handleAnswerSubmit = (answer: any) => {
    // Store the answer in the answers object
    //   const question = questions[currentQuestion];
    //   setAnswers((prevAnswers: any) => ({
    //     ...prevAnswers,
    //     option_ids: answer,
    //   }));
    //   setCheckedList(answer);
    // Move to the next question
  };

  console.log(questions, "this is question");

  const [percentComplete, setPercentComplete] = useState(0);
  const onFinish = (data: any) => {
    const keys = Object.keys(data);
    setAnswered(answered + Object.keys(data).length);
    const undefinedKeys = keys?.filter((key) => data[key] === undefined);
    setUndefinedQuestions(undefinedKeys);
    // Calculate the total number of questions across all pages
    const numQuestions = 100;
    setTotalQuestions(numQuestions);
    console.log(answered);

    openCloseNextQuestionModal();
  };
  useEffect(() => {
    setPercentComplete((answered / totalQuestions) * 100);
  }, [totalQuestions, answered]);

  const [isQuestionPaginationModalOpen, setIsQuestionPaginationModalOpen] =
    useState(false);
  const [currentItem, setCurrentItem] = useState<string>("");

  const openCloseNextQuestionModal = () => {
    setIsQuestionPaginationModalOpen(!isQuestionPaginationModalOpen);
  };

  const onConfirmDelete = () => {
    setFilterParams({
      ...filterParams,
      currentPage: filterParams.currentPage + 1,
    });
    openCloseNextQuestionModal();
  };

  return (
    <>
      <Progress type="circle" percent={percentComplete} />
      <Form name="register" onFinish={onFinish} autoComplete="off">
        {questions?.map((question: any, index: number) => (
          <QuizContainer>
            <Row style={{ fontSize: "24px", fontWeight: "700" }}>
              {index + 1} . {"  "} {question?.question?.question_text}
            </Row>
            <br />
            <Row>
              {question?.question?.question_type === "checkbox" ? (
                <Form.Item name={question?.question?.id}>
                  <Checkbox.Group key={question?.question?.id}>
                    {question?.options.map((option: any, index: any) => (
                      <OptionText>
                        <Row>
                          <Col lg={24} xs={24} md={24}>
                            <Checkbox
                              key={index}
                              value={option?.id}
                              style={{ fontSize: "18px" }}
                            >
                              {option?.option_text}
                            </Checkbox>
                          </Col>
                        </Row>
                        <br></br>
                      </OptionText>
                    ))}
                  </Checkbox.Group>
                </Form.Item>
              ) : (
                question?.question?.question_type === "radio" && (
                  <Form.Item name={question?.question?.id}>
                    <Radio.Group style={{ paddingLeft: "18px" }}>
                      {question?.options.map((option: any, index: any) => (
                        <OptionText>
                          <Radio
                            value={option?.id}
                            style={{ fontSize: "18px" }}
                          >
                            {option?.option_text}
                          </Radio>
                          <br />
                        </OptionText>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                )
              )}
            </Row>
          </QuizContainer>
        ))}

        <CustomizedButtonGroup>
          <Space>
            {filterParams.currentPage > 1 && (
              <Button
                style={{ marginTop: "20px" }}
                type="primary"
                size="large"
                //   onClick={handlePrevButtonClick}
                onClick={Prev}
              >
                Prev
              </Button>
            )}

            <Button
              style={{ marginTop: "20px" }}
              type="primary"
              size="large"
              htmlType="submit"
              // onClick={handleButtonClick}
            >
              {filterParams.currentPage >= 1 ? "Submit" : "Next"}
            </Button>
          </Space>
        </CustomizedButtonGroup>
      </Form>
      <ConfirmModal
        buttonTitle="Confirm"
        openCloseModal={openCloseNextQuestionModal}
        open={isQuestionPaginationModalOpen}
        confirmText={
          undefinedQuestions.length >= 0
            ? "want go to next page"
            : `move to next page as you havn't answered ${undefinedQuestions.length} questions`
        }
        onConfirmModal={onConfirmDelete}
        icon={<ExclamationOutlined style={{ color: Colors.DANGER }} />}
      />
    </>
  );
};

export default withKeyboardDisabled(ExamWithPagination);

const QuizContainer = styled.div`
  background: white;
  padding: 30px;
  width: 100%;
  float: left;
`;

const StyleTag = styled(Tag)`
  color: white;
  background-color: #ff7000;
  border: none;
  font-size: 14px;
  font-weight: bold;
  padding: 5px;
`;

const QuizFinished = styled.div`
  background: white;
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  fontweight: 700;
  font-size: 14px;
  // width: 100vw;
`;

const OptionText = styled.div`
  // font-size: 22px;
  font-weight: 500;
  margin-top: 10px;
  // width: 100vw;
`;

const CustomizedButtonGroup = styled.div`
  float: right;
`;

const PageHeaderNaviagtion = styled.div`
  top: 0;
  position: fixed;
  width: 100%;
  background: #fff;
  padding: 5px;
`;
