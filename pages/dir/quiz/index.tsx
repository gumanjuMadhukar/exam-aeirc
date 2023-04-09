import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import QuestionAPI from "apis/question";
import { Checkbox, Radio } from "antd";

const Quiz = () => {
  const [questions, setQuestions] = useState<any>([]); // Store the fetched questions
  const [currentQuestion, setCurrentQuestion] = useState(0); // Keep track of the current question index
  const [answers, setAnswers] = useState<any>({}); // Store the answers
  const questionAPI = new QuestionAPI();

  const queryList = useQuery(["RandomList"], async () => {
    const response = await questionAPI.getRandomQuestion(1);

    return response?.data?.data;
  });

  useEffect(() => {
    setQuestions(queryList?.data);
  }, [queryList]);
  // Handle answer submission
  const handleAnswerSubmit = (answer: any) => {
    // Store the answer in the answers object
    setAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      [currentQuestion]: answer,
    }));

    // Move to the next question
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  if (questions?.length === 0 || currentQuestion >= questions?.length) {
    return <h1>Thank you!</h1>;
  } else {
    if (questions) {
      const question = questions[currentQuestion];
      return (
        <div>
          {" "}
          <h2>{question?.question_text}</h2>
          <ul>
            {question?.question_type === "checkbox"
              ? question?.options.map((option: any, index: any) => (
                  <Checkbox key={index}>{option?.option_text}</Checkbox>
                ))
              : question?.question_type === "radio" && (
                  <Radio.Group>
                    {question?.options.map((option: any, index: any) => (
                      <Radio value={option?.id}>{option?.option_text}</Radio>
                    ))}
                  </Radio.Group>
                )}
          </ul>
        </div>
      );
    }
  }
};

export default Quiz;
