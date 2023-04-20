import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import QuestionAPI from "apis/question";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
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
import { CheckCircleOutlined, CheckOutlined } from "@ant-design/icons";

const Quiz = () => {
  const [questions, setQuestions] = useState<any>([]); // Store the fetched questions
  const [currentQuestion, setCurrentQuestion] = useState(0); // Keep track of the current question index
  const [answers, setAnswers] = useState<any>({}); // Store the answers
  const questionAPI = new QuestionAPI();
  const queryClient = useQueryClient();
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [submitQuiz, setSumitQuiz] = useState<boolean>(false);
  const router = useRouter();
  const student_id = Cookies.get("student_id");
  const queryList = useQuery(["RandomList"], async () => {
    const response = await questionAPI.getRandomQuestion(student_id);

    return response?.data?.data;
  });

  const saveQuestionsAnswer = useMutation((data: any) =>
    questionAPI.postQuestionsAnswer(data)
  );

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape") {
        event.preventDefault(); // Prevent default behavior of Esc key
        // Do any other actions you want to perform when Esc key is pressed
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown); // Clean up event listener
    };
  }, []);
  const FullScreenPage = () => {
    useEffect(() => {
      const enterFullScreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        }
      };

      enterFullScreen();

      // Clean up the full-screen mode when the component unmounts
      return () => {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      };
    }, []);
  };

  useEffect(() => {
    setQuestions(queryList?.data);
  }, [queryList]);
  // Handle answer submission

  // console.log(queryList?.data?.question);
  const handleAnswerSubmit = (answer: any) => {
    // Store the answer in the answers object
    const question = questions[currentQuestion];
    setAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      option_ids: answer,
    }));
    setCheckedList(answer);

    // Move to the next question
  };

  const handleButtonClick = () => {
    //Code to capture the screenshot
    // html2canvas(window.document.documentElement).then((canvas) => {
    //   const dataUrl = canvas.toDataURL();
    //   console.log(dataUrl);
    //   // Use the dataUrl for further processing, such as saving the screenshot or displaying it in an image element
    // });

    console.log(answers ? checkedList : answers.option_ids);
    const newData = {
      student_id: 2,
      question_id: questions[currentQuestion]?.question.id,
      option_ids: answers ? checkedList : answers.option_ids,
    };
    saveQuestionsAnswer.mutate(newData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["RandomList"]);
        currentQuestion >= questions?.length - 1
          ? setSumitQuiz(true)
          : setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        setAnswers({});
      },
      onError: (data: any) => {
        const errorMessageWithNetworkIssue = data?.message;
        const errorMessage = data?.response?.data?.message;
      },
    });
  };

  const handlePrevButtonClick = () => {
    setCurrentQuestion((prevQuestion) =>
      prevQuestion > 0 ? prevQuestion - 1 : 0
    );
    setAnswers({});
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
          <div>{i + 1}</div>
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

  const handleQuestionSelect = (data: any) => {
    setCurrentQuestion(data);
  };

  const handleModalOpenClose = () => {
    setSumitQuiz(!submitQuiz);
  };

  const handleModalSubmit = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("student_id");
    router.push("/student/auth/finish");
  };

  useEffect(() => {
    const question = questions[currentQuestion];
    const arr: any[] = [];
    question?.attempted_options &&
      question?.attempted_options.map((data: any) => {
        arr.push(data.id);
      });
    setCheckedList(arr);
  }, [currentQuestion]);

  if (questions?.length === 0 || currentQuestion >= questions?.length) {
    return (
      <QuizFinished>
        <h1>Thank you! All the best for the result</h1>
      </QuizFinished>
    );
  } else {
    if (questions) {
      const question = questions[currentQuestion];

      console.log(checkedList);
      return (
        <div>
          {" "}
          <PageHeaderNaviagtion>
            <Row justify="space-between" gutter={[16, 24]}>
              <Col span={8}>
                <img
                  src="profile-default.png"
                  style={{ border: "1px solid black" }}
                ></img>
              </Col>
              <Col
                span={8}
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginTop: "25px",
                  fontSize: "25px",
                }}
              >
                {currentQuestion + 1} / {questions?.length} Question
              </Col>
              <Col
                span={8}
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                  marginTop: "20px",
                  fontSize: "25px",
                }}
              >
                <Clock />
              </Col>
            </Row>
          </PageHeaderNaviagtion>
          <Space size={[0, 8]} wrap>
            <StyleTag color="blue">
              Question {currentQuestion + 1} of {questions?.length}
            </StyleTag>
          </Space>
          <Divider orientation="left"></Divider>
          <QuizContainer>
            <Row style={{ fontSize: "24px", fontWeight: "700" }}>
              {currentQuestion + 1}. {"  "} {question?.question?.question_text}
            </Row>
            <br />
            <Row>
              {question?.question?.question_type === "checkbox" ? (
                <Checkbox.Group
                  onChange={(checkedValues) =>
                    handleAnswerSubmit(checkedValues)
                  }
                  value={checkedList}
                >
                  {question?.options.map((option: any, index: any) => (
                    <OptionText
                      style={{
                        background: "rgba(218, 247, 166, 25%)",
                        border: "1px solid rgba(218, 247, 166, 100%)",
                        width: "65vw",
                        paddingTop: "15px",
                        paddingLeft: "10px",
                      }}
                    >
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
              ) : (
                question?.question?.question_type === "radio" && (
                  <Radio.Group
                    onChange={(e) => handleAnswerSubmit([e.target.value])}
                    style={{ paddingLeft: "18px" }}
                    value={checkedList[0]}
                  >
                    {question?.options.map((option: any, index: any) => (
                      <OptionText
                        style={{
                          background: "rgba(218, 247, 166, 25%)",
                          border: "1px solid rgba(218, 247, 166, 100%)",
                          width: "65vw",
                          padding: "15px",
                        }}
                      >
                        <Radio value={option?.id} style={{ fontSize: "18px" }}>
                          {option?.option_text}
                        </Radio>
                        <br />
                      </OptionText>
                    ))}
                  </Radio.Group>
                )
              )}
            </Row>
            <CustomizedButtonGroup>
              <Space>
                {currentQuestion > 0 && (
                  <CustomizedButton
                    style={{ marginTop: "20px" }}
                    type="primary"
                    size="large"
                    onClick={handlePrevButtonClick}
                  >
                    Prev
                  </CustomizedButton>
                )}

                <CustomizedButton
                  style={{ marginTop: "20px" }}
                  type="primary"
                  size="large"
                  onClick={handleButtonClick}
                >
                  {currentQuestion >= questions?.length - 1 ? "Submit" : "Next"}
                </CustomizedButton>
              </Space>
            </CustomizedButtonGroup>
          </QuizContainer>
          <Card
            style={{
              width: "24%",
              float: "left",
              height: "500px",
              overflow: "auto",
            }}
            headStyle={{
              position: "sticky",
              top: 0,
              background: "#fff",
              zIndex: 1,
            }}
            title="Number of Question"
          >
            <Segmented
              options={options.map((question: any) => ({
                label: question.label,
                value: question.value,
              }))}
              onChange={handleQuestionSelect}
              value={currentQuestion}
              className="segmented-options"
              style={{ color: Colors.WHITE }}
            />
          </Card>
          <ConfirmModal
            buttonTitle="Confirm"
            openCloseModal={handleModalOpenClose}
            open={submitQuiz}
            confirmText="submit the quiz"
            onConfirmModal={handleModalSubmit}
            icon={<ExclamationOutlined style={{ color: Colors.DANGER }} />}
          />
        </div>
      );
    }
  }
};

export default Quiz;

const QuizContainer = styled.div`
  background: white;
  padding: 30px;
  width: 70%;
  margin: auto;
  float: left;
  min-height: 500px;
  margin-right: 40px;
  margin-left: 40px;

  // display: flex;
  // justify-content: center;
  // flex-direction: column;
  // align-items: center;
  // height: 100vh;
  // width: 100vw;
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
  display: block;
  position: inherit;
  text-align: center;
  // margin-bottom: 20px !important;
  height: 100px;
  // width: 100vw;
  // background-color: red;
  margin-top: 50px;
`;

const CustomizedButton = styled(Button)`
  padding: 10px !important;
  font-size: 16px !important;
  height: fit-content !important;
  width: 30vw !important;
`;

const PageHeaderNaviagtion = styled.div`
  top: 0;
  position: fixed;
  width: 100%;
  background: #fff;
  padding: 5px;
`;
