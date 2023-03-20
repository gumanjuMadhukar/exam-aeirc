import styled, { keyframes } from 'styled-components';

const CheckMark = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid #fff;
  transition: all 0.8s ease-in-out;
  &::before,
  &::after {
    content: '';
    display: block;
    position: relative;
  }
  &::before {
    width: 12px;
    height: 36px;
    top: 10px;
    left: 30px;
    border: solid #fff;
    border-width: 0 5px 5px 0;
    transform: rotate(45deg);
}
  }
`;

const animate = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const AnimatedCheckMark = styled(CheckMark)`
  background-color: #a0d911;
  animation: ${animate} 0.3s ease-in-out;
`;

function SuccessCheckMark() {
  return <AnimatedCheckMark />;
}

export default SuccessCheckMark;
