/* eslint-disable @next/next/no-img-element */
import { Button, Form, Input, message, Modal, Upload } from 'antd';
import { Colors } from 'utils/colors';
import { UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { uploadEmployeeProfilePicture } from 'apis/employee';
import { useQueryClient } from 'react-query';
import ImgCrop from 'antd-img-crop';
import styled from 'styled-components';

interface Props {
  isModalOpen?: boolean;
  handleCancel?: () => void;
  closeModal?: boolean;
}

export const ProfilePictureUploadModal = ({
  isModalOpen,
  handleCancel,
  closeModal
}: Props) => {
  const { confirm } = Modal;
  const [imageData, setImageData] = useState<string>();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [image, setImage] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  function handleChange(info: any) {
    if (info.file.status === 'done') {
      setImageData(URL.createObjectURL(info.file.originFileObj));
      setImage(info.file.originFileObj);
      setPreviewVisible(true);
    }
  }

  function handleCancelImageUpload() {
    confirm({
      icon: <ExclamationCircleOutlined style={{ color: Colors.DANGER }} />,
      title: 'Discard Change',
      content: 'Are you sure you want to discard your changes?',
      onOk() {
        destroyAllModalData();
      }
    });
  }

  const profileImageUploadedMessage = () => {
    message.info('Image Uploaded Successfully');
    if (window) window.location.reload();
  };

  const uploadImage = async () => {
    setIsLoading(true);
    uploadEmployeeProfilePicture({
      profilePicture: image
    })
      .then((res: any) => {
        profileImageUploadedMessage();
      })
      .catch((err: unknown) => {
        message.error('File too large');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const destroyAllModalData = () => {
    handleCancel;
    closeModal;
    setImage('');
    setImageData('');
    setPreviewVisible(false);
  };

  return (
    <Modal
      title="Upload Profile Picture"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={
        !!previewVisible && [
          <Button key="back" onClick={handleCancelImageUpload}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={uploadImage}
            loading={isLoading}
          >
            Save
          </Button>
        ]
      }
    >
      {!previewVisible ? (
        <ImgCrop
          modalTitle="Adjust photo"
          modalOk="Crop"
          modalClassName="upload-crop"
        >
          <Upload
            onChange={handleChange}
            accept="image/jpg, image/jpeg"
            action={'/api/noop'}
          >
            <StyleButton
              size="large"
              className="button-image-upload"
              // style={{
              //   minWidth: '450px',
              //   borderColor: Colors.PRIMARY,
              //   color: Colors.PRIMARY
              // }}
              icon={<UploadOutlined />}
            >
              Upload
            </StyleButton>
          </Upload>
        </ImgCrop>
      ) : (
        <>
          <center>
            <img src={imageData} style={{ height: '20rem' }} alt="avatar" />
          </center>
        </>
      )}
    </Modal>
  );
};

const StyleButton = styled(Button)`
  min-width: 450px;
  border-color: ${Colors.PRIMARY};
  color: ${Colors.PRIMARY};
  @media (max-width: 530px) {
    min-width: calc(100vw - 25vw);
  }
`;
