/* eslint-disable @next/next/no-img-element */
import {
  getDaysFromAttendance,
  getLeaveDates,
  getNameOfTheDayOfMonth,
  getWeekendsInMonth,
  isCurrentDay,
  remainingDaysInCurrentMonth
} from './dateTime';
import {
  FirstHalf,
  SecondHalf,
  Weekend,
  Holiday,
  Leave,
  FullDay
} from './icon';
import { AttendanceDetailLabel, DetailLabel } from 'styles/profileInformation';
import { CSSProperties } from 'styled-components';

export const getDaysInMonth = (
  m: string,
  year: string,
  handleCurrentUser: any,
  attendanceList: []
) => {
  let month = +m;
  let nameOfTheMonth = new Date(0, month - 1).toLocaleString('default', {
    month: 'short'
  });
  const daysInMonth = new Date(+year, month, 0).getDate();
  const days = [];
  const nameOfTheDayOfMonth = getNameOfTheDayOfMonth(+year, month - 1); //month starts from 0 in the function
  for (let i = 1; i <= Math.ceil(daysInMonth); i++) {
    const isTodayAWeekend = getWeekendsInMonth(+year, +m || 1).includes(i);
    // find current day
    days.push({
      title: () => (
        <div
          className={
            isCurrentDay(+year, month, i)
              ? 'attendance-table-header current-day'
              : isTodayAWeekend
              ? 'attendance-table-header weekend-day'
              : 'attendance-table-header'
          }
        >
          {attendanceList.length ? (
            <>
              <div>
                {nameOfTheMonth} {i}
              </div>
              <AttendanceDetailLabel>
                {nameOfTheDayOfMonth[i - 1]}
              </AttendanceDetailLabel>
            </>
          ) : null}
        </div>
      ),
      key: 'leave' + i,
      render: (employee: any) => {
        const holidays = employee.leave[employee.leave.length - 1].holidays;
        let textToBeDisplayed = <></>;

        // If there is no attendance record on the days that has already been passed: Holiday
        if (!remainingDaysInCurrentMonth(+m, +year).includes(i)) {
          textToBeDisplayed = <Leave />;
        }

        // Find weekend of the current month and show weekend
        if (getWeekendsInMonth(+year, +m || 1).includes(i)) {
          textToBeDisplayed = <Weekend />;
        }

        // If employee has taken holiday then holiday: Holiday
        holidays?.forEach((holiday: { date: string }) => {
          if (getLeaveDates(holiday.date, holiday.date).includes(i)) {
            textToBeDisplayed = <Holiday />;
          }
        });

        getDaysFromAttendance(employee.attendance).forEach((att: number) => {
          if (att === i) {
            textToBeDisplayed = <FullDay />;
          }
        });

        employee.leave.forEach((leave: any) => {
          if (Array.isArray(leave)) return;
          if (
            getLeaveDates(leave.start_date, leave.end_date).includes(i) &&
            leave.leaveStatus.name === 'APPROVED'
          ) {
            switch (leave.shift) {
              case 'HALF_FIRST':
                textToBeDisplayed = <FirstHalf />;
                break;
              case 'HALF_SECOND':
                textToBeDisplayed = <SecondHalf />;
                break;
              default:
                textToBeDisplayed = <Leave />;
                break;
            }
          }
        });
        return (
          <div
            onClick={() => handleCurrentUser(employee, i, textToBeDisplayed)}
            style={
              styles(textToBeDisplayed).styledTextToBeDisplayed as CSSProperties
            }
          >
            {textToBeDisplayed}
          </div>
        );
      },
      responsive: ['sm'],
      fixed: 'top'
    });
  }
  return days;
};

const styles = (textToBeDisplayed: JSX.Element) => {
  let pointerEvents = 'auto';
  if (textToBeDisplayed.type === (<Weekend />).type) {
    pointerEvents = 'none';
  }
  const styledTextToBeDisplayed = {
    cursor: 'pointer',
    textAlign: 'center',
    pointerEvents: pointerEvents,
    display: 'flex',
    justifyContent: 'center'
  };
  return { styledTextToBeDisplayed };
};
