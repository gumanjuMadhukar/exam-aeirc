import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  TimePicker,
} from "antd";
import { useMutation, useQueryClient } from "react-query";
import { Colors } from "utils/colors";
import styled from "styled-components";
import dayjs from "dayjs";
import { postShift } from "apis/shift";
interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
}

export const CreateShiftModal = (props: Props) => {
  const { isModalOpen, handleCancel } = props;
  const queryClient = useQueryClient();

  const postShiftContent = useMutation((data: any) => postShift(data), {
    onSuccess: () => {
      // queryClient.invalidateQueries(["rebateList"]);
      queryClient.invalidateQueries(["ShiftDetail"]);
      handleCancel();
      form.resetFields();
      message.success("ShiftList have been created successfully");
    },
    onError: (data: any) => {
      const errorMessage = data?.response?.data?.message;
      message.error(errorMessage);
    },
  });

  const [form] = Form.useForm();

  const onFinish = (data: any) => {
    let bodyData = {
      ...data,
      total_students: parseInt(data.total_students, 10),
      tolerance_time: parseInt(data.tolerance_time, 10),
      date: dayjs(data.date).format("YYYY-MM-DD"),
      start_time: dayjs(data.start_datetime).format("HH:MM:ss"),
      end_time: dayjs(data.end_datetime).format("HH:MM:ss"),
    };

    postShiftContent.mutate(bodyData);
  };
  return (
    <Modal
      title="Add New Shift"
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
              label="Shift Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter shift name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={24} xs={24} md={24}>
            <Form.Item
              label="Total Student Capacity"
              name="total_students"
              rules={[
                {
                  required: true,
                  message: "Please enter total number of student to allocate!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={24} xs={24} md={24}>
            <Form.Item
              label="Tolerance Time (in minutes)"
              name="tolerance_time"
              rules={[       
                {
                  required: true,
                  message: "Please enter tolerance time in minutes!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={24} xs={24} md={24}>
            <Form.Item
              label="Date"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Please enter tolerance time in minutes!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Col>

          <Col lg={12} xs={12} md={12}>
            <Form.Item
              label="Start Time."
              name="start_datetime"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter number of question to allocate from here!",
                },
              ]}
            >
              <TimePicker
                defaultValue={dayjs("12:08:23", "HH:mm:ss")}
                size="large"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={12} md={12}>
            <Form.Item
              label="End Time"
              name="end_datetime"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter number of question to allocate from here!",
                },
              ]}
            >
              <TimePicker
                defaultValue={dayjs("12:08:23", "HH:mm:ss")}
                size="large"
              />
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
