import { Button, DatePicker, Form, Input, Modal, Radio, Select } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { Colors } from 'utils/colors';
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;

interface IApplyLeaveModal {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  onFinish: (ApplyLeavesPayload: any) => void;
  leaveTypesOption: {
    label: string;
    value: string;
    allotedDays: number;
  }[];
}

export const ApplyLeaveModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  onFinish,
  leaveTypesOption
}: IApplyLeaveModal) => {
  const [form] = Form.useForm();
  const disabledDate: RangePickerProps['disabledDate'] = current => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };
  return (
    <Modal
      title="Apply for Leave"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="basic"
        onFinish={e => {
          form.resetFields();
          onFinish(e);
        }}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <Form.Item
          label="Leave Type"
          name="leaveTypeId"
          rules={[{ required: true, message: 'Please select leave type!' }]}
        >
          <Select placeholder="Please select the leave type">
            {leaveTypesOption.map((obj: any, i: number) => {
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
        <Form.Item>
          <Button
            style={{
              width: '100%',
              backgroundColor: Colors.PRIMARY,
              color: '#fff'
            }}
            size="large"
            htmlType="submit"
          >
            Apply
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
