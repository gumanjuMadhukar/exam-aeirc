import {
  AuthBlock,
  LoginContainer,
  LoginImageBlock,
  LoginPage,
  PageLogo,
  VerticalDividerLine
} from 'styles/authCSS';

type AuthLayoutProps = React.PropsWithChildren<{}>;

const AuthLayout: React.FC<AuthLayoutProps> = props => {
  const { children } = props;
  return (
    <>
      <LoginPage>
        <PageLogo>
        <img
          src="/nextly-logo.svg"
          alt="logo"
          width="168px"
        />
        </PageLogo>
        <LoginContainer>
          <LoginImageBlock>
            <img src="/password-login.svg" alt="login-image" />
          </LoginImageBlock>
          <VerticalDividerLine />
          <AuthBlock>{children}</AuthBlock>
        </LoginContainer>
      </LoginPage>
    </>
  );
};

export default AuthLayout;
