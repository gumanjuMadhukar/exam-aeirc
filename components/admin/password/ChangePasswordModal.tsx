import { Button, Col, Form, Input, message, Modal, Row, Spin } from "antd";
import { useMutation } from "react-query";
import { Colors } from "utils/colors";
import styled from "styled-components";
import UserAPI from "apis/user";
import { useRouter } from "next/router";

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
}

export const ChangePasswordModal = (props: Props) => {
  const { isModalOpen, handleCancel } = props;
  const userAPI = new UserAPI();
  const router = useRouter();
  const changePasswordMutation = useMutation((data: any) =>
    userAPI.changePassword(data)
  );

  const { mutate: createUser, isLoading } = changePasswordMutation;
  const onFinish = async (data: any) => {
    try {
      createUser(data, {
        onSuccess: (res: any) => {
          handleCancel();
          message.success(res?.data?.message);
          router.push("auth/login");
        },
        onError: (data: any) => {
          const errorMessage = data?.response?.data?.message;
          message.error(errorMessage);
        },
      });
    } catch (error) {
      // Handle any other errors that may occur
      console.error("Error creating user:", error);
    }
  };
  return (
    <Modal
      title="Change Password"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={"50vw"}
      className="modal-content-responsive"
    >
      <Spin spinning={isLoading}>
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Row style={{ justifyContent: "space-between" }}>
            <Col lg={11} xs={24} md={11}>
              <Form.Item
                label="Old Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your old password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>

            <Col lg={11} xs={24} md={11}>
              <Form.Item
                label="New Password"
                name="new_password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your new password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <CustomizedButtonGroup>
                <Button size="large" onClick={handleCancel}>
                  Cancel
                </Button>

                <Button
                  style={{
                    backgroundColor: Colors.PRIMARY,
                    color: "#fff",
                    marginLeft: "10px",
                  }}
                  size="large"
                  htmlType="submit"
                >
                  Save
                </Button>
              </CustomizedButtonGroup>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};

const CustomizedButtonGroup = styled.div`
  float: right;
  margin-top: 10px;
  right: 0;
`;
