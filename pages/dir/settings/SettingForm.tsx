import styled from "styled-components";
import {
  Button,
  Input,
  Row,
  Col,
  message,
  Form,
  Card,
  Switch,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import SettingAPI from "apis/setting";
import { useMutation, useQueryClient } from "react-query";
import { Colors } from "utils/colors";

interface Props {
  data: any;
  isLoading: boolean;
}

const SettingForm = (props: Props) => {
  const { data, isLoading } = props;

  const [isNegativeMarking, setIsNegativeMarking] = useState<boolean>(false);
  const [isOptionRightMarking, setOptionRightMarking] =
    useState<boolean>(false);

  const [active, setActive] = useState<boolean>(false);

  const settingAPI = new SettingAPI();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      setActive(data?.active);
    }
  }, [data]);

  const storeSetting = useMutation((data: any) => settingAPI.store(data));

  const onChange = (checked: boolean) => {
    // console.log(`switch to ${checked}`);
    setIsNegativeMarking(checked);
  };

  const onChangeOptionRight = (checked: boolean) => {
    // console.log(`switch to ${checked}`);
    setOptionRightMarking(checked);
  };
  const onFinish = (data: any) => {
    const newData = {
      ...data,
      is_negative_marking: isNegativeMarking,
      an_option_right_marking: isOptionRightMarking,
    };
    storeSetting.mutate(newData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["SettingData"]);
        message.success("Setting has been added successfully");
      },
      onError: (_data: any) => {
        // const errorMessageWithNetworkIssue = data?.message;
        // const errorMessage = data?.response?.data?.message;
      },
    });
  };
  return (
    <Card style={{ margin: "20px" }}>
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
                label="Total Question Per Student"
                name="number_of_question_per_student"
                initialValue={data?.number_of_question_per_student}
                rules={[
                  {
                    required: true,
                    message:
                      "Please enter total number of question for a student!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col lg={11} xs={24} md={11}>
              <Form.Item
                label="Exam Time"
                name="exam_time"
                initialValue={data ? data?.exam_time : ""}
                rules={[
                  {
                    required: true,
                    message: "Please enter exam time! ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col lg={11} xs={24} md={11}>
              <Form.Item
                label="Marks Holding per question"
                name="marks_per_question"
                initialValue={data?.marks_per_question}
                rules={[
                  {
                    required: true,
                    message: "Please enter marks for per question!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col lg={11} xs={24} md={11}>
              <Form.Item
                label="Passing Mark"
                name="passing_mark"
                initialValue={data?.passing_mark}
                rules={[
                  {
                    required: true,
                    message: "Please enter passing marks!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={11} xs={24} md={11}>
              <Form.Item
                label="Is Negative Marking"
                name="is_negative_marking"
                initialValue={data?.is_negative_marking}
              >
                <Switch onChange={onChange} />
              </Form.Item>
            </Col>

            {isNegativeMarking && (
              <Col lg={11} xs={24} md={11}>
                <Form.Item
                  label="Marks deduct per wrong answerx"
                  name="negative_marking_per_question"
                  initialValue={data?.negative_marking_per_question}
                  rules={[
                    {
                      required: isNegativeMarking ? true : false,
                      message: "Please enter is negative marking!",
                    },
                  ]}
                >
                  <Input disabled={active} />
                </Form.Item>
              </Col>
            )}

            <Col lg={11} xs={24} md={11}>
              <Form.Item
                label="If an option is right then allocate marks"
                name="an_option_right_marking"
                initialValue={data?.an_option_right_marking}
              >
                <Switch onChange={onChangeOptionRight} disabled={active} />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <CustomizedButtonGroup>
                <Button
                  style={{
                    backgroundColor: Colors.PRIMARY,
                    color: "#fff",
                    marginLeft: "10px",
                  }}
                  size="large"
                  htmlType="submit"
                  disabled={active}
                >
                  {active ? "Update" : "Save"}
                </Button>
              </CustomizedButtonGroup>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Card>
  );
};

export default SettingForm;

const CustomizedButtonGroup = styled.div`
  float: right;
  margin-top: 10px;
  right: 0;
`;
