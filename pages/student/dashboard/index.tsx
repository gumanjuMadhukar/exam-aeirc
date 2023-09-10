import styled from "styled-components";
import {
  Row,
  Col,
  Button,
  Radio,
  Space,
  RadioChangeEvent,
  Input,
  Card,
  Skeleton,
} from "antd";
import PageFooter from "../layout/page-footer";
import PageHeader from "../layout/page-header";
import { useRef, useState } from "react";
import { Colors } from "utils/colors";
import BasicInformation from "./BasicInformation";
import Cookies from "js-cookie";
import StudentAPI from "apis/student";
import { useMutation, useQuery } from "react-query";

const Student: NextPageWithLayout = () => {
  const [value, setValue] = useState(1);

  const studentAPI = new StudentAPI();
  const student_id = Cookies.get("student_id");
  const studentQuery = useQuery(["StudentData"], async () => {
    const response = await studentAPI.get(student_id);

    return response?.data?.data;
  });

  const studentData = studentQuery?.data;

  const saveQuestionsAnswer = useMutation((data: any) =>
    studentAPI.update(data, student_id)
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const handleCapturePhoto = () => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const imageElement = imageRef.current;

    if (videoElement && canvasElement && imageElement) {
      // Get the video element dimensions
      const videoWidth = videoElement.videoWidth;
      const videoHeight = videoElement.videoHeight;

      // Set the canvas element dimensions to match the video element
      canvasElement.width = videoWidth;
      canvasElement.height = videoHeight;

      // Draw the current video frame onto the canvas
      const canvasContext = canvasElement.getContext("2d");
      if (canvasContext) {
        canvasContext.drawImage(videoElement, 0, 0, videoWidth, videoHeight);
        const imageDataUrl = canvasElement.toDataURL("image/jpeg"); // Get the data URL of the captured photo

        // Update the image element source with the captured photo
        imageElement.src = imageDataUrl;
        imageElement.style.display = "block"; // Show the image element
      }
    }
  };

  const handleStartCamera = async () => {
    const videoElement = videoRef.current;

    if (videoElement) {
      try {
        // Get user media (camera) and set it as video source
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoElement.srcObject = mediaStream;
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }
  };

  const handleStopCamera = () => {
    const videoElement = videoRef.current;

    if (videoElement) {
      // Stop the video stream and clear the video source
      const mediaStream = videoElement.srcObject as MediaStream;
      mediaStream.getTracks().forEach((track) => track.stop());
      videoElement.srcObject = null;
    }
  };
  const student = Cookies.get("user");

  const empData: any[] = [];
  return (
    <>
      <DashboardContainer>
        <ProfileWrapper>
          <Col lg={24} md={24} sm={24} xs={24} className="search-col-margin">
            <BasicInformation data={studentData} />
          </Col>
        </ProfileWrapper>

        <PageFooter />
      </DashboardContainer>
    </>
  );
};

export default Student;

const DashboardContainer = styled.div`
  background-color: #f0f2f5;
`;
const ProfileWrapper = styled(Row)`
  padding: 25px;
  margin-right: 20px;
`;

const LeftProfile = styled(Col)`
  background-color: #fff;
  height: 100px;
  margin-left: 20px;
`;

const ProfileImage = styled.div`
  width: 200px;
  text-align: center;
  .ant-image {
    width: 100%;
    padding: 10px;
    .profile-img {
      &.img-padding {
        padding: 40px;
      }
      background: ${Colors.LIGHTER_BG};
      border-radius: 50%;
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
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const TaxDec = styled.div`
  background: #fff;
  margin-top: 25px;
  padding: 25px;
  position: relative;
  text-align: center;
`;

const TaxTitle = styled.div`
  color: ${Colors.TEXT_COLOR};
  font-weight: 700;
  font-size: 15px;
`;

const TaxInfo = styled.div`
  font-size: 12px;
  color: ${Colors.LIGHT_TEXT_COLOR};
  margin-top: 10px;
`;

const TaxRightIcon = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  background: ${Colors.LIGHT_BG};
  padding: 5px 10px;
  cursor: pointer;
`;
