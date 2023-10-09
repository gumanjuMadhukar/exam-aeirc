import { Button, Col, Form, message, Modal, Row } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { Colors } from "utils/colors";
import styled from "styled-components";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";
import { uploadCourseContentQuestions } from "apis/question";
import { useRouter } from "next/router";
interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
}
export const acceptedDocType = ".xlsx, .xml";
const { Dragger } = Upload;

export const ImportQuestionCourseContentWise = (props: Props) => {
  const { isModalOpen, handleCancel } = props;
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const router = useRouter();
  const { contentDetailsId } = router.query;

  const [toBeUploadedDocs, setToBeUploadedDocs] = useState<
    (RcFile | undefined)[]
  >([]);

  const saveQuestionCourseContentWise = useMutation(
    uploadCourseContentQuestions,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["CompanyData"]);
        message.success("Questions has been Uploaded Successfully");
      },
      onError: (data: any) => {
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage);
      },
    }
  );

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
      course_content_id: contentDetailsId,
    };

    saveQuestionCourseContentWise.mutate(bodyData);
  };
  return (
    <Modal
      title="Add Question"
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
