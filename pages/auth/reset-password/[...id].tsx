import { ReactElement, useState } from "react";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input, Button, Alert } from "antd";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { TextBlock } from "../../../styles/authCSS";
import { officeEmailValidation } from "utils";
import AuthLayout from "components/layout/auth-layout";
import Head from "next/head";
import { resetPassword } from "apis/auth";
import CustomLink from "components/CustomLink";
import urls from "configs/urls";
import { Colors } from "utils/colors";

interface Props {}

const ResetPassword: NextPageWithLayout = () => {
  const [errorMessageText, setErrorMessageText] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const resetPasswordMutation = useMutation((data: ResetPasswordPayload) =>
    resetPassword(data)
  );

  const onFinish = (formValues: any) => {
    const userId = Number(id);
    const data = { ...formValues, userId };

    resetPasswordMutation.mutate(data, {
      onSuccess: (data: any) => {
        setErrorMessageText(null);
        router.push(`/auth/login`);
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
        <title>Reset Password</title>
      </Head>
      <h2>Create New Password</h2>
      <Form name="resetPassword" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="newPassword"
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
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
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
            Submit
          </Button>
        </Form.Item>
      </Form>
      <TextBlock>
        <CustomLink
          text="Back to Login"
          url={urls.login}
          customStyle={{ color: "#404040", fontWeight: "400" }}
        />
      </TextBlock>
    </>
  );
};

ResetPassword.getLayout = function (page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default ResetPassword;
