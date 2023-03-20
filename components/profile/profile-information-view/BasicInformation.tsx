import { Colors } from 'utils/colors';
import { EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import {
  DetailWrapper,
  DetailTitleWrapper,
  DetailItem,
  DetailLabel,
  DetailTitle,
  DetailValue
} from 'styles/profileInformation';
import { useState } from 'react';
import { BasicInformationEdit } from '../profile-information-edit/BasicInformationEdit';
import { isAdmin } from 'utils/roles';
import { EmployeeDetails } from 'constants/schemas/employee';

interface Props {
  data: EmployeeDetails;
}
export const BasicInformation = (props: Props) => {
  const { data } = props;
  const [editBasicInformationModalOpen, setEditBasicInformationModalOpen] =
    useState(false);

  const openCloseModal = () => {
    setEditBasicInformationModalOpen(!editBasicInformationModalOpen);
  };

  const empData = data;
  return (
    <>
      <DetailWrapper>
        <DetailTitleWrapper>
          <DetailTitle>Basic Information</DetailTitle>
          <EditOutlined
            style={{ color: Colors.BORDER_COLOR }}
            onClick={openCloseModal}
          />
        </DetailTitleWrapper>
        <DetailItem>
          <DetailLabel xs={8}>Name:</DetailLabel>
          <DetailValue xs={16}>{empData?.name}</DetailValue>
          <DetailLabel xs={8}>Username:</DetailLabel>
          <DetailValue xs={16}>{empData?.user?.username}</DetailValue>
          <DetailLabel xs={8}>Date of Hiring:</DetailLabel>
          <DetailValue xs={16}>
            {empData?.joined_date
              ? dayjs(empData?.joined_date).format('D MMM, YYYY')
              : ''}
          </DetailValue>
          <DetailLabel xs={8}>Designation:</DetailLabel>
          <DetailValue xs={16}>{empData?.designation?.name}</DetailValue>
          <DetailLabel xs={8}>Email:</DetailLabel>
          <DetailValue xs={16} style={{ color: Colors.PRIMARY }}>
            {empData?.user?.email}
          </DetailValue>
          <DetailLabel xs={8}>Gender:</DetailLabel>
          <DetailValue xs={16}>{empData?.gender}</DetailValue>
          <DetailLabel xs={8}>Nationality:</DetailLabel>
          <DetailValue xs={16}>{empData?.nationality?.nationality}</DetailValue>
          <DetailLabel xs={8}>Phone:</DetailLabel>
          <DetailValue xs={16}>{empData?.phone_number}</DetailValue>
          <DetailLabel xs={8}>Address:</DetailLabel>
          <DetailValue xs={16}>{empData?.address}</DetailValue>
        </DetailItem>
        <BasicInformationEdit
          handleCancel={openCloseModal}
          isModalOpen={editBasicInformationModalOpen}
          id={isAdmin() ? empData?.id : null}
          data={empData}
        />
      </DetailWrapper>
    </>
  );
};
