import { LeaveDetailsResponse } from 'apis/leave';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { formatDecimalPoint } from 'utils';

dayjs.extend(relativeTime);

export const calculateTotalDuration = (in_at: string, out_at: string) => {
  return dayjs(in_at).from(out_at).split('ago');
};
// Add two times in hh:mm format
export function addTimes(durations: string[]) {
  //   let durations = ['00:08:07', '01:05:32', '00:15:19'];
  let totalSeconds = 0;

  for (let i = 0; i < durations.length; i++) {
    let [h, m, s] = durations[i].split(':').map(x => parseInt(x));
    totalSeconds += h * 3600 + m * 60 + s;
  }

  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  let result = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return result;
}

export const calculateDifferenceBetweenTwoDates = (
  end_date: Date,
  start_date: Date,
  shift: string
) => {
  const shiftToDays = shift.includes('HALF_') ? 0.5 : 1;
  return (dayjs(end_date).diff(start_date, 'days') + 1) * shiftToDays;
};

export const totalAllotedLeaveCalculation = (
  sickType: string,
  leaveDetailsData: { data: { data: LeaveDetailsResponse } } | undefined
) => {
  if (sickType !== 'CASUAL') return 0;
  if (
    !leaveDetailsData?.data.data.prevLeavesRemaining ||
    !leaveDetailsData?.data.data.prevLeavesRemaining.length
  )
    return 0;
  return +leaveDetailsData?.data.data.prevLeavesRemaining[0]?.days;
};

export const fetchAllMonths = () => [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 }
];

export const getYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 4; i++) {
    years.push({ label: currentYear - i, value: currentYear - i });
  }
  return years;
};

export const getLeaveDates = (startDate: string, endDate: string) => {
  let start = new Date(startDate);
  let end = new Date(endDate);
  let dates = [];

  while (start <= end) {
    dates.push(start.getDate());
    start.setDate(start.getDate() + 1);
  }

  return dates;
};

export const getWeekendsInMonth = (year: number, month: number) => {
  let start = new Date(year, month - 1, 1);
  let end = new Date(year, month, -1);
  let weekends = [];

  while (start <= end) {
    if (start.getDay() === 6 || start.getDay() === 0) {
      weekends.push(start.getDate());
    }
    start.setDate(start.getDate() + 1);
  }

  return weekends;
};

export const remainingDaysInCurrentMonth = (m: number, year: number) => {
  const currentDate = new Date();
  if (m !== currentDate.getMonth() + 1 || year !== currentDate.getFullYear()) {
    return [];
  }

  const daysInMonth = new Date(year, m, 0).getDate();
  const days = [];
  for (let i = currentDate.getDate(); i <= daysInMonth; i++) {
    days.push(i);
  }
  return days;
};

export const getDaysFromAttendance = (arr: [{ check_in: string }]) => {
  const days: any = [];
  arr.forEach(obj => {
    const checkIn = new Date(obj.check_in);
    const day = checkIn.getUTCDate();
    days.push(day);
  });
  return days;
};

export function calculateLogs(logs: any) {
  let totalSeconds = 0;
  logs.map((log: any) => {
    if (log.duration) {
      let [h, m, s] = log.duration.split(':').map((x: any) => parseInt(x));
      totalSeconds += h * 3600 + m * 60 + s;
    }
  });

  const hours = totalSeconds / 3600;

  return `${formatDecimalPoint(hours)} hours`;
}

export const getNameOfTheDayOfMonth = (year: number, month: number) => {
  const days = [];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    const dayName = date.toLocaleString('en-US', { weekday: 'short' });
    days.push(dayName);
    date.setDate(date.getDate() + 1);
  }

  return days;
};

export const isCurrentDay = (year: number, month: number, day: number) => {
  const inputDate = new Date(year, month - 1, day); // month is zero-indexed in Date constructor
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // set time to midnight

  if (inputDate.getTime() === currentDate.getTime()) {
    return true;
  } else {
    return false;
  }
};
