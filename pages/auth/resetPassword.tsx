import { NextPage } from "next";
import { MailOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import {
  LoginPage,
  PageLogo,
  LoginContainer,
  VerticalDividerLine,
  AuthBlock,
  TextBlock,
  LoginImageBlock,
} from "../../styles/authCSS";
import { Colors } from "utils/colors";

const ResetPassword: NextPage = (_props): JSX.Element => {
  const onSubmit = (e: any) => {
    e.preventDefault();
    // validate your userinfo
  };

  return (
    <LoginPage>
      <PageLogo></PageLogo>
      <LoginContainer>
        <LoginImageBlock>
          {/* <img src="/password-login.svg" alt="login-image" /> */}
        </LoginImageBlock>
        <VerticalDividerLine />
        <AuthBlock>
          <h3>Reset your password</h3>
          <form onSubmit={onSubmit}>
            <Form.Item>
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
          </form>
          <TextBlock>
            <span>
              <a style={{ color: "#aaa" }} href="/login">
                Back to login
              </a>
            </span>
          </TextBlock>
        </AuthBlock>
      </LoginContainer>
    </LoginPage>
  );
};

export default ResetPassword;
