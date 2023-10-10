import React, { useRef, useEffect } from "react";

type Props = {};

const MyComponent: React.FC<Props> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
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

  useEffect(() => {
    handleStartCamera();
  }, []);
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

  // const _handleStopCamera = () => {
  //   const videoElement = videoRef.current;

  //   if (videoElement) {
  //     // Stop the video stream and clear the video source
  //     const mediaStream = videoElement.srcObject as MediaStream;
  //     mediaStream.getTracks().forEach((track) => track.stop());
  //     videoElement.srcObject = null;
  //   }
  // };

  return (
    <div>
      <video
        ref={videoRef}
        // style={{ display: "none" }}
        style={{ width: "180px" }}
        autoPlay
      />
      <canvas ref={canvasRef} />
      <img
        ref={imageRef}
        style={{ display: "none", maxWidth: "30%" }}
        alt="Captured Photo"
      />
      {/* <button onClick={handleStartCamera}>Start Camera</button> */}
      {/* <button onClick={handleStopCamera}>Stop Camera</button>
      <button onClick={handleCapturePhoto}>Capture Photo</button> */}
    </div>
  );
};

export default MyComponent;
