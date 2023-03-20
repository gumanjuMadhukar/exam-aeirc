import { NO_RECORD } from 'constants/common';
import dayjs from 'dayjs';
import moment from 'moment';

interface Props {
  icon?: any;
  checkText?: string;
  time?: string;
}

const CheckInfo = (props: Props) => {
  const { icon, checkText = 'Check-in', time } = props;

  const renderHHMMSS = () => {
    if (!time) return NO_RECORD;
    return moment(time).format('HH:mm:ss A');
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: '1.6'
      }}
    >
      <div style={{ display: 'flex' }}>
        {icon}
        <span style={{ paddingLeft: '5px' }}>{checkText}</span>
      </div>
      <span style={{ fontWeight: '700', paddingLeft: '10px' }}>
        {renderHHMMSS()}
      </span>
    </div>
  );
};
export default CheckInfo;
