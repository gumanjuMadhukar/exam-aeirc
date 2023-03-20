import React, { useMemo, useState } from 'react';
import { BadgeProps, Col, Row, Tooltip } from 'antd';
import type { Dayjs } from 'dayjs';
import styled from 'styled-components';
import { Badge, Calendar } from 'antd';
import { useQuery } from 'react-query';
import HolidayApi from 'apis/holiday';
import dayjs from 'dayjs';
import PageHeader from 'components/layout/page-header';
import { Colors } from 'utils/colors';

interface HolidayCalenderParams {
  year: number;
}

interface HolidayResponseType {
  name: string;
  day: string;
  date: Date;
  id: string;
}

interface CalendarList {
  type: string;
  content: string;
}

const HolidayCalender = () => {
  const holidayApi = new HolidayApi();
  const [year, setYear] = useState(2023);
  const [changedDate, setChangedDate] = useState(dayjs());

  const holidayList = useQuery(
    [
      'holidayList',
      {
        year
      }
    ],
    async () => {
      const queryParams: HolidayCalenderParams = {
        year
      };
      if (year) queryParams.year = year;
      const response = await holidayApi.list(queryParams);
      return response?.data?.data;
    }
  );

  const getListData = (value: Dayjs) => {
    let currentDateList: CalendarList[] = [];
    holidayList?.data?.map((obj: HolidayResponseType) => {
      let currentDate = dayjs(obj?.date);
      if (dayjs(value).isSame(currentDate, 'day')) {
        currentDateList.push({
          type: 'error',
          content: obj?.name
        });
      }
    });
    return currentDateList || [];
  };

  const upcomingHolidays =
    holidayList?.data?.length > 0
      ? holidayList?.data?.filter((obj: HolidayResponseType) => {
          let currentDate = dayjs(obj?.date);
          if (
            (currentDate.isAfter(dayjs()) ||
              currentDate.month() !== dayjs().month()) &&
            currentDate.month() === dayjs(changedDate).month()
          ) {
            return obj;
          }
        })
      : [];

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <CalendarListContainer className="events">
        {listData.map((item: CalendarList, i: number) => (
          <CalenderList key={i}>
            <Tooltip title={item?.content}>
              <CalendarBadge
                status={item?.type as BadgeProps['status']}
                text={item?.content}
              />
            </Tooltip>
          </CalenderList>
        ))}
      </CalendarListContainer>
    );
  };
  return (
    <div>
      <PageHeader
        items={[
          {
            name: 'Holiday',
            link: '/holiday'
          },
          {
            name: 'Calendar',
            link: ''
          }
        ]}
        titleContent="Holiday"
        goBack={true}
      />
      <CalendarContainer>
        <Row gutter={30}>
          <Col lg={18} style={{ position: 'relative' }}>
            <CalendarTitle>
              {dayjs(changedDate)?.format('MMMM YYYY')}
            </CalendarTitle>
            <Calendar
              dateCellRender={dateCellRender}
              onChange={date => {
                setYear(date?.year());
                if (dayjs(date).month() !== dayjs(changedDate).month()) {
                  setChangedDate(date);
                }
              }}
              style={{ padding: 20, overflow: 'scroll' }}
            />
          </Col>
          <Col lg={6} sm={24}>
            <UpcomingContainer>
              <UpcomingTitle>Upcoming Holidays</UpcomingTitle>
              <DatesContainer>
                {upcomingHolidays?.length > 0
                  ? upcomingHolidays?.map(
                      (holiday: HolidayResponseType, i: number) => {
                        const date = dayjs(holiday?.date);
                        return (
                          <UpcomingWrapper key={i}>
                            <LeftWrapper>
                              <DateDiv>{date?.format('DD')}</DateDiv>
                              <DayDiv>{date?.format('ddd')}</DayDiv>
                            </LeftWrapper>
                            <RightWrapper>
                              <HolidayTitle>{holiday?.name}</HolidayTitle>
                              <HolidayDate>
                                {date?.format('MMM YYYY')}
                              </HolidayDate>
                            </RightWrapper>
                          </UpcomingWrapper>
                        );
                      }
                    )
                  : 'No Upcoming Holidays'}
              </DatesContainer>
            </UpcomingContainer>
          </Col>
        </Row>
      </CalendarContainer>
    </div>
  );
};

export default HolidayCalender;

const CalenderList = styled.li`
  list-style: none;
`;

const CalendarTitle = styled.div`
  position: absolute;
  top: 35px;
  margin-left: 20px;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
`;

const CalendarContainer = styled.div`
  padding: 20px;
`;

const CalendarListContainer = styled.ul`
  padding: 0;
  padding-bottom: 10px;
  line-height: 14px;
`;

const CalendarBadge = styled(Badge)`
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  :where(.css-dev-only-do-not-override-12j5bys).ant-badge.ant-badge-status
    .ant-badge-status-text {
    font-size: 12px;
    color: ${Colors.DANGER};
  }
`;

const UpcomingTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const UpcomingContainer = styled(CalendarContainer)`
  background: ${Colors.WHITE};
  @media (max-width: 992px) {
    margin-top: 10px;
  }
`;

const DatesContainer = styled.div`
  padding-top: 20px;
  height: calc(100vh - 250px);
  overflow-y: auto;
`;

const UpcomingWrapper = styled.div`
  display: flex;
`;

const LeftWrapper = styled.div`
  background: #fff1f0;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  color: ${Colors.DANGER};
  margin-bottom: 20px;
  width: 45px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const DateDiv = styled.div``;

const DayDiv = styled.div`
  font-size: 12px;
`;

const RightWrapper = styled.div`
  margin-left: 20px;
`;
const HolidayTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const HolidayDate = styled.div`
  color: ${Colors.LIGHT_TEXT_COLOR};
  font-size: 12px;
`;
