import { ReactElement, useState } from "react";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input, Button, Alert } from "antd";
import { useMutation } from "react-query";
import { register } from "apis/auth";
import { useRouter } from "next/router";
import { TextBlock } from "../../styles/authCSS";
import { officeEmailValidation } from "utils";
import AuthLayout from "components/layout/auth-layout";
import Head from "next/head";
import urls from "configs/urls";
import CustomLink from "components/CustomLink";
import { Colors } from "utils/colors";

interface Props {}
interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

const Register: NextPageWithLayout = () => {
  const [errorMessageText, setErrorMessageText] = useState(null);

  const registerMutation = useMutation((data: RegisterPayload) =>
    register(data)
  );
  const router = useRouter();
  const onFinish = (data: any) => {
    delete data.confirmPassword;
    registerMutation.mutate(data, {
      onSuccess: (data: any) => {
        setErrorMessageText(null);
        const userId = data?.data?.data?.user?.id;
        router.push(`/auth/register-verification/${userId}`);
      },
      onError: (data: any) => {
        const errors = data?.response?.data?.errors;
        const errorMessages = errors?.map((item: any) => item.errors.matches);
        const message = data?.response?.data?.message;
        setErrorMessageText(errorMessages || message);
      },
    });
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <h2 style={{ fontSize: "30px", margin: "0" }}>Welcome to </h2>
      <p>Register your Account</p>
      <Form name="register" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Please input username!" },
            {
              min: 3,
              message: "Username must be minimum 3 characters.",
            },
          ]}
          validateTrigger="onSubmit"
        >
          <Input
            id="username"
            name="username"
            type="text"
            size="large"
            placeholder="Username"
            suffix={<UserOutlined />}
            autoComplete="false"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              message: "Provide office email.",
              // validator: officeEmailValidation
            },
          ]}
          validateTrigger="onSubmit"
        >
          <Input
            type="email"
            size="large"
            placeholder="Email"
            suffix={<MailOutlined />}
            autoComplete="false"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            size="large"
            placeholder="Password"
            autoComplete="false"
            type="password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
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
            size="large"
            placeholder="Confirm Password"
            autoComplete="false"
            type="password"
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
            htmlType="submit"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      <TextBlock>
        <span>
          Already have an Account?&nbsp;&nbsp;
          <CustomLink text="Login" url={urls.login} />
        </span>
      </TextBlock>
    </>
  );
};

Register.getLayout = function (page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Register;
