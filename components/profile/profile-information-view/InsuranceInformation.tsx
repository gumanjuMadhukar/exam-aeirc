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
import { useEffect, useState } from 'react';
import { InsuranceInformationEdit } from '../profile-information-edit/InsuranceInformationEdit';
import { EmployeeFullDetails } from 'constants/schemas/employee';
import { isAdmin } from 'utils/roles';

interface Props {
  data: EmployeeFullDetails;
}

export const InsuranceInformation = (props: Props) => {
  const { data } = props;
  const [editable, setEditable] = useState(false);

  const [
    editInsuranceInformationModalOpen,
    setEditInsuranceInformationModalOpen
  ] = useState(false);

  const openCloseModal = () => {
    setEditInsuranceInformationModalOpen(!editInsuranceInformationModalOpen);
  };
  useEffect(() => {
    setEditable(isAdmin());
  }, []);
  const empData = data?.salary;
  return (
    <>
      <DetailWrapper>
        <DetailTitleWrapper>
          <DetailTitle>Insurance and Security</DetailTitle>
          {editable && (
            <EditOutlined
              style={{ color: Colors.BORDER_COLOR }}
              onClick={openCloseModal}
            />
          )}
        </DetailTitleWrapper>
        <DetailItem>
          <DetailLabel xs={8}></DetailLabel>
          <DetailValue xs={8}>Monthly</DetailValue>
          <DetailValue xs={8}>Annually</DetailValue>
          <DetailLabel xs={8}>Citizen Investment Trust (CIT):</DetailLabel>
          <DetailValue xs={8}>{empData?.cit}</DetailValue>
          <DetailValue xs={8}>{empData?.cit_annual}</DetailValue>
          {empData?.insurance?.map((data: InsuranceData) => (
            <DetailItem key={data?.name}>
              <DetailLabel xs={8}>{data.name} insurance:</DetailLabel>
              <DetailValue xs={8}> - </DetailValue>
              <DetailValue xs={8}>{data.annual_total}</DetailValue>
            </DetailItem>
          ))}
        </DetailItem>
      </DetailWrapper>
      <InsuranceInformationEdit
        isModalOpen={editInsuranceInformationModalOpen}
        id={data?.employee?.id}
        handleCancel={openCloseModal}
        data={empData}
      />
    </>
  );
};
