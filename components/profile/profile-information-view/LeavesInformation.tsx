import {
  DetailItem,
  DetailLabel,
  DetailTitle,
  DetailTitleWrapper,
  DetailValue,
  DetailWrapper
} from 'styles/profileInformation';
import { Colors } from 'utils/colors';
import { EditOutlined } from '@ant-design/icons';
import { EmployeeDetails } from 'constants/schemas/employee';

interface leavesProps {
  possibleTotal: number;
  totalTaken: number;
}

interface Props {
  data: EmployeeDetails;
}
const LeavesInformation = (props: Props) => {
  const { data } = props;
  const leaves = data;
  let listItems;
  if (leaves) {
    listItems = Object?.entries(leaves).map(([key, value]) => {
      const { possibleTotal, totalTaken } = value as leavesProps;
      const Balance = possibleTotal - totalTaken;
      return (
        <DetailItem key={key}>
          <DetailLabel xs={8} key={key}>
            {key}
          </DetailLabel>
          <DetailValue xs={8} key={possibleTotal}>
            {Balance}
          </DetailValue>
          <DetailValue xs={8} key={totalTaken}>
            {totalTaken}
          </DetailValue>
        </DetailItem>
      );
    });
  }

  return (
    <>
      <DetailWrapper>
        <DetailTitleWrapper>
          <DetailTitle>Leaves</DetailTitle>
        </DetailTitleWrapper>
        <DetailItem>
          <>
            <DetailLabel xs={8}></DetailLabel>
            <DetailLabel xs={8}>Balance</DetailLabel>
            <DetailLabel xs={8}>Total Taken</DetailLabel>
            {listItems}
          </>
        </DetailItem>
      </DetailWrapper>
    </>
  );
};

export default LeavesInformation;
