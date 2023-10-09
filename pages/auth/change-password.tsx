import { Alert, Button, Form, Input } from "antd";
import Cookies from "js-cookie";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import {
  AuthBlock,
  LoginContainer,
  LoginImageBlock,
  LoginPage,
  VerticalDividerLine,
} from "../../styles/authCSS";
import { changePassword } from "../../apis/auth";
import { Colors } from "utils/colors";

interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const validateMessages = {
  required: "Required field!",
  string: {
    min: "Must be at least ${min} characters",
  },
  pattern: {
    mismatch:
      "Password is too weak, must have capital letters, numbers and symbols.",
  },
};

const ChangePassword: NextPage = (_props): JSX.Element => {
  const [errorMessageText, setErrorMessageText] = useState(null);
  const changePasswordMutation = useMutation((data: ChangePassword) =>
    changePassword(data)
  );
  const router = useRouter();
  const onFinish = (data: ChangePassword) => {
    changePasswordMutation.mutate(data, {
      onSuccess: (_data) => {
        setErrorMessageText(null);
        Cookies.remove("token");
        router.push("login");
      },
      onError: (data: any) => {
        const errors = data?.response?.data?.errors;
        const errorMessages = errors?.map(
          (item: any) => `${Object.values(item.errors)}\n`
        );
        const message = data?.response?.data?.message;
        setErrorMessageText(errorMessages || message);
      },
    });
  };

  return (
    <LoginPage>
      <LoginContainer>
        <LoginImageBlock>
          {/* <img src="/password-login.svg" alt="login-image" /> */}
        </LoginImageBlock>
        <VerticalDividerLine />
        <AuthBlock>
          <h3>Change Password</h3>
          <Form validateMessages={validateMessages} onFinish={onFinish}>
            <Form.Item
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your current password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Current Password"
                name="currentPassword"
              />
            </Form.Item>
            <Form.Item
              name="newPassword"
              rules={[
                {
                  type: "string",
                  required: true,
                  min: 8,
                  pattern:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%^&(){}[\]:;<>,.?/~_+\-=|]).{8,32}$/,
                },
              ]}
            >
              <Input.Password placeholder="New Password" name="newPassword" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Please confirm password!" },
                ({ getFieldValue }) => ({
                  validator(_rule, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                name="confirmPassword"
              />
            </Form.Item>
            {errorMessageText && (
              <div>
                <Alert type="error" message={errorMessageText} banner />
                <br />
              </div>
            )}
            <Form.Item>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: Colors.PRIMARY,
                  color: "#fff",
                }}
                size="large"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </AuthBlock>
      </LoginContainer>
    </LoginPage>
  );
};

export default ChangePassword;
