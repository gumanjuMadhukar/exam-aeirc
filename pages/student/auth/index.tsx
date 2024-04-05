import { NextPage } from "next";
import { MailOutlined, KeyOutlined } from "@ant-design/icons";
import { Form, Input, Button, message } from "antd";
import { useMutation } from "react-query";
import { studentLogin } from "apis/auth";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import http, { setTokenInHeader } from "utils/http";
import styled from "styled-components";

const Login: NextPage = (_props): JSX.Element => {
  const loginMutation = useMutation((data: any) => studentLogin(data));
  const router = useRouter();

  const onFinish = (data: any) => {
    // const newData = {
    //   ...data,
    //   date_of_birth: moment(data.date_of_birth).format("YYYY-MM-DD"),
    // };
    loginMutation.mutate(data, { 
      onSuccess: (response) => {
        const token = response.data.token;
        // const role = response.data.user.roles[0].name;
        const user = response.data.user;
        Cookies.set("token", token);
        Cookies.set("role", "Student");
        Cookies.set("student_id", user.id);
        Cookies.set("photo", user.photo);
        setTokenInHeader(http, token);
        router.push("/student/dashboard");
      },
      onError: (data: any) => {
        // console.log(data);
        // const _errorMessage = data?.message;
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
    <LoginPages>
      <PageLogo>
        <LoginHeading>Ayurveda</LoginHeading>
      </PageLogo>
      <LoginContainer>
        <AuthBlock>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              name="symbol_number"
              label="Symbol Number"
              rules={[
                { required: true, message: "Please input your symbol number!" },
              ]}
            >
              <Input
                name="symbol_number"
                id="symbol_number"
                size="large"
                placeholder="Symbol Number"
                suffix={<MailOutlined />}
                autoComplete="off"
              />
            </Form.Item>
            {/* <Form.Item
              name="confirm_symbol_number"
              label="Confirm Symbol Number"
              dependencies={["symbol_number"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your symbol number!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("symbol_number") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two symbol numbers do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input
                name="confirm_symbol_number"
                id="confirm_symbol_number"
                size="large"
                placeholder="Confirm Symbol Number"
                suffix={<MailOutlined />}
                autoComplete="off"
              />
            </Form.Item> */}
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input
                name="password" 
                id="password"
                size="large"
                placeholder="Password"
                suffix={<KeyOutlined />}
                type="password"
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                block
                size="large"
                htmlType="submit"
                style={{ background: "#93DEFF" }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <TextBlock></TextBlock>
        </AuthBlock>
      </LoginContainer>
    </LoginPages>
  );
};

export default Login;

export const LoginPages = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 5%;
  background: #d6cfc7;
`;

export const PageLogo = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
  // color: white;
`;

export const LoginContainer = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 2px;
  // border: 1px solid #000;

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
  // color: white;
`;
