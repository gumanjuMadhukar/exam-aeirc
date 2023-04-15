import { Colors } from "utils/colors";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  DetailWrapper,
  DetailTitleWrapper,
  DetailItem,
  DetailLabel,
  DetailTitle,
  DetailValue,
} from "styles/profileInformation";
import { useState } from "react";

import { EmployeeDetails } from "constants/schemas/employee";

interface Props {
  data: any;
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
          {/* <EditOutlined
            style={{ color: Colors.BORDER_COLOR }}
            onClick={openCloseModal}
          /> */}
        </DetailTitleWrapper>
        <DetailItem>
          <DetailLabel xs={8}>Name:</DetailLabel>
          <DetailValue xs={16}>{empData?.name}</DetailValue>
          <DetailLabel xs={8}>Email:</DetailLabel>
          <DetailValue xs={16}>{empData?.email}</DetailValue>
          <DetailLabel xs={8}>Symbol Number:</DetailLabel>
          <DetailValue xs={16}>{empData?.symbol_number}</DetailValue>
          <DetailLabel xs={8}>Date Of Birth:</DetailLabel>
          <DetailValue xs={16}>{empData?.date_of_birth}</DetailValue>
          <DetailLabel xs={8}>Subject:</DetailLabel>
          <DetailValue xs={16} style={{ color: Colors.PRIMARY }}>
            {empData?.subject?.name}
          </DetailValue>
        </DetailItem>
      </DetailWrapper>
    </>
  );
};
