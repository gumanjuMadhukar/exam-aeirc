import { Button, Col, Input, Row, Select } from 'antd';
import { FilterParams } from 'pages/admin/attendance';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { Colors } from 'utils/colors';
import { getCurrentMonth } from 'utils/DateFormat';
import { fetchAllMonths, getYears } from 'utils/dateTime';

const { Option } = Select;

interface Props {
  filterParams: FilterParams;
  setFilterParams: Dispatch<SetStateAction<FilterParams>>;
}

interface DefaultFilterParams {
  search: string;
  year: string | undefined;
  month: string | undefined | any;
}

const defaultFilterData: DefaultFilterParams = {
  search: '',
  month: getCurrentMonth(),
  year: new Date().getFullYear().toString()
};

const AttendenceFilter = ({ filterParams, setFilterParams }: Props) => {
  const [filterData, setFilterData] = useState(defaultFilterData);

  const handleChangeMonth = (value: string) => {
    setFilterData({ ...filterData, month: value });
  };

  const handleChangeYear = (value: string) => {
    setFilterData({ ...filterData, year: value });
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
          <Col
            lg={10}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            className="search-col-margin"
          >
            <Input
              placeholder="Search"
              value={filterData?.search}
              onChange={e =>
                setFilterData({ ...filterData, search: e.target.value })
              }
            />
          </Col>
          <Col lg={3} xs={12} sm={12} md={12} className="search-col-margin">
            <Select
              style={{ width: '100%' }}
              onChange={handleChangeMonth}
              value={filterData?.month}
            >
              {fetchAllMonths().map((obj, i: number) => {
                return (
                  <Option value={obj.value} key={i}>
                    {obj.label}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col lg={3} xs={12} sm={12} md={12} className="search-col-margin">
            <Select
              placeholder="Year"
              style={{ width: '100%' }}
              onChange={handleChangeYear}
              value={filterData?.year}
            >
              {getYears().map((obj, i: number) => {
                return (
                  <Option value={obj.value} key={i}>
                    {obj.label}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col lg={4} xs={12} sm={12} md={12} className="search-col-margin">
            <Button
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

          <Col lg={4} xs={12} sm={12} md={12} className="search-col-margin">
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

export default AttendenceFilter;

const LeaveFilterContainer = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 0;
  @media (min-width: 768px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const LeaveFilterWrapper = styled.div`
  background-color: #fff;
  padding: 30px;
  @media (max-width: 768px) {
    padding: 20px !important;
  }
`;
