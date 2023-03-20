import { Input, Form, Button, Modal, message, Space } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { Colors } from 'utils/colors';
import styled from 'styled-components';
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';
import { useEffect } from 'react';
import { addDeductSalary } from 'apis/admin/salary';

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  selectedEmployee: any;
}

interface IAddDeduct {
  label: string;
  comment: string;
  amount: number;
  type: string;
}

export interface AddDeductRequest {
  employeeId: number;
  addDeduct: IAddDeduct[];
}

interface IDefaultFormField {
  label: string;
  amount: number;
  comment: string;
}

interface DefaultFormFieldType {
  [key: string]: IDefaultFormField[];
}

const defaultFormField = {
  add: [
    {
      label: '',
      amount: '',
      comment: ''
    }
  ],
  deduct: [
    {
      label: '',
      amount: '',
      comment: ''
    }
  ]
};

const EditPayrollSalary = ({
  handleCancel,
  isModalOpen,
  selectedEmployee
}: Props) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const addDeductMutation = useMutation((data: AddDeductRequest) =>
    addDeductSalary(data)
  );

  useEffect(() => {
    form.setFieldsValue(defaultFormField);
  }, []);

  const onFinish = (data: DefaultFormFieldType) => {
    const newData: IAddDeduct[] = [];
    Object.keys(data).forEach(function (key) {
      data[key]?.map((item: IDefaultFormField) => {
        if (key === 'add') {
          newData.push({
            ...item,
            type: 'ADDITION'
          });
        } else {
          newData.push({
            ...item,
            type: 'DEDUCTION'
          });
        }
      });
    });

    const body = {
      employeeId: selectedEmployee?.empId,
      addDeduct: newData
    };

    addDeductMutation.mutate(body, {
      onSuccess: () => {
        handleCancel();
        form.resetFields();
        form.setFieldsValue(defaultFormField);
        queryClient.invalidateQueries(['currentPayroll']);
        message.success('Salary Edited Successfully');
      },
      onError: (data: any) => {
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage);
      }
    });
  };

  return (
    <Modal
      title={
        <>
          Edit Salary:{' '}
          <span style={{ color: Colors.PRIMARY }}>
            {selectedEmployee?.empName}
          </span>
        </>
      }
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <Form.List name="add">
          {(fields, { add, remove }) => (
            <>
              <FieldTitle>Additions</FieldTitle>
              {fields.map((field, i) => {
                return (
                  <FieldItemWrapper style={{ position: 'relative' }} key={i}>
                    <Space key={field.key} align="baseline">
                      <Form.Item
                        label="Label"
                        name={[field.name, 'label']}
                        rules={[{ required: true, message: 'Missing Label' }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Amount"
                        name={[field.name, 'amount']}
                        rules={[{ required: true, message: 'Missing Amount' }]}
                      >
                        <Input type="number" />
                      </Form.Item>
                      <Form.Item
                        label="Comment"
                        name={[field.name, 'comment']}
                        rules={[{ required: true, message: 'Missing comment' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Space>
                    {fields?.length === i + 1 && (
                      <FormItemDelete onClick={() => remove(field.name)}>
                        <DeleteFilled />
                      </FormItemDelete>
                    )}
                  </FieldItemWrapper>
                );
              })}

              <Form.Item>
                <FormItemAdd onClick={() => add()} icon={<PlusCircleFilled />}>
                  Add
                </FormItemAdd>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.List name="deduct">
          {(fields, { add, remove }) => (
            <>
              <FieldTitle>Deductions</FieldTitle>
              {fields.map((field, i) => {
                return (
                  <FieldItemWrapper style={{ position: 'relative' }} key={i}>
                    <Space key={field.key} align="baseline">
                      <Form.Item
                        label="Label"
                        name={[field.name, 'label']}
                        rules={[{ required: true, message: 'Missing Label' }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Amount"
                        name={[field.name, 'amount']}
                        rules={[{ required: true, message: 'Missing Amount' }]}
                      >
                        <Input type="number" />
                      </Form.Item>
                      <Form.Item
                        label="Comment"
                        name={[field.name, 'comment']}
                        rules={[{ required: true, message: 'Missing comment' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Space>
                    {fields?.length === i + 1 && (
                      <FormItemDelete onClick={() => remove(field.name)}>
                        <DeleteFilled />
                      </FormItemDelete>
                    )}
                  </FieldItemWrapper>
                );
              })}

              <Form.Item>
                <FormItemAdd onClick={() => add()} icon={<PlusCircleFilled />}>
                  Add
                </FormItemAdd>
              </Form.Item>
            </>
          )}
        </Form.List>

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
              Save
            </Button>
          </ApplyButtons>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPayrollSalary;

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

const FieldTitle = styled.div`
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 10px;
`;

const FormItemAdd = styled(Button)`
  font-size: 14px;
  border: 1px solid ${Colors.BTN_BORDER_OUTLINE};
  color: ${Colors.LIGHT_TEXT_COLOR};
`;

const FormItemDelete = styled(Button)`
  border: 1px solid ${Colors.DANGER};
  color: ${Colors.DANGER};
  position: absolute;
  bottom: -35px;
  right: 0px;
  height: 30px;
  z-index: 9;
  &:hover {
    border: 1px solid ${Colors.DANGER} !important;
    color: ${Colors.DANGER} !important;
  }
`;

const FieldItemWrapper = styled.div``;
