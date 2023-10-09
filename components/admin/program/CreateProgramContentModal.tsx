import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { Colors } from "utils/colors";
import styled from "styled-components";
import { createProgramContent } from "apis/program";
interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  subject_id?: any;
}

export const CreateProgramContentModal = (props: Props) => {
  const { isModalOpen, handleCancel, subject_id } = props;
  const queryClient = useQueryClient();
  const postProgramContent = useMutation(
    (data: any) => createProgramContent(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["rebateList"]);
        handleCancel();
        form.resetFields();
        message.success("Rebate have been created successfully");
      },
      onError: (data: any) => {
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage);
      },
    }
  );

  const [form] = Form.useForm();

  const onFinish = (data: any) => {
    let bodyData = {
      ...data,
      subject_id,
    };

    postProgramContent.mutate(bodyData);
  };
  return (
    <Modal
      title="Add Course Content"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={"30vw"}
      className="modal-content-responsive"
    >
      <Form
        form={form}
        preserve={false}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row style={{ justifyContent: "space-between" }}>
          <Col lg={24} xs={24} md={24}>
            <Form.Item
              label="Program Content Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter program content name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          {/* <Col lg={24} xs={24} md={24}>
            <Form.Item
              label="Have multiple mark questions? "
              name="question_count"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter number of question to allocate from here!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col> */}
          <Col lg={24} xs={24} md={24}>
            <Form.Item
              label="Number of question to allocate."
              name="question_count"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter number of question to allocate from here!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} style={{ marginTop: "50px" }}>
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
