import { Colors } from 'utils/colors';
import { EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import {
  DetailItem,
  DetailLabel,
  DetailTitle,
  DetailTitleWrapper,
  DetailValue,
  DetailWrapper
} from 'styles/profileInformation';
import { useState } from 'react';
import { PersonalInformationEdit } from '../profile-information-edit/PersonalInformationEdit';
import { isAdmin } from 'utils/roles';
import { EmployeeDetails } from 'constants/schemas/employee';
import { Skeleton } from 'antd';
interface Props {
  data: EmployeeDetails;
}
export const PersonalInformation = (props: Props) => {
  const { data } = props;

  const [
    editPersonalInformationModalOpen,
    setEditPersonalInformationModalOpen
  ] = useState(false);

  const openCloseModal = () => {
    setEditPersonalInformationModalOpen(!editPersonalInformationModalOpen);
  };
  const empData = data;

  return (
    <>
      <DetailWrapper>
        <DetailTitleWrapper>
          <DetailTitle>Personal Information</DetailTitle>
          <EditOutlined
            style={{ color: Colors.BORDER_COLOR }}
            onClick={openCloseModal}
          />
        </DetailTitleWrapper>
        {empData ? (
          <DetailItem>
            <DetailLabel xs={8}>Citizenship No:</DetailLabel>
            <DetailValue xs={16}>{empData?.citizenship_number}</DetailValue>
            <DetailLabel xs={8}>CIT No:</DetailLabel>
            <DetailValue xs={16}>{empData?.cit_number}</DetailValue>
            <DetailLabel xs={8}>Date of Birth:</DetailLabel>
            <DetailValue xs={16}>
              {empData?.dob ? dayjs(empData?.dob).format('D MMM, YYYY') : ''}
            </DetailValue>
            <DetailLabel xs={8}>Father&apos;s Name:</DetailLabel>
            <DetailValue xs={16}>{empData?.fathers_name}</DetailValue>
            <DetailLabel xs={8}>Mother&apos;s Name:</DetailLabel>
            <DetailValue xs={16}>{empData?.mothers_name}</DetailValue>
            <DetailLabel xs={8}>Marital Status:</DetailLabel>
            <DetailValue xs={16}>
              {empData?.marital_status ? 'Married' : 'Single'}
            </DetailValue>
            <DetailLabel xs={8}>Permanent Address:</DetailLabel>
            <DetailValue xs={16}>{empData?.permanent_address}</DetailValue>
            <DetailLabel xs={8}>Emergency Contact:</DetailLabel>
            <DetailValue xs={16}>{empData?.emergency_contact}</DetailValue>
          </DetailItem>
        ) : (
          <Skeleton />
        )}
      </DetailWrapper>
      <PersonalInformationEdit
        isModalOpen={editPersonalInformationModalOpen}
        id={isAdmin() ? empData?.id : null}
        handleCancel={openCloseModal}
        data={empData}
      />
    </>
  );
};
