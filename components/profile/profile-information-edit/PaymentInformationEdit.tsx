import { Button, Form, Input, message, Modal } from 'antd';

import { updateEmployeeData } from 'apis/employee';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { CustomizedButtonGroup } from 'styles/profileInformation';
import { isNumeric } from 'utils';
import { Colors } from 'utils/colors';

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  id: any;
  data: any;
}

export const PaymentInformationEdit = (props: Props) => {
  const { id, isModalOpen, handleCancel, data } = props;
  const queryClient = useQueryClient();
  const basicInformationMutation = useMutation((data: any) =>
    updateEmployeeData(id, data)
  );
  const onFinish = (data: any) => {
    const newData = {
      ...data,
      pan_number: parseInt(data?.pan_number)
    };
    basicInformationMutation.mutate(newData, {
      onSuccess: () => {
        queryClient.invalidateQueries(['employeeBasicInfo']);
        queryClient.invalidateQueries([`employeeBasicInfo-${id}`]);
        handleCancel();
        message.success('Payment Information Updated Successfully');
      },
      onError: (data: any) => {
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage);
      }
    });
  };
  return (
    <Modal
      title="Edit Payment Information"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      className="modal-content-responsive"
    >
      <Form
        name="payment"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Pan No. (Personal)"
          name="pan_number"
          initialValue={data?.pan_number}
          rules={[
            { required: true, message: 'Please enter pan no.!' },
            { validator: isNumeric }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Bank Name"
          name="bank_name"
          initialValue={data?.bank_name}
          rules={[{ required: true, message: 'Please enter bank name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Bank Account No."
          name="bank_account_number"
          initialValue={data?.bank_account_number}
          rules={[
            { required: true, message: 'Please enter bank account number!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Bank Account Name"
          name="bank_account_name"
          initialValue={data?.bank_account_name}
          rules={[
            { required: true, message: 'Please enter bank account name!' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <CustomizedButtonGroup>
            <Button size="large" onClick={handleCancel}>
              Cancel
            </Button>

            <Button
              style={{
                backgroundColor: Colors.PRIMARY,
                color: '#fff',
                marginLeft: '10px'
              }}
              size="large"
              htmlType="submit"
            >
              Save
            </Button>
          </CustomizedButtonGroup>
        </Form.Item>
      </Form>
    </Modal>
  );
};
