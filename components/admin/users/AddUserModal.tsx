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
} from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Colors } from "utils/colors";
import styled from "styled-components";
import { officeEmailValidation } from "utils";
import DesignationAPI from "apis/designation";
import { isAdmin } from "utils/roles";

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
}

export const AddUserModal = (props: Props) => {
  const { isModalOpen, handleCancel } = props;
  const queryClient = useQueryClient();
  // const designationAPI = new DesignationAPI();

  // const designationListQuery = useQuery("designation-list", () =>
  //   designationAPI.list().then((res: any) => res.data)
  // );
  // const designationList = designationListQuery?.data?.data;

  // const createUserMutation = useMutation((data: any) => createUser(data));

  const onFinish = (data: any) => {
    const newData = {
      ...data,
      joined_date: data?.joined_date?.format("YYYY-MM-DD"),
      name:
        data?.first_name +
        " " +
        (data?.middle_name || "") +
        " " +
        data?.last_name,
      designationId: data?.designation,
    };
    // createUserMutation.mutate(newData, {
    //   onSuccess: () => {
    //     queryClient.invalidateQueries(["employeeList"]);
    //     handleCancel();
    //     message.success("User have been created successfully");
    //   },
    //   onError: (data: any) => {
    //     const errorMessage = data?.response?.data?.message;
    //     message.error(errorMessage);
    //   },
    // });
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
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Row style={{ justifyContent: "space-between" }}>
          <Col lg={8} xs={24} md={8}>
            <Form.Item
              label=" First Name"
              name="first_name"
              rules={[{ required: true, message: "Please enter first name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col lg={7} xs={24} md={7}>
            <Form.Item label="Middle Name" name="middle_name">
              <Input />
            </Form.Item>
          </Col>

          <Col lg={8} xs={24} md={8}>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[{ required: true, message: "Please enter Last name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row style={{ justifyContent: "space-between" }}>
          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Date of Hiring"
              name="joined_date"
              rules={[
                {
                  required: !isAdmin() ? false : true,
                  message: "Please select hiring date!",
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} disabled={!isAdmin()} />
            </Form.Item>
          </Col>
          {/* <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Designation"
              name="designation"
              rules={[
                {
                  required: !isAdmin() ? false : true,
                  message: "Please select designation!",
                },
              ]}
            >
              <Select placeholder="Select Designation" disabled={!isAdmin()}>
                {designationList?.map((designation: any) => (
                  <Select.Option key={designation.id} value={designation.id}>
                    {designation.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col> */}

          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please enter username!" },
                {
                  min: 3,
                  message: "Username must be at least 3 characters long!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  message: "Provide office email.",
                  validator: officeEmailValidation,
                },
              ]}
            >
              <Input disabled={!isAdmin()} />
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
    </Modal>
  );
};

const CustomizedButtonGroup = styled.div`
  float: right;
  margin-top: 10px;
  right: 0;
`;
