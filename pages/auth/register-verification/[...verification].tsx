import { Form, Input, Button, Alert, Modal } from "antd";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { otpVerify, resendOtpVerify } from "apis/auth";
import AuthLayout from "components/layout/auth-layout";
import Head from "next/head";
import { Colors } from "utils/colors";
import styled from "styled-components";

const Verification: NextPageWithLayout = () => {
  const [errorMessageText, setErrorMessageText] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [expired, setExpired] = useState(true);
  const otpVerificationMutation = useMutation((data: any) => otpVerify(data));
  const resendOtpVerificationMutation = useMutation((data: any) =>
    resendOtpVerify(data)
  );
  const router = useRouter();
  const { verification } = router.query;

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (seconds <= 0) {
      setExpired(true);
      return;
    }
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const onFinish = (otpCode: any) => {
    const userId = Number(verification);
    const { otp: otpString } = otpCode;
    const otp = Number(otpString);

    const data = { otp, userId };
    otpVerificationMutation.mutate(data, {
      onSuccess: (_data: any) => {
        setErrorMessageText(null);
        setIsModalOpen(true);
      },
      onError: (data: any) => {
        const errors = data?.response?.data?.errors;
        const errorMessages = errors?.map((item: any) => item.errors.matches);
        const message = data?.response?.data?.message;
        setErrorMessageText(errorMessages || message);
      },
    });
  };

  const handleResendOtp = () => {
    const userId = Number(verification);
    resendOtpVerificationMutation.mutate(userId, {
      onSuccess: (_data: any) => {
        setExpired(false);
        setSeconds(180);
      },
    });
  };

  const validateOtpLength = (_rule: any, value: any) => {
    if (value.length !== 4) {
      return Promise.reject("The input value must be exactly 4 characters");
    }
    return Promise.resolve();
  };
  return (
    <>
      <Head>
        <title>OTP Verification</title>
      </Head>
      <h2 style={{ fontSize: "30px", margin: "0" }}>Verification Code</h2>
      <p>Please enter the verification code</p>
      <Form onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="otp"
          rules={[
            {
              required: true,
              message: "Please input OTP sent in your email!",
            },
            {
              message: "OTP must be 4 characters.",
              validator: validateOtpLength,
            },
          ]}
          validateTrigger="onSubmit"
        >
          <Input
            type="text"
            size="large"
            placeholder="Enter OTP"
            autoComplete="false"
          />
        </Form.Item>
        {!expired && (
          <p style={{ color: "#1890FF" }}>
            {minutes < 10 ? "0" + minutes : minutes}:
            {remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}
          </p>
        )}
        {errorMessageText && (
          <div>
            <Alert type="error" message={errorMessageText} banner />
            <br />
          </div>
        )}
        <span>
          Didn&apos;t receive the OTP?&nbsp;
          <a
            style={{
              color: !expired ? Colors.DISABLED : Colors.PRIMARY,
              pointerEvents: !expired ? "none" : "auto",
              cursor: !expired ? "not-allowed" : "pointer",
            }}
            onClick={handleResendOtp}
          >
            Resend OTP
          </a>
        </span>
        <br />
        <br />
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
            Verify Now
          </Button>
        </Form.Item>
      </Form>
      <Modal footer={false} closable={false} open={isModalOpen} centered={true}>
        <SuccessWrapper>
          <img src="/checkmark.svg" className="sidebar-logo" alt="logo.png" />
          <ResgistrationSuccess>
            Registration completed successfully
          </ResgistrationSuccess>
          <ResgistrationSuccessFooter>
            Congratulations, your account has been successfully created.{" "}
          </ResgistrationSuccessFooter>
          <Button
            style={{
              marginTop: 32,
              backgroundColor: Colors.PRIMARY,
              color: Colors.WHITE,
            }}
            size="large"
            onClick={() => router.push(`/auth/login`)}
          >
            Back to Login
          </Button>
        </SuccessWrapper>
      </Modal>
    </>
  );
};
Verification.getLayout = function (page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Verification;

const SuccessWrapper = styled.div`
  text-align: center;
  padding: 30px 0px 20px 0px;
  img {
    margin-bottom: 15px;
  }
`;

const ResgistrationSuccess = styled.div`
  font-size: 24px;
`;

const ResgistrationSuccessFooter = styled.div``;
