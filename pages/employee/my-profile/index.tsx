import { Col, Row, Image, Skeleton } from 'antd';
import PageHeader from 'components/layout/page-header';
import styled from 'styled-components';
import { PageHeaderWrapper } from 'styles/authCSS';
import { Colors } from 'utils/colors';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import { BasicInformation } from 'components/profile/profile-information-view/BasicInformation';
import { getEmployeeDetails } from 'apis/employee';
import { useState } from 'react';
import { ProfilePictureUploadModal } from 'components/profile/ProfilePictureUploadModel';
import { PersonalInformation } from 'components/profile/profile-information-view/PersonalInformation';
import { InsuranceInformation } from 'components/profile/profile-information-view/InsuranceInformation';
import LeavesInformation from 'components/profile/profile-information-view/LeavesInformation';
import { PaymentInformation } from 'components/profile/profile-information-view/PaymentInformation';
import { SalaryInformation } from 'components/profile/profile-information-view/SalaryInformation';
import { imageFullPath } from 'utils/helpers';

const HeaderItems = [
  {
    name: 'Profile',
    link: ''
  }
];

const MyProfile = () => {
  const [isProfilePictureUploadModalOpen, setIsProfilePictureUploadModalOpen] =
    useState(false);

  const { data: employeeData, isLoading }: any = useQuery(
    'employeeBasicInfo',
    getEmployeeDetails
  );
  const empData = employeeData?.data?.data;

  const openCloseProfilePictureUploadModal = () => {
    setIsProfilePictureUploadModalOpen(!isProfilePictureUploadModalOpen);
  };

  return (
    <div>
      <PageHeaderWrapper>
        <PageHeader
          items={HeaderItems}
          titleContent={empData?.employee?.name}
        />
      </PageHeaderWrapper>
      <ProfileWrapper>
        <LeftProfile lg={8} md={24} sm={24} xs={24}>
          <ImageWrapper>
            {isLoading ? (
              <Skeleton.Avatar active={true} size="large" shape={'circle'} />
            ) : (
              <div>
                <ProfileImage>
                  <Image
                    className={`profile-img ${
                      !empData?.employee?.profile_picture && 'img-padding'
                    }`}
                    src={imageFullPath(
                      empData?.employee?.profile_picture,
                      '/images/default_profile_picture.jpeg'
                    )}
                    alt="avatar"
                  />
                </ProfileImage>
                <ProfileButton onClick={openCloseProfilePictureUploadModal}>
                  <ProfileText>
                    {empData?.employee?.profile_picture ? 'Edit' : 'Upload'}{' '}
                    Photo
                  </ProfileText>
                </ProfileButton>
              </div>
            )}
          </ImageWrapper>
          {/* <TaxDec>
            <TaxRightIcon>
              <EyeOutlined style={{ color: Colors.LIGHT_TEXT_COLOR }} />
            </TaxRightIcon>
            <TaxTitle>Tax Deductions</TaxTitle>
            <TaxInfo>You can view details of tax deduction</TaxInfo>
          </TaxDec>
          <TaxDec>
            <TaxRightIcon>
              <PlusOutlined style={{ color: Colors.LIGHT_TEXT_COLOR }} />
            </TaxRightIcon>
            <TaxTitle>Add Documents</TaxTitle>
            <TaxInfo>You can add your documents here</TaxInfo>
          </TaxDec> */}
        </LeftProfile>
        <Col lg={16} md={24} sm={24} xs={24} className="search-col-margin">
          <BasicInformation data={empData?.employee} />
          <PersonalInformation data={empData?.employee} />
          <SalaryInformation data={empData} />
          <PaymentInformation data={empData?.employee} />
          <InsuranceInformation data={empData} />
          {/* <LeavesInformation data={empData} /> */}
        </Col>
      </ProfileWrapper>

      <ProfilePictureUploadModal
        isModalOpen={isProfilePictureUploadModalOpen}
        handleCancel={openCloseProfilePictureUploadModal}
        closeModal={!!isProfilePictureUploadModalOpen}
      />
    </div>
  );
};

export default MyProfile;

const ProfileWrapper = styled(Row)`
  padding: 25px;
`;

const LeftProfile = styled(Col)`
  background-color: #fff;
  height: 300px;
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
