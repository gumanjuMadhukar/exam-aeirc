import { NextPage } from "next";
import { MailOutlined } from "@ant-design/icons";
import { Form, Input, Button, message } from "antd";
import { useMutation } from "react-query";
import { login, studentLogin } from "apis/auth";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import urls from "configs/urls";
import CustomLink from "components/CustomLink";
import http, { setTokenInHeader } from "utils/http";
import styled from "styled-components";
import moment from "moment";

const Login: NextPage = (props): JSX.Element => {
  const loginMutation = useMutation((data: any) => studentLogin(data));
  const router = useRouter();

  const onFinish = (data: any) => {
    console.log(data);

    const newData = {
      ...data,
      date_of_birth: moment(data.date_of_birth).format("YYYY-MM-DD"),
    };

    console.log(newData);
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        console.log(response);
        const token = response.data.token;
        // const role = response.data.user.roles[0].name;
        const user = response.data.user;

        Cookies.set("token", token);
        Cookies.set("role", "Student");
        Cookies.set("student_id", user.id);
        setTokenInHeader(http, token);
        router.push("/student/dashboard");
      },
      onError: (data: any) => {
        // console.log(data);
        const errorMessage = data?.message;
        message.error("Invalid Credentials");
        if (
          data?.response?.data?.error_code &&
          data?.response?.data?.error_code === "USER_NOT_VERIFIED"
        ) {
          router.push(
            `/auth/register-verification/${data?.response?.data?.user?.id}`
          );
        }
      },
    });
  };

  return (
    <LoginPage>
      <PageLogo>
        {/* <img src="/AEICE.jpeg" alt="logo" width="168px" /> */}
        <LoginHeading>AEIRC</LoginHeading>
      </PageLogo>
      <LoginContainer>
        <AuthBlock>
          <h2>Login</h2>
          <Form name="basic" onFinish={onFinish} autoComplete="off">
            <Form.Item
              name="symbol_number"
              rules={[
                { required: true, message: "Please input your symbol Number!" },
              ]}
            >
              <Input
                name="symbol_number"
                id="symbol_number"
                type="text"
                size="large"
                placeholder="Symbol Number"
                suffix={<MailOutlined />}
                autoComplete="false"
              />
            </Form.Item>
            <Form.Item
              name="date_of_birth"
              rules={[
                { required: true, message: "Please input your date of birth!" },
              ]}
            >
              <Input
                name="date_of_birth"
                id="date_of_birth"
                size="large"
                placeholder="YYYY-MM-DD"
                type="date_of_birth"
                autoComplete="false"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block size="large" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
          <TextBlock>
            {/* <span>
              <CustomLink
                text="Forgot your Password?"
                url={urls.forgotPassword}
                customStyle={{ color: "#aaa" }}
              />
            </span>
            <br />
            <span>
              Don&apos;t have an Account?&nbsp;&nbsp;
              <CustomLink text="Register" url={urls.register} />
            </span> */}
          </TextBlock>
        </AuthBlock>
      </LoginContainer>
    </LoginPage>
  );
};

export default Login;

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
  margin: auto;
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
  height: 50px;
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
