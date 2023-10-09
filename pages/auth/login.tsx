import { NextPage } from "next";
import { MailOutlined } from "@ant-design/icons";
import { Form, Input, Button, message } from "antd";
import { useMutation } from "react-query";
import { login } from "apis/auth";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
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
import CustomLink from "components/CustomLink";
import http, { setTokenInHeader } from "utils/http";

const Login: NextPage = (_props): JSX.Element => {
  const loginMutation = useMutation((data: LoginPayload) => login(data));
  const router = useRouter();

  const onFinish = (data: LoginPayload) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        const token = response.data.token;
        const refresh_token = response.data.refresh_token;

        const role = response.data.user.roles[0].name;
        const user = response.data.user.name;
        Cookies.set("token", token);
        Cookies.set("role", role);
        Cookies.set("user", user);
        Cookies.set("refresh_token", refresh_token);
        setTokenInHeader(http, token);
        router.push("/dashboard");
      },
      onError: (data: any) => {
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
                // url={urls.forgotPassword}
                customStyle={{ color: "#aaa" }}
              />
            </span>
            <br />
            <span>
              Don&apos;t have an Account?&nbsp;&nbsp;
              <CustomLink
                text="Register"
                //  url={urls.register}
              />
            </span>
          </TextBlock>
        </AuthBlock>
      </LoginContainer>
    </LoginPage>
  );
};

export default Login;
