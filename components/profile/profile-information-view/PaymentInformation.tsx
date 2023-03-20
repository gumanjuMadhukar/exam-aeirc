import { Col, Row } from 'antd';
import styled from 'styled-components';
import { Colors } from 'utils/colors';
import { EditOutlined } from '@ant-design/icons';
import {
  DetailWrapper,
  DetailTitleWrapper,
  DetailLabel,
  DetailTitle,
  DetailValue,
  DetailItem
} from 'styles/profileInformation';
import { useEffect, useState } from 'react';
import { PaymentInformationEdit } from '../profile-information-edit/PaymentInformationEdit';
import { EmployeeDetails } from 'constants/schemas/employee';
import { isAdmin } from 'utils/roles';

interface Props {
  data: EmployeeDetails;
}
export const PaymentInformation = (props: Props) => {
  const { data } = props;

  const [editPaymentInformationModalOpen, setEditPaymentInformationModalOpen] =
    useState(false);
  const [editable, setEditable] = useState(false);

  const openCloseModal = () => {
    setEditPaymentInformationModalOpen(!editPaymentInformationModalOpen);
  };

  useEffect(() => {
    setEditable(isAdmin());
  }, []);

  const empData = data;
  return (
    <>
      <DetailWrapper>
        <DetailTitleWrapper>
          <DetailTitle>Payment Information</DetailTitle>
          {editable && (
            <EditOutlined
              style={{ color: Colors.BORDER_COLOR }}
              onClick={openCloseModal}
            />
          )}
        </DetailTitleWrapper>
        <DetailItem>
          <DetailLabel xs={8}>PAN No.:</DetailLabel>
          <DetailValue xs={16}>{empData?.pan_number}</DetailValue>
          <DetailLabel xs={8}>Bank Name:</DetailLabel>
          <DetailValue xs={16}>{empData?.bank_name}</DetailValue>
          <DetailLabel xs={8}>Account No:</DetailLabel>
          <DetailValue xs={16}>{empData?.bank_account_number}</DetailValue>
          <DetailLabel xs={8}>Account Name:</DetailLabel>
          <DetailValue xs={16}>{empData?.bank_account_name}</DetailValue>
        </DetailItem>
      </DetailWrapper>
      <PaymentInformationEdit
        isModalOpen={editPaymentInformationModalOpen}
        id={empData?.id}
        handleCancel={openCloseModal}
        data={empData}
      />
    </>
  );
};
