import { NextPage } from "next";
import { MailOutlined } from "@ant-design/icons";
import { Form, Input, Button, message } from "antd";
import { useMutation } from "react-query";
import { login } from "apis/auth";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

import {
  LoginPage,
  PageLogo,
  LoginContainer,
  VerticalDividerLine,
  AuthBlock,
  TextBlock,
  LoginImageBlock,
  LoginHeading,
} from "../../styles/authCSS";
import urls from "configs/urls";
import CustomLink from "components/CustomLink";
import http, { setTokenInHeader } from "utils/http";

const Login: NextPage = (props): JSX.Element => {
  const loginMutation = useMutation((data: LoginPayload) => login(data));
  const router = useRouter();

  const onFinish = (data: LoginPayload) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        const token = response.data.data.access_token;
        const refresh_token = response.data.data.refresh_token;
        const decoded: any = jwt_decode(token);
        const role = decoded.role;
        const username = decoded.username;
        Cookies.set("token", token);
        Cookies.set("refresh-token", refresh_token);
        Cookies.set("role", role);
        Cookies.set("username", username);
        setTokenInHeader(http, token);
        router.push("/dashboard");
      },
      onError: (data: any) => {
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage);
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
        <LoginHeading>AEICE</LoginHeading>
      </PageLogo>
      <LoginContainer>
        <LoginImageBlock>
          <img src="/password-login.svg" alt="login-image" />
        </LoginImageBlock>
        <VerticalDividerLine />
        <AuthBlock>
          <h2>Login</h2>
          <Form name="basic" onFinish={onFinish} autoComplete="off">
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                name="email"
                id="email"
                type="email"
                size="large"
                placeholder="Email"
                suffix={<MailOutlined />}
                autoComplete="false"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                name="password"
                id="password"
                size="large"
                placeholder="Password"
                type="password"
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
            <span>
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
            </span>
          </TextBlock>
        </AuthBlock>
      </LoginContainer>
    </LoginPage>
  );
};

export default Login;
