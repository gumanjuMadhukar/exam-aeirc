import { Colors } from "utils/colors";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  DetailWrapper,
  DetailTitleWrapper,
  DetailItem,
  DetailLabel,
  DetailTitle,
  DetailValue,
} from "styles/profileInformation";
import { useEffect, useRef, useState } from "react";
import StudentAPI from "apis/student";
import MediaAPI, { uploadMyDocs } from "apis/media";
import styled from "styled-components";
import { Button, Checkbox, Col, Form, Image, Row } from "antd";

import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "react-query";
import moment from "moment";
import MyComponent from "./component";
import { dataURItoBlob } from "utils/helpers";
import { allocateRandomQuestion } from "apis/question";

interface Props {
  data: any;
}
const BasicInformation = (props: Props) => {
  const { data } = props;
  const router = useRouter();
  const queryClient = useQueryClient();
  const [editBasicInformationModalOpen, setEditBasicInformationModalOpen] =
    useState(false);

  const openCloseModal = () => {
    setEditBasicInformationModalOpen(!editBasicInformationModalOpen);
  };

  const [isChecked, setIsChecked] = useState(false);
  const [form] = Form.useForm();

  const studentAPI = new StudentAPI();
  const mediaAPI = new MediaAPI();
  const student_id = Cookies.get("student_id");

  const updateStudentData = useMutation((data: any) =>
    studentAPI.update(student_id, data)
  );

  const addMediaData = useMutation((data: any) => uploadMyDocs(data));

  const allocateQuestion = useMutation(allocateRandomQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries(["StudentData"]);

      enterFullScreen();
      // router.push("/student/dashboard/quiz/ExamWithPagination");
      router.push("/student/dashboard/quiz");
    },
    onError: (data: any) => {
      const errorMessageWithNetworkIssue = data?.message;
      const errorMessage = data?.response?.data?.message;
    },
  });

  const handleCheckboxChange = (e: any) => {
    setIsChecked(e.target.checked);
  };

  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };

  // enterFullScreen();

  const handleSubmit = (data: any) => {
    // Handle form submission logic here
    // handleCapturePhoto();
    const newData = {
      is_terms_and_condition_accepted: data.checkbox,
      start_time: moment(),
    };

    const allocateData = {
      student_id,
    };

    updateStudentData.mutate(newData, {
      onSuccess: () => {
        allocateQuestion.mutate(allocateData);
      },
      onError: (data: any) => {
        const errorMessageWithNetworkIssue = data?.message;
        const errorMessage = data?.response?.data?.message;
      },
    });
  };

  const validateCheckbox = (rule: any, value: any) => {
    if (!value) {
      return Promise.reject("Checkbox is required");
    }
    return Promise.resolve();
  };
  const empData = data;

  // const videoRef = useRef<HTMLVideoElement>(null);
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const imageRef = useRef<HTMLImageElement>(null);

  // const handleCapturePhoto = () => {
  //   const videoElement = videoRef.current;
  //   const canvasElement = canvasRef.current;
  //   const imageElement = imageRef.current;

  //   if (videoElement && canvasElement && imageElement) {
  //     // Get the video element dimensions
  //     const videoWidth = videoElement.videoWidth;
  //     const videoHeight = videoElement.videoHeight;

  //     // Set the canvas element dimensions to match the video element
  //     canvasElement.width = videoWidth;
  //     canvasElement.height = videoHeight;

  //     // Draw the current video frame onto the canvas
  //     const canvasContext = canvasElement.getContext("2d");
  //     if (canvasContext) {
  //       canvasContext.drawImage(videoElement, 0, 0, videoWidth, videoHeight);
  //       const imageDataUrl = canvasElement.toDataURL("image/jpeg"); // Get the data URL of the captured photo
  //       const formData = new FormData();
  //       formData.append("photo", dataURItoBlob(imageDataUrl));
  //       formData.append("image_type", "SELF");
  //       formData.append("origanization", "NHPC");
  //       formData.append("symbol_number", data.symbol_number);
  //       formData.append("student_id", "2");

  //       addMediaData.mutate(formData, {
  //         onSuccess: () => {},
  //         onError: (data: any) => {
  //           const errorMessageWithNetworkIssue = data?.message;
  //           const errorMessage = data?.response?.data?.message;
  //         },
  //       });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   handleStartCamera();
  // }, []);
  // const handleStartCamera = async () => {
  //   const videoElement = videoRef.current;

  //   if (videoElement) {
  //     try {
  //       // Get user media (camera) and set it as video source
  //       const mediaStream = await navigator.mediaDevices.getUserMedia({
  //         video: true,
  //       });
  //       videoElement.srcObject = mediaStream;
  //     } catch (error) {
  //       console.error("Error accessing camera:", error);
  //     }
  //   }
  // };

  return (
    <>
      <DetailWrapper>
        <DetailTitleWrapper>
          <DetailTitle>Basic Information</DetailTitle>
        </DetailTitleWrapper>
        <Row>
          <LeftProfile lg={8} md={24} sm={24} xs={24}>
            <ImageWrapper>
              <div>
                <ProfileImage>
                  <Image
                    className={`profile-img`}
                    src={`http://103.175.192.52/storage/documents/${empData?.photo}`}
                    alt="avatar"
                  />
                </ProfileImage>
              </div>
            </ImageWrapper>
          </LeftProfile>
          <Col lg={8} md={24} sm={24} xs={24} className="search-col-margin">
            <DetailItem>
              <DetailLabel xs={8}>Name:</DetailLabel>
              <DetailValue xs={16}>{empData?.name}</DetailValue>
              <DetailLabel xs={8}>Email:</DetailLabel>
              <DetailValue xs={16}>{empData?.email}</DetailValue>
              <DetailLabel xs={8}>Symbol Number:</DetailLabel>
              <DetailValue xs={16}>{empData?.symbol_number}</DetailValue>
              <DetailLabel xs={8}>Date Of Birth:</DetailLabel>
              <DetailValue xs={16}>{empData?.date_of_birth}</DetailValue>
              <DetailLabel xs={8}>Subject:</DetailLabel>
              <DetailValue xs={16} style={{ color: Colors.PRIMARY }}>
                {empData?.subject?.name}
              </DetailValue>
            </DetailItem>
          </Col>
          {/* <Col
            lg={8}
            md={24}
            sm={24}
            xs={24}
            style={{ right: "0" }}
            className={`profile-img`}
          >
            <div>
              <video
                ref={videoRef}
                // style={{ display: "none" }}
                style={{ width: "180px" }}
                autoPlay
              />
              <canvas
                ref={canvasRef}
                style={{ display: "none", maxWidth: "30%" }}
              />
              <img
                ref={imageRef}
                style={{ display: "none", maxWidth: "30%" }}
                alt="Captured Photo"
              />
            </div>
          </Col> */}
        </Row>
        <DetailTitleWrapper style={{ marginTop: "20px" }}>
          <DetailTitle>Instructions</DetailTitle>
        </DetailTitleWrapper>

        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="checkbox"
            getValueFromEvent={(e) => e.target.checked}
            rules={[{ validator: validateCheckbox }]}
            required
          >
            <Checkbox>
              I declare all the data displayed here belongs me or if there is
              any mistake on the data that is of my responsibility
            </Checkbox>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              left: "50%",
              right: "50%",
              height: "30px",
            }}
          >
            Take Examination
          </Button>
        </Form>
        {/* <BasicInformationEdit
          handleCancel={openCloseModal}
          isModalOpen={editBasicInformationModalOpen}
          id={isAdmin() ? empData?.id : null}
          data={empData}
        /> */}
      </DetailWrapper>
    </>
  );
};

const LeftProfile = styled(Col)`
  background-color: #fff;
  // height: 300px;
`;

const ProfileImage = styled.div`
  width: 200px;
  text-align: center;
  border: 2px solid #000;
  .ant-image {
    width: 100%;
    padding: 10px;
    .profile-img {
      &.img-padding {
        padding: 40px;
      }
      background: ${Colors.LIGHTER_BG};
      // border-radius: 50%;
    }
  }
`;

const ProfileButton = styled.div`
  text-align: center;
  margin-top: 15px;
  cursor: pointer;
`;

const ProfileText = styled.span`
  border: 1px dotted ${Colors.BORDER_COLOR};
  color: ${Colors.BORDER_COLOR};
  font-size: 14px;
  padding: 0 5px;
`;

const ImageWrapper = styled.div`
  display: flex;
  // align-items: center;
  // justify-content: center;
  height: 100%;
`;

export default BasicInformation;
