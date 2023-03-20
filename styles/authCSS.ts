import styled from "styled-components";

export const LoginPage = styled.div`
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 5%;
  background-image: url("/login-background.svg");
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const PageLogo = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
`;

export const LoginContainer = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 2px;
  @media (min-width: 768px) {
    display: flex;
    width: 720px;
  }
  @media (min-width: 992px) {
    display: flex;
    width: 920px;
  }
`;
export const VerticalDividerLine = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin: 70px 0;
  border-inline-start: 1px solid #f0f0f0;
  @media (max-width: 767px) {
    display: none;
  }
`;

export const AuthBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  padding: 30px;
  @media (max-width: 767px) {
    width: 80vw;
  }
  @media (max-width: 600px) {
    width: 100vw;
  }
`;
export const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    color: #007bff;
  }

  span {
    color: #404040;
  }
`;

export const LoginImageBlock = styled.div`
  width: 50%;
  padding: 15%;
  @media (max-width: 767px) {
    display: none;
  }
  @media (max-width: 992px) {
    padding: 15% 10%;
  }
`;

export const PageHeaderWrapper = styled.div`
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;

export const LoginHeading = styled.div`
  font-size: 44px;
  font-weight: 800;
  letter-spacing: 2px;
`;
