import styled from 'styled-components';
import {
  Modal,
  Radio,
  RadioChangeEvent,
  Input,
  TimePicker,
  Form,
  message
} from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { checkinOptions, workingFromOptions } from 'constants/common';
import dayjs from 'dayjs';
import { useMutation, useQueryClient } from 'react-query';
import { checkIn, checkOut } from 'apis/checkInOut';
import moment from 'moment';

const { TextArea } = Input;

type AttendanceLogs = {
  attendance_check_in: Date;
  attendance_check_out: Date;
  attendance_in_comment: string;
  attendance_out_comment: string;
  duration: string;
};

interface Props {
  checkText?: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  toggleCheckInOutButton: boolean;
  setToggleCheckInOutButton: Dispatch<SetStateAction<boolean>>;
}
const CheckInOutModal = (props: Props) => {
  const {
    checkText = 'Check-in',
    isModalOpen,
    setIsModalOpen,
    toggleCheckInOutButton,
    setToggleCheckInOutButton
  } = props;

  const checkInMutation = useMutation((data: any) => checkIn(data));
  const checkOutMutation = useMutation((data: any) => checkOut(data));
  const queryClient = useQueryClient();

  const [checkinTime, setCheckinTime] = useState('current_time');
  const [selectTime, setSelectTime] = useState(false);
  const [workingFrom, setWorkingFrom] = useState('OFFICE');
  const selectedTime = dayjs();
  const selectTimeFormat = 'hh:mm a';

  const today = new Date();
  const currentIsoTime = today.toISOString();
  const currentTime = today.toLocaleTimeString();
  const [time, setTime] = useState(currentTime);

  const [customSelectedTime, setCustomSelectedTime] =
    useState<string>(currentIsoTime);

  const [form] = Form.useForm();

  useEffect(() => {
    checkinTime == 'select_time' ? setSelectTime(true) : setSelectTime(false);
  }, [checkinTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(currentTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime]);

  const onFinish = (values: any) => {
    const choosenTime = selectTime ? customSelectedTime : currentIsoTime;
    const workingFromValue = values.working_from ?? workingFrom;
    let dataToSend = {};
    if (checkText === 'Check-in') {
      dataToSend = {
        check_in: choosenTime,
        working_from: workingFromValue,
        in_comment: values.in_comment
      };
      checkInMutation.mutate(dataToSend, {
        onSuccess: () => {
          queryClient.invalidateQueries(['getMyAttendence']);
          queryClient.invalidateQueries('attendenceList');
          setToggleCheckInOutButton(!toggleCheckInOutButton);
          form.resetFields();
          setIsModalOpen(false);
        },
        onError: (data: any) => {
          const errorMessage = data?.response?.data?.message;
          message.error(errorMessage);
        }
      });
    } else {
      dataToSend = {
        check_out: choosenTime,
        out_comment: values.out_comment
      };
      checkOutMutation.mutate(dataToSend, {
        onSuccess: () => {
          queryClient.invalidateQueries('getMyAttendence');
          queryClient.invalidateQueries('attendenceList');
          setToggleCheckInOutButton(!toggleCheckInOutButton);
          form.resetFields();

          setIsModalOpen(false);
        },
        onError: (data: any) => {
          const errorMessage = data?.response?.data?.message;
          message.error(errorMessage);
        }
      });
    }
  };
  const onSelectCheckin = ({ target: { value } }: RadioChangeEvent) => {
    setCheckinTime(value);
  };
  const onSelectWorkingFrom = ({ target: { value } }: RadioChangeEvent) => {
    setWorkingFrom(value);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onTimeSelection = (time: any) => {
    const chooseTime = time?.toISOString();
    setCustomSelectedTime(chooseTime);
  };

  const disabledHours = () => {
    const hours = [];

    const currentHour = moment().hour();

    for (let i = currentHour + 1; i <= 24; i++) {
      hours.push(i);
    }

    return hours;
  };

  const disabledMinutes = (selectedHour: number) => {
    const minutes = [];
    const currentMinute = moment().minute();
    if (selectedHour === moment().hour()) {
      for (let i = currentMinute + 1; i <= 60; i++) {
        minutes.push(i);
      }
    }
    return minutes;
  };

  return (
    <Modal
      title={
        <div
          style={{
            fontSize: '18px',
            fontWeight: '700'
          }}
        >
          {checkText}
        </div>
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      width={540}
      okText="Submit"
    >
      <ModalContent>
        <Form form={form} onFinish={onFinish}>
          <strong>{checkText} Time</strong>
          <br />
          <br />
          <Form.Item name={checkText}>
            <Radio.Group
              options={checkinOptions}
              onChange={onSelectCheckin}
              value={checkinTime}
              defaultValue={checkinTime}
              optionType="button"
            />
          </Form.Item>

          {!selectTime && (
            <div
              style={{
                height: '32px'
              }}
            >
              <ClockCircleOutlined style={{ marginRight: '5px' }} />
              {time}
            </div>
          )}
          {selectTime && (
            <div>
              <TimePicker
                defaultValue={dayjs(selectedTime, 'hh:mm a')}
                format={selectTimeFormat}
                onChange={onTimeSelection}
                disabledHours={disabledHours}
                disabledMinutes={disabledMinutes}
                use12Hours={true}
              />
            </div>
          )}
          <br />
          {checkText === 'Check-in' && (
            <Form.Item name="working_from">
              <Radio.Group
                options={workingFromOptions}
                onChange={onSelectWorkingFrom}
                value={workingFrom}
                defaultValue={workingFrom}
                optionType="button"
              />
            </Form.Item>
          )}
          <strong>Add Comment</strong>
          <Form.Item
            name={checkText === 'Check-in' ? 'in_comment' : 'out_comment'}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </ModalContent>
    </Modal>
  );
};
export default CheckInOutModal;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
