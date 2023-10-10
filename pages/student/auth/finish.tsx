import React from "react";
import styled from "styled-components";

const ExamFinished = () => {
  return (
    <QuizFinished>
      <h1>Thank you! All the best for the result</h1>
    </QuizFinished>
  );
};

export default ExamFinished;

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
