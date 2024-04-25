import styled from "styled-components";
import { Row, Col } from "antd";
import PageFooter from "../layout/page-footer";
import { Colors } from "utils/colors";
import BasicInformation from "./BasicInformation";
import Cookies from "js-cookie";
import StudentAPI from "apis/student";
import { useQuery } from "react-query";

const Student: NextPageWithLayout = () => {
  // const [value, setValue] = useState(1);

  const studentAPI = new StudentAPI();
  const student_id = Cookies.get("student_id");
  const studentQuery = useQuery(["StudentData"], async () => {
    const response = await studentAPI.get(student_id);

    return response?.data?.data;
  });

  const studentData = studentQuery?.data;

  // const saveQuestionsAnswer = useMutation((data: any) =>
  //   studentAPI.update(data, student_id)
  // );

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

  //       // Update the image element source with the captured photo
  //       imageElement.src = imageDataUrl;
  //       imageElement.style.display = "block"; // Show the image element
  //     }
  //   }
  // };

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

  // const handleStopCamera = () => {
  //   const videoElement = videoRef.current;

  //   if (videoElement) {
  //     // Stop the video stream and clear the video source
  //     const mediaStream = videoElement.srcObject as MediaStream;
  //     mediaStream.getTracks().forEach((track) => track.stop());
  //     videoElement.srcObject = null;
  //   }
  // };
  // const student = Cookies.get("user");

  // const empData: any[] = [];
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
  background-color: ${Colors.GREYABALONE};
  height: 100vh;
`;
const ProfileWrapper = styled(Row)`
  padding: 25px;
  margin-right: 20px;
`;
