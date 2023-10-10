import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import QuestionAPI from "apis/question";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Radio,
  Row,
  Segmented,
  Space,
  Tag,
} from "antd";
import styled from "styled-components";
import { Colors } from "utils/colors";
import { ExclamationOutlined, CheckOutlined } from "@ant-design/icons";
import ConfirmModal from "components/ConfirmModal";
import Clock from "utils/clock";
import { INITIAL_CURRENT_PAGE } from "constants/common";

interface FilterParams {
  currentPage: number;
  pageSize: number;
  status: string;
  search: string;
}

const DefaultFilterParams = {
  currentPage: INITIAL_CURRENT_PAGE,
  pageSize: 15,
  status: "true",
  search: "",
};

type Props = {};
const ExamWithPagination: React.FC<Props> = (_props) => {
  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem?.requestFullscreen();
    }
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
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

  const [filterParams, setFilterParams] =
    useState<FilterParams>(DefaultFilterParams);

  const [answered, setAnswered] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
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

      const response = await questionAPI.getPaginatedQuestion(queryParams, 5);

      return response?.data?.data;
    }
  );

  const [questions, setQuestions] = useState<any>([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const [undefinedQuestions, setUndefinedQuestions] = useState<string[]>([]);
  useEffect(() => {
    setQuestions(queryList?.data);
  }, [queryList]);

  // const Next = () => {
  //   setFilterParams({
  //     ...filterParams,
  //     currentPage: filterParams.currentPage + 1,
  //   });
  // };
  const Prev = () => {
    setFilterParams({
      ...filterParams,
      currentPage: filterParams.currentPage - 1,
    });
  };

  const saveQuestionsAnswer = useMutation((data: any) =>
    questionAPI.storeMultipleQuestionAnswer(data)
  );

  const [_percentComplete, setPercentComplete] = useState(0);
  const onFinish = (data: any) => {
    const keys = Object.keys(data);
    setAnswered(answered + Object.keys(data).length);

    const newData = {
      student_id: 2,
      data: data,
    };

    const undefinedKeys = keys?.filter((key) => data[key] === undefined);
    setUndefinedQuestions(undefinedKeys);
    saveQuestionsAnswer.mutate(newData, {
      onSuccess: () => {
        // queryClient.invalidateQueries(["RandomList"]);
        openCloseNextQuestionModal();
      },
      onError: (_data: any) => {},
    });

    const numQuestions = 100;
    setTotalQuestions(numQuestions);
  };
  useEffect(() => {
    setPercentComplete((answered / totalQuestions) * 100);
  }, [totalQuestions, answered]);

  const [isQuestionPaginationModalOpen, setIsQuestionPaginationModalOpen] =
    useState(false);

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

  const handleQuestionSelect = (data: any) => {
    setCurrentQuestion(data);
  };

  const options = questions?.map((question: any, i: number) => {
    return {
      label: (
        <div
          style={{
            padding: 3,
            color: question.is_answered && Colors.SECONDARY,
            fontWeight: question.is_answered && 800,
            fontSize: "18px",
          }}
        >
          <div>{i}</div>
          {question.is_answered && (
            <div
              style={{
                content: "",
                position: "absolute",
                top: "30%",
                right: "15px", // adjust this value to position the tick icon
                transform: "translateY(-50%)",
                width: "0.5em",
                height: "0.5em",
                color: "green",
              }}
            >
              <CheckOutlined />
            </div>
          )}
        </div>
      ),
      value: i,
      key: i,
    };
  });
  return (
    <>
      <PageHeaderNaviagtion>
        <Row justify="space-between" gutter={[16, 24]}>
          <Col span={8}>
            <h3>Abhishek Thapa</h3>
          </Col>
          <Col
            span={8}
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "25px",
            }}
          ></Col>
          <Col
            span={8}
            style={{
              textAlign: "right",
              fontWeight: "bold",
              marginTop: "5px",
              fontSize: "25px",
            }}
          >
            <Clock />
          </Col>
        </Row>
      </PageHeaderNaviagtion>
      <Container>
        <Row>
          <Col md={16} lg={16}>
            <Form
              name="register"
              onFinish={onFinish}
              autoComplete="off"
              style={{ marginBottom: "10px", width: "100%" }}
            >
              {questions?.map((question: any, index: number) => (
                <QuizContainer>
                  <Row
                    style={{
                      fontSize: "13px",
                      marginLeft: "15px",
                      justifyContent: "space-between",
                    }}
                  >
                    <Col md={18}>Question {index + 1}</Col>
                    <Col>
                      <Tag color="#87d068">
                        {question?.question?.weightage} marks
                      </Tag>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      fontSize: "15px",
                      marginLeft: "15px",
                      marginTop: "10px",
                    }}
                  >
                    {question?.question?.question_text}
                  </Row>
                  <Row
                    style={{
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    {question?.question?.question_type === "checkbox" ? (
                      <Col md={24} lg={24}>
                        <Form.Item name={question?.question?.id}>
                          <Checkbox.Group key={question?.question?.id}>
                            <Row
                              style={{
                                justifyContent: "space-between",
                              }}
                            >
                              {question?.options.map(
                                (option: any, index: any) => (
                                  <Col
                                    lg={24}
                                    xs={24}
                                    md={11}
                                    style={{ width: "100%", marginTop: "10px" }}
                                  >
                                    <Checkbox
                                      key={index}
                                      value={option?.id}
                                      style={{
                                        borderRadius: "10px",
                                        padding: "10px",
                                        marginRight: "10px",
                                        width: "100%",
                                        transition: "background-color 0.3s",
                                      }}
                                      className="hover-checkbox"
                                    >
                                      {option?.option_text}
                                    </Checkbox>
                                  </Col>
                                )
                              )}
                            </Row>
                          </Checkbox.Group>
                        </Form.Item>
                      </Col>
                    ) : (
                      question?.question?.question_type === "radio" && (
                        <Col md={24} lg={24} xl={24}>
                          <Form.Item name={question?.question?.id}>
                            <Radio.Group>
                              <Row
                                style={{
                                  justifyContent: "space-between",
                                  width: "48vw",
                                }}
                              >
                                {question?.options.map(
                                  (option: any, _index: any) => (
                                    <Col
                                      lg={24}
                                      xs={24}
                                      md={11}
                                      style={{
                                        width: "100%",
                                        marginTop: "10px",
                                      }}
                                    >
                                      <Radio
                                        value={option?.id}
                                        style={{
                                          padding: "10px",
                                          marginRight: "10px",
                                          width: "100%",
                                          transition: "background-color 0.3s",
                                        }}
                                        className="hover-checkbox"
                                      >
                                        {option?.option_text}
                                      </Radio>
                                    </Col>
                                  )
                                )}
                              </Row>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      )
                    )}
                  </Row>
                </QuizContainer>
              ))}

              <CustomizedButtonGroup>
                <Space>
                  {filterParams.currentPage > 1 && (
                    <CustomizedButton
                      style={{ marginTop: "20px" }}
                      type="primary"
                      size="large"
                      onClick={Prev}
                    >
                      Previous
                    </CustomizedButton>
                  )}

                  <CustomizedButton
                    style={{ marginTop: "20px" }}
                    type="primary"
                    size="large"
                    htmlType="submit"
                    // onClick={handleButtonClick}
                  >
                    {filterParams.currentPage >= 1 ? "Next" : "Submit"}
                  </CustomizedButton>
                </Space>
              </CustomizedButtonGroup>
            </Form>
          </Col>
          <Col md={8} lg={8}>
            <Card
              style={{
                float: "left",
                height: "500px",
                overflow: "auto",
                marginLeft: "10px",
                width: "25%",
                position: "fixed",
              }}
              headStyle={{
                position: "sticky",
                top: 0,
                background: "#fff",
                zIndex: 1,
              }}
              title={
                <>
                  <OptionText> IOE Model Test </OptionText>

                  <span style={{ color: Colors.GREY8, fontSize: "14px" }}>
                    100 Questions - 2.00 hours
                  </span>
                </>
              }
            >
              <Row
                style={{
                  justifyContent: "space-around",
                  textAlign: "center",
                  background: "rgba(245, 247, 255, 255)",
                  padding: "10px",
                  border: "1px solid black",
                }}
              >
                <Col style={{ textAlign: "center" }}>
                  <Tag>10</Tag> <br></br>
                  Unanswered
                </Col>
                {/* <Divider orientation="center"></Divider> */}

                <Col style={{ textAlign: "center" }}>
                  {" "}
                  <Tag>10</Tag> <br></br>Answered
                </Col>
              </Row>
              <Segmented
                options={options?.map((question: any) => ({
                  label: question.label,
                  value: question.value,
                }))}
                onChange={handleQuestionSelect}
                value={currentQuestion}
                className="segmented-options"
                style={{ color: Colors.WHITE }}
              />
            </Card>
          </Col>
        </Row>
        <ConfirmModal
          buttonTitle="Confirm"
          openCloseModal={openCloseNextQuestionModal}
          open={isQuestionPaginationModalOpen}
          confirmText={
            undefinedQuestions.length <= 0
              ? " go to next page"
              : `move to next page as you havn't answered ${undefinedQuestions.length} questions`
          }
          onConfirmModal={onConfirmDelete}
          icon={<ExclamationOutlined style={{ color: Colors.DANGER }} />}
        />
      </Container>
    </>
  );
};

export default ExamWithPagination;

const Container = styled.div`
  padding: 10px;
  height: 100%;
  margin-bottom: 20px !important;
  margin-left: 10%;
  margin-right: 10%;
  border-radius: 20px;
`;
const QuizContainer = styled.div`
  background: white;
  padding: 30px;
  width: 100%;
  height: 100%;
  margin-bottom: 20px !important;
  border-shadow: ;
`;

const OptionText = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

const CustomizedButtonGroup = styled.div`
  display: block;
  position: inherit;
  text-align: center;
  margin-bottom: 20px !important;
  height: 100px;
`;

const CustomizedButton = styled(Button)`
  padding: 10px !important;
  font-size: 16px !important;
  height: fit-content !important;
  // width: 45vw !important;
`;
const PageHeaderNaviagtion = styled.div`
  top: 0;
  width: 100%;
  background: #fff;
  padding: 5px;
  z-index: 1000;
  height: 60px;
  border-bottom: 1px solid ${Colors.PRIMARY};
`;
