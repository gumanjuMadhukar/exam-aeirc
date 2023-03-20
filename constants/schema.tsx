import dayjs, { Dayjs } from 'dayjs';

export const MONTH_SELECT = [
  {
    value: 1,
    label: 'January'
  },
  {
    value: 2,
    label: 'February'
  },
  {
    value: 3,
    label: 'March'
  },
  {
    value: 4,
    label: 'April'
  },
  {
    value: 5,
    label: 'May'
  },
  {
    value: 6,
    label: 'June'
  },
  {
    value: 7,
    label: 'July'
  },
  {
    value: 8,
    label: 'August'
  },
  {
    value: 9,
    label: 'September'
  },
  {
    value: 10,
    label: 'October'
  },
  {
    value: 11,
    label: 'November'
  },
  {
    value: 12,
    label: 'December'
  }
];

const lastWeek = dayjs().subtract(7, 'day');
const startOfLastWeek = lastWeek.startOf('week');
const endOfLastWeek = lastWeek.endOf('week');

export const rangePresets: {
  label: string;
  value: [Dayjs, Dayjs];
}[] = [
  { label: 'Today', value: [dayjs(), dayjs()] },
  { label: 'Yesterday', value: [dayjs().add(-1, 'd'), dayjs()] },
  {
    label: 'This Week',
    value: [dayjs().startOf('week'), dayjs().endOf('week')]
  },
  { label: 'Last Week', value: [startOfLastWeek, endOfLastWeek] },
  { label: 'Past Two Month', value: [dayjs().subtract(2, 'month'), dayjs()] },
  {
    label: 'This Month',
    value: [dayjs().startOf('month'), dayjs().endOf('month')]
  },
  {
    label: 'This Year',
    value: [dayjs().startOf('year'), dayjs().endOf('year')]
  },
  {
    label: 'Last Year',
    value: [
      dayjs().subtract(1, 'year').startOf('year'),
      dayjs().subtract(1, 'year').endOf('year')
    ]
  }
];
