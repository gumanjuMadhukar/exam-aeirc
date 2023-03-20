import { Colors } from 'utils/colors';
import { EditOutlined } from '@ant-design/icons';
import {
  DetailItem,
  DetailLabel,
  DetailTitle,
  DetailTitleWrapper,
  DetailValue,
  DetailWrapper
} from 'styles/profileInformation';
import { useEffect, useState } from 'react';
import { SalaryInformationEdit } from '../profile-information-edit/SalaryInformationEdit';
import { isAdmin } from 'utils/roles';

export const SalaryInformation = ({ data }: any) => {
  const [editSalaryInformationModalOpen, setEditSalaryInformationModalOpen] =
    useState(false);
  const [editable, setEditable] = useState(false);

  const openCloseModal = () => {
    setEditSalaryInformationModalOpen(!editSalaryInformationModalOpen);
  };

  useEffect(() => {
    setEditable(isAdmin());
  }, []);

  const salaryData = data?.salary;

  return (
    <>
      <DetailWrapper>
        <DetailTitleWrapper>
          <DetailTitle>Salary</DetailTitle>
          {editable && (
            <EditOutlined
              style={{ color: Colors.BORDER_COLOR }}
              onClick={openCloseModal}
            />
          )}
        </DetailTitleWrapper>
        <DetailItem>
          <DetailLabel xs={8}>Monthly Salary:</DetailLabel>
          <DetailValue xs={16}>{salaryData?.monthly_salary}</DetailValue>
          <DetailLabel xs={8}>Annual Salary:</DetailLabel>
          <DetailValue xs={16}>{salaryData?.annual_salary}</DetailValue>
          {salaryData?.additionalAllowanceBonus?.map((data: any) => (
            <DetailItem key={data?.name}>
              <DetailLabel xs={8}>{data?.name}</DetailLabel>
              <DetailValue xs={16}>{data?.amount}</DetailValue>
            </DetailItem>
          ))}
        </DetailItem>
      </DetailWrapper>
      <SalaryInformationEdit
        isModalOpen={editSalaryInformationModalOpen}
        id={data?.employee?.id}
        handleCancel={openCloseModal}
        data={salaryData}
      />
    </>
  );
};
