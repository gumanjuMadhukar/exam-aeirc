import { Button, Col, DatePicker, Input, Row, Select } from 'antd';
import { leaveStatuses, leaveTypes } from 'apis/leave';
import { rangePresets } from 'constants/schema';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Colors } from 'utils/colors';
import { FilterParams } from '../index';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface Props {
  filterParams: FilterParams;
  setFilterParams: Dispatch<SetStateAction<FilterParams>>;
  hideSearch?: boolean;
}

interface DefaultFilterParams {
  search: string;
  leaveStatusId: string | undefined;
  leaveTypeId: string | undefined;
  startDate: string;
  endDate: string;
}

const defaultFilterData: DefaultFilterParams = {
  search: '',
  leaveStatusId: undefined,
  leaveTypeId: undefined,
  startDate: '',
  endDate: ''
};

const LeaveFilter = ({ filterParams, setFilterParams, hideSearch }: Props) => {
  const { data: leavesData }: any = useQuery('leavesTypes', leaveTypes);
  const { data: leavesStatusData }: any = useQuery(
    'leavesStatuses',
    leaveStatuses
  );
  const [filterData, setFilterData] = useState(defaultFilterData);

  const leaveTypesOption: LeaveTypeOption[] =
    leavesData?.data.data.length > 0
      ? leavesData?.data?.data?.map((item: any) => ({
          label: item.alias,
          value: item.id
        }))
      : [];

  const leaveStatusOption: LeaveTypeOption[] =
    leavesStatusData?.data.data.length > 0
      ? leavesStatusData?.data?.data?.map((item: any) => ({
          label: item.alias,
          value: item.id
        }))
      : [];

  const handleChangeType = (value: string) => {
    setFilterData({ ...filterData, leaveTypeId: value });
  };

  const handleChangeStatus = (value: string) => {
    setFilterData({ ...filterData, leaveStatusId: value });
  };

  const handleSearch = () => {
    setFilterParams({
      ...filterParams,
      ...filterData
    });
  };

  return (
    <LeaveFilterContainer>
      <LeaveFilterWrapper>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col lg={6} xs={24} sm={24} md={24}>
            <RangePicker
              value={
                filterData?.startDate
                  ? [dayjs(filterData?.startDate), dayjs(filterData?.endDate)]
                  : undefined
              }
              presets={rangePresets}
              onChange={date =>
                date &&
                setFilterData({
                  ...filterData,
                  startDate: dayjs(date[0])?.format('YYYY-MM-DD'),
                  endDate: dayjs(date[1])?.format('YYYY-MM-DD')
                })
              }
              className="ragepicker-repsonsives"
            />
          </Col>
          {!hideSearch && (
            <Col lg={6} xs={24} sm={24} md={24} className="search-col-margin">
              <Input
                placeholder="Employee Name"
                value={filterData?.search}
                onChange={e =>
                  setFilterData({ ...filterData, search: e.target.value })
                }
              />
            </Col>
          )}
          <Col
            lg={hideSearch ? 5 : 3}
            xs={12}
            sm={12}
            md={12}
            className="search-col-margin"
          >
            <Select
              placeholder="Leave Type"
              style={{ width: '100%' }}
              onChange={handleChangeType}
              value={filterData?.leaveTypeId}
            >
              {leaveTypesOption.map((obj: LeaveTypeOption, i: number) => {
                return (
                  <Option value={obj.value} key={i}>
                    {obj.label}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col
            lg={hideSearch ? 5 : 3}
            xs={12}
            sm={12}
            md={12}
            className="search-col-margin"
          >
            <Select
              placeholder="Leave Status"
              style={{ width: '100%' }}
              onChange={handleChangeStatus}
              value={filterData?.leaveStatusId}
            >
              {leaveStatusOption.map((obj: LeaveTypeOption, i: number) => {
                return (
                  <Option value={obj.value} key={i}>
                    {obj.label}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col
            lg={hideSearch ? 4 : 3}
            xs={12}
            sm={12}
            md={12}
            className="search-col-margin"
          >
            <Button
              type="ghost"
              ghost
              style={{
                boxShadow: 'none',
                width: '100%',
                borderColor: Colors.PRIMARY,
                color: Colors.PRIMARY
              }}
              onClick={() => {
                setFilterData(defaultFilterData);
                setFilterParams({
                  ...filterParams,
                  ...defaultFilterData
                });
              }}
            >
              Reset
            </Button>
          </Col>

          <Col
            lg={hideSearch ? 4 : 3}
            xs={12}
            sm={12}
            md={12}
            className="search-col-margin"
          >
            <Button
              type="primary"
              style={{ boxShadow: 'none', width: '100%' }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Col>
        </Row>
      </LeaveFilterWrapper>
    </LeaveFilterContainer>
  );
};

export default LeaveFilter;

const LeaveFilterContainer = styled.div`
  padding: 30px;
  padding-top: 0;
`;

const LeaveFilterWrapper = styled.div`
  background-color: #fff;
  padding: 20px;
`;
