import { Col, Image, Row, Skeleton } from 'antd';
import PageHeader from 'components/layout/page-header';
import { BasicInformation } from 'components/profile/profile-information-view/BasicInformation';
import { InsuranceInformation } from 'components/profile/profile-information-view/InsuranceInformation';
import LeavesInformation from 'components/profile/profile-information-view/LeavesInformation';
import { PaymentInformation } from 'components/profile/profile-information-view/PaymentInformation';
import { PersonalInformation } from 'components/profile/profile-information-view/PersonalInformation';
import { SalaryInformation } from 'components/profile/profile-information-view/SalaryInformation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { PageHeaderWrapper } from 'styles/authCSS';
import { Colors } from 'utils/colors';
import { imageFullPath } from 'utils/helpers';
import EmployeeAPI from '../../../apis/employee';

const HeaderItems = [
  {
    name: 'Profile',
    link: ''
  }
];

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const employeeAPI = new EmployeeAPI();

  const { data: employeeData, isLoading } = useQuery(
    `employeeBasicInfo-${id}`,
    () =>
      employeeAPI
        .get(id)
        .then(res => res.data.data)
        .catch(err => err),
    {
      enabled: !!id
    }
  );

  if (isLoading) return <Skeleton />;

  const empData = employeeData?.employee;
  const leaveData = employeeData?.leaves;

  return (
    <div>
      <PageHeaderWrapper>
        <PageHeader
          items={HeaderItems}
          titleContent={empData?.name}
          goBack={true}
        />
      </PageHeaderWrapper>
      <ProfileWrapper>
        <LeftProfile lg={5} sm={24}>
          <ImageWrapper>
            <div>
              <ProfileImage>
                <Image
                  className={`profile-img ${
                    !empData?.profile_picture && 'img-padding'
                  }`}
                  alt="avatar"
                  src={imageFullPath(
                    empData?.profile_picture,
                    '/images/default_profile_picture.jpeg'
                  )}
                />
              </ProfileImage>
            </div>
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
            <TaxInfo>You can view details of tax deduction</TaxInfo>
          </TaxDec> */}
        </LeftProfile>
        <Col lg={19} sm={24} className="search-col-margin">
          <BasicInformation data={empData} />
          <PersonalInformation data={empData} />
          <SalaryInformation data={employeeData} />
          <PaymentInformation data={empData} />
          <InsuranceInformation data={employeeData} />
          <LeavesInformation data={leaveData} />
        </Col>
      </ProfileWrapper>
    </div>
  );
};

export default Post;

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
    .profile-img {
      &.img-padding {
        padding: 40px;
      }
      background: ${Colors.LIGHTER_BG};
      border-radius: 50%;
    }
  }
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
