/* eslint-disable react/no-unescaped-entities */
import { Col, Row } from 'antd';
import { leaveAllDetails, leaveTypes } from 'apis/leave';
import { Dispatch, SetStateAction, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Leaves } from 'utils/enums';
import { FilterParams } from '..';

interface Props {
  filterParams: FilterParams;
  setFilterParams: Dispatch<SetStateAction<FilterParams>>;
}
interface DefaultFilterParams {
  leaveStatusId?: string | undefined;
  leaveTypeId?: string | undefined;
}

const defaultFilterData: DefaultFilterParams = {
  leaveStatusId: undefined,
  leaveTypeId: undefined
};

const LeaveDetails = ({ setFilterParams, filterParams }: Props) => {
  const { data: leaves } = useQuery(['allLeavesDetails'], () => {
    return leaveAllDetails();
  });
  const [filterValue, setFilterValue] = useState(defaultFilterData);

  const allLeavesData = leaves?.data?.data;
  const sickleave = allLeavesData?.leaves.map((data: any) => {
    if (data?.name === Leaves.SICK) return data?.count;
  });
  return (
    <LeaveDetailContainer>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col lg={6} xs={24} sm={24} md={24}>
          <LeaveCard>
            <Title>Today's Present</Title>
            <Value>
              {allLeavesData?.employees?.todaysPresent}/
              {allLeavesData?.employees?.total}
            </Value>
          </LeaveCard>
        </Col>
        <Col
          lg={6}
          xs={24}
          sm={24}
          md={24}
          className="search-col-margin"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setFilterValue({
              leaveTypeId: '1',
              leaveStatusId: '1'
            });
            setFilterParams({ ...filterParams, ...filterValue });
          }}
        >
          <LeaveCard>
            <Title>Vacation / Planned Leave</Title>
            <Value> {allLeavesData?.approved}</Value>
          </LeaveCard>
        </Col>
        <Col
          lg={6}
          xs={24}
          sm={24}
          md={24}
          className="search-col-margin"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setFilterValue({ leaveTypeId: '2', leaveStatusId: undefined });
            setFilterParams({ ...filterParams, ...filterValue });
          }}
        >
          <LeaveCard>
            <Title>Sick Leave</Title>
            <Value>{sickleave}</Value>
          </LeaveCard>
        </Col>
        <Col
          lg={6}
          xs={24}
          sm={24}
          md={24}
          className="search-col-margin"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setFilterValue({ leaveStatusId: '2', leaveTypeId: undefined });
            setFilterParams({ ...filterParams, ...filterValue });
          }}
        >
          <LeaveCard>
            <Title>Pending Request</Title>
            <Value>{allLeavesData?.pending}</Value>
          </LeaveCard>
        </Col>
      </Row>
    </LeaveDetailContainer>
  );
};

export default LeaveDetails;

const LeaveDetailContainer = styled.div`
  padding: 30px;
`;

const LeaveCard = styled.div`
  padding: 20px;
  background-color: #fff;
`;

const Title = styled.div`
  color: #979595;
  margin-bottom: 10px;
`;

const Value = styled.div`
  font-size: 18px;
  font-weight: 500;
`;
