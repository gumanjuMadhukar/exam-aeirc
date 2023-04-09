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
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";
import { uploadMyDocs } from "apis/program";
import { uploadQuestions } from "apis/question";
import { useRouter } from "next/router";
interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
}
export const acceptedDocType = ".xlsx, .xml";
const { Dragger } = Upload;

export const ImportQuestionModal = (props: Props) => {
  const { isModalOpen, handleCancel } = props;
  const queryClient = useQueryClient();
  const router = useRouter();
  const { programId } = router.query;
  const [toBeUploadedDocs, setToBeUploadedDocs] = useState<
    (RcFile | undefined)[]
  >([]);

  const saveMutation = useMutation((data: any) => uploadQuestions(data));

  const [form] = Form.useForm();

  const uploadProps = () =>
    ({
      name: "file",
      multiple: true,
      action: "/api/noop",
      accept: acceptedDocType,
      onRemove: (file) => {
        setToBeUploadedDocs(
          toBeUploadedDocs.filter((item: any) => item?.uid !== file?.uid)
        );
      },
      onChange(info) {
        if (!info.file.originFileObj) return;
        const { status } = info.file;
        if (status === "done") {
          let file = info.fileList.map((file) => file.originFileObj);
          setToBeUploadedDocs(file);
        }
      },
      onDrop(e) {
        setToBeUploadedDocs(e.dataTransfer.files as any);
      },
    } as UploadProps);

  const onFinish = (data: any) => {
    let bodyData = {
      ...data,
      file: toBeUploadedDocs,
      subject_id: programId,
    };

    saveMutation.mutate(bodyData, {
      onSuccess: () => {
        handleCancel();
        queryClient.invalidateQueries(["QuestionList"]);
        message.success("Question added successfully");
        setToBeUploadedDocs([]);
      },
      onError: (data: any) => {
        const errorMessageWithNetworkIssue = data?.message;
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage || errorMessageWithNetworkIssue);
        setToBeUploadedDocs([]);
      },
    });
  };
  return (
    <Modal
      title="Add Program"
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
            <Dragger {...uploadProps()}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">Supports {acceptedDocType}</p>
            </Dragger>
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
