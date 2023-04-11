import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import QuestionAPI from "apis/question";
import { Button, Checkbox, Col, Divider, Radio, Row, Space, Tag } from "antd";
import styled from "styled-components";

const Quiz = () => {
  const [questions, setQuestions] = useState<any>([]); // Store the fetched questions
  const [currentQuestion, setCurrentQuestion] = useState(0); // Keep track of the current question index
  const [answers, setAnswers] = useState<any>({}); // Store the answers
  const questionAPI = new QuestionAPI();

  const queryList = useQuery(["RandomList"], async () => {
    const response = await questionAPI.getRandomQuestion(1);

    return response?.data?.data;
  });

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

  useEffect(() => {
    setQuestions(queryList?.data);
  }, [queryList]);
  // Handle answer submission
  const handleAnswerSubmit = (answer: any) => {
    // Store the answer in the answers object
    setAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      answer,
    }));

    console.log(answers);
    // Move to the next question
  };

  const handleButtonClick = () => {
    // Perform additional logic or submit answers
    console.log("Answers:", answers);

    console.log(questions[currentQuestion]);
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setAnswers({});
  };

  if (questions?.length === 0 || currentQuestion >= questions?.length) {
    return (
      <QuizFinished>
        <h1>Thank you! All the best for the result</h1>;
      </QuizFinished>
    );
  } else {
    if (questions) {
      const question = questions[currentQuestion];
      return (
        <>
          {" "}
          <Space size={[0, 8]} wrap>
            <StyleTag color="blue">
              Question {currentQuestion + 1} of {questions?.length}
            </StyleTag>
          </Space>
          <Divider orientation="left"></Divider>
          <QuizContainer>
            <Row style={{ fontSize: "24px", fontWeight: "700" }}>
              {currentQuestion + 1}. {"  "} {question?.question_text}
            </Row>
            <br />
            <Row>
              {question?.question_type === "checkbox" ? (
                <Checkbox.Group
                  onChange={(checkedValues) =>
                    handleAnswerSubmit(checkedValues)
                  }
                >
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
              ) : (
                question?.question_type === "radio" && (
                  <Radio.Group
                    onChange={(e) => handleAnswerSubmit(e.target.value)}
                    style={{ paddingLeft: "18px" }}
                  >
                    {question?.options.map((option: any, index: any) => (
                      <OptionText>
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
              <Button
                style={{ marginTop: "20px" }}
                type="primary"
                size="large"
                onClick={handleButtonClick}
              >
                Next
              </Button>
            </CustomizedButtonGroup>
          </QuizContainer>
        </>
      );
    }
  }
};

export default Quiz;

const QuizContainer = styled.div`
  // background: white;
  padding: 10px;
  width: 60%;
  margin: auto;
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
  float: right;
  margin-top: 10px;

  margin-right: 50px;
`;
