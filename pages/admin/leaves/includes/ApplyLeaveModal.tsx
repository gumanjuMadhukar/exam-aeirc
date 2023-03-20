import {
  Input,
  Form,
  Button,
  Radio,
  Select,
  Modal,
  DatePicker,
  message
} from 'antd';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { applyLeave, leaveTypes } from 'apis/leave';
import { FilterParams } from '../index';
import { Colors } from 'utils/colors';
import styled from 'styled-components';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  filterParams: FilterParams;
}

const ApplyLeaveModal = ({
  handleCancel,
  isModalOpen,
  filterParams
}: Props) => {
  const queryClient = useQueryClient();

  const { data: leavesData }: any = useQuery('leavesTypes', leaveTypes);

  const applyLeaveMutation = useMutation((data: ApplyLeavesPayload) =>
    applyLeave(data)
  );

  const onFinish = (data: ApplyLeavesPayload) => {
    const newData = {
      ...data,
      start_date: data?.data_range[0]?.format('YYYY-MM-DD'),
      end_date: data?.data_range[1]?.format('YYYY-MM-DD')
    };
    delete newData.data_range;

    applyLeaveMutation.mutate(newData, {
      onSuccess: () => {
        handleCancel();
        queryClient.invalidateQueries(['allLeaves', filterParams]);
        message.success('Leave Applied Successfully');
      },
      onError: (data: any) => {
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage);
      }
    });
  };

  const leaveTypesOption: LeaveTypeOption[] =
    leavesData?.data.data.length > 0
      ? leavesData?.data?.data?.map((item: any) => ({
          label: item.alias,
          value: item.id
        }))
      : [];

  const disabledDate: RangePickerProps['disabledDate'] = current => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };
  return (
    <Modal
      title="Apply for Leave"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Leave Type"
          name="leaveTypeId"
          rules={[{ required: true, message: 'Please select leave type!' }]}
        >
          <Select placeholder="Please select the leave type">
            {leaveTypesOption.map((obj: LeaveTypeOption, i: number) => {
              return (
                <Option value={obj.value} key={i}>
                  {obj.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Select Date Range"
          name="data_range"
          rules={[{ required: true, message: 'Please select date range!' }]}
        >
          <RangePicker disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item
          label="Shift"
          name="shift"
          rules={[{ required: true, message: 'Please select date range!' }]}
        >
          <Radio.Group>
            <Radio value="FULL">Full Leave</Radio>
            <Radio value="HALF_FIRST">First Half Leave</Radio>
            <Radio value="HALF_SECOND">Second Half Leave</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Leave Reason"
          name="reason"
          rules={[
            { required: true, message: 'Please enter your leave reason!' }
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <ApplyButtons>
            <Button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              style={{
                backgroundColor: Colors.PRIMARY,
                color: '#fff'
              }}
              htmlType="submit"
            >
              Apply
            </Button>
          </ApplyButtons>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ApplyLeaveModal;

const ApplyButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  button {
    margin-left: 8px;
    font-size: 14px;
    &.cancel-btn {
      background-color: ${Colors.WHITE};
    }
  }
`;
