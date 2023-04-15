import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Spin,
} from "antd";
import { useMutation, useQueryClient } from "react-query";
import { Colors } from "utils/colors";
import styled from "styled-components";
import UserAPI from "apis/user";

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
}

export const AddUserModal = (props: Props) => {
  const { isModalOpen, handleCancel } = props;
  const queryClient = useQueryClient();
  const userAPI = new UserAPI();

  const createUserMutation = useMutation((data: any) => userAPI.store(data));

  const { mutate: createUser, isLoading } = createUserMutation;
  const onFinish = async (data: any) => {
    try {
      createUser(data, {
        onSuccess: () => {
          queryClient.invalidateQueries(["employeeList"]);
          handleCancel();
          message.success("User have been created successfully");
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
      title="Add User"
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
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col lg={11} xs={24} md={11}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter email!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={11} xs={24} md={11}>
              <Form.Item
                label="Phone Number"
                name="phone_number"
                rules={[
                  { required: true, message: "Please enter phone number!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={11} xs={24} md={11}>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please enter role!" }]}
              >
                <Select>
                  <option value="admin"> Admin</option>
                  <option value="administrator"> Administrator</option>
                </Select>
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
