import { Col, Row } from "antd";
import styled from "styled-components";
import { Colors } from "utils/colors";

export const DetailItem = styled(Row)`
  width: 100%;
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const DetailLabel = styled(Col)`
  margin-bottom: 10px;
  color: ${Colors.LIGHT_TEXT_COLOR};
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const DetailValue = styled(Col)`
  font-weight: bold;
  // margin-left: 10px;
`;

export const DetailWrapper = styled.div`
  background: #fff;
  // margin-bottom: 25px;
  margin-left: 25px;
  padding: 25px;
  @media (max-width: 988px) {
    margin-left: 0px;
    padding: 10px;
    overflow: scroll;
  }
`;

export const DetailTitle = styled.div`
  font-size: 20px;
  color: #000;
  font-weight: 700;
  @media (max-width: 480px) {
    font-size: 14px;
    font-weight: 600;
  }
`;

export const DetailTitleWrapper = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 10px;
`;

export const CustomizedButtonGroup = styled.div`
  float: right;
  margin-top: 10px;
`;

export const AttendanceDetailLabel = styled(Col)`
  color: ${Colors.LIGHT_TEXT_COLOR};
`;
