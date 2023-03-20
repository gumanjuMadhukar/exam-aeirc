import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Radio
} from 'antd';

import { updateEmployeeData, updateEmployeeDataSalary } from 'apis/employee';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { CustomizedButtonGroup } from 'styles/profileInformation';
import { Colors } from 'utils/colors';
import AllowanceAPI from 'apis/allowance';
import { Allowance } from 'constants/schemas/allowance';
import dayjs from 'dayjs';
interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  id: any;
  data: any;
}

export const SalaryInformationEdit = (props: Props) => {
  const { id, isModalOpen, handleCancel, data } = props;
  const [form] = Form.useForm();
  const basicSalary = Form.useWatch('basic_salary', form);
  const allowance = Form.useWatch('allowance', form);

  const queryClient = useQueryClient();

  const allowanceAPI = new AllowanceAPI();

  const queryList = useQuery(['allowanceList'], async () => {
    const response = await allowanceAPI.list();
    return response?.data?.data;
  });

  const allowanceList = queryList?.data;

  const extra_allowance: any = [];
  data?.additionalAllowanceBonus?.map((data: any) => {
    extra_allowance.push(data?.id);
  });

  const salaryInformationMutation = useMutation((data: any) =>
    updateEmployeeDataSalary(id, data)
  );
  const onFinish = (data: any) => {
    const newData = {
      ...data,
      appliedDate: data?.appliedDate?.format('YYYY-MM-DD'),
      basicSalary: parseInt(data?.basic_salary),
      allowance: parseInt(data?.allowance),
      allowanceIds: data.extra_allowance
    };
    salaryInformationMutation.mutate(newData, {
      onSuccess: () => {
        queryClient.invalidateQueries(['employeeBasicInfo']);
        queryClient.invalidateQueries([`employeeBasicInfo-${id}`]);
        handleCancel();
        message.success('Salary Information Updated Successfully');
      },
      onError: (data: any) => {
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage);
      }
    });
  };

  return (
    <Modal
      title="Edit Salary"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      className="modal-content-responsive"
    >
      <Form
        name="salary"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <Form.Item
          label="Applied From"
          name="appliedFrom"
          initialValue={dayjs()}
          rules={[{ required: true, message: 'Please select applied date!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Basic Salary"
          name="basic_salary"
          initialValue={data?.monthly_salary ? data?.monthly_salary / 2 : 0}
          rules={[{ required: true, message: 'Please enter basic salary!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Allowance"
          name="allowance"
          initialValue={data?.monthly_salary ? data?.monthly_salary / 2 : 0}
          rules={[{ required: true, message: 'Please enter allowance!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <TotalSalaryView>
            Total Salary :{' '}
            {parseInt(basicSalary || 0) + parseInt(allowance || 0)}
          </TotalSalaryView>
        </Form.Item>

        <Line />

        <Form.Item
          label="Extra Allowance"
          name="extra_allowance"
          initialValue={extra_allowance}
        >
          <Checkbox.Group>
            {allowanceList?.map((data: Allowance) => (
              <>
                <Checkbox key={data?.id} value={data?.id}>
                  {data?.name}
                </Checkbox>
              </>
            ))}
          </Checkbox.Group>
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

const TotalSalaryView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 6px 14px;
  float: right;
  gap: 4px;
  background: rgba(255, 112, 0, 0.1);
  border: 1px dashed #ff7000;
  border-radius: 2px;
`;

const Line = styled.hr`
  border: none;
  border-top: 1px solid #f0f0f0;
  margin: 10px;
  height: 1px;
`;
