import { Button, DatePicker, Form, Input, message, Modal } from 'antd';
import {
  updateEmployeeData,
  updateEmployeeInsuranceSecurity
} from 'apis/employee';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CustomizedButtonGroup } from 'styles/profileInformation';
import { isNumeric } from 'utils';
import { Colors } from 'utils/colors';
import InsuranceAPI from 'apis/insurance';
import { InsuranceDataEmployee } from 'constants/schemas/employee';
import { Insurance } from 'constants/schemas/insurance';
import dayjs from 'dayjs';

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  id: any;
  data: any;
}

interface InsuranceProps {
  annualAmount: string;
}

export const InsuranceInformationEdit = (props: Props) => {
  const { id, isModalOpen, handleCancel, data } = props;
  const queryClient = useQueryClient();

  const insuranceAPI = new InsuranceAPI();

  const queryList = useQuery(['insuranceList'], async () => {
    const response = await insuranceAPI.list();
    return response?.data?.data;
  });

  const insuranceList = queryList?.data;

  const basicInformationMutation = useMutation((data: any) =>
    updateEmployeeInsuranceSecurity(id, data)
  );

  const onFinish = (data: any) => {
    const { insuranceLists } = data;
    const insuranceListData: InsuranceDataEmployee[] = [];

    Object?.entries(insuranceLists).map(([key, value]) => {
      const { annualAmount } = value as InsuranceProps;
      if (!!annualAmount) {
        insuranceList.map((data: any) => {
          if (data?.id === key) {
            data.annualAmount = annualAmount;
            insuranceListData.push(data);
          }
        });
      }
    });

    const newData = {
      ...data,
      appliedDate: data?.appliedDate?.format('YYYY-MM-DD'),
      insuranceList: insuranceListData
    };
    basicInformationMutation.mutate(newData, {
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
      title="Edit Insurance & Security"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      className="modal-content-responsive"
    >
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
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
          label="CIT Amount (monthly)"
          name="citAmount"
          initialValue={data?.cit}
          rules={[{ validator: isNumeric }]}
        >
          <Input />
        </Form.Item>

        {insuranceList?.map((insuranceDataList: Insurance) => (
          <>
            <Form.Item
              label={insuranceDataList?.name + ' insurance'}
              key={insuranceDataList?.id}
              name={['insuranceLists', insuranceDataList.id, 'annualAmount']}
              initialValue={
                data?.insurance?.find(
                  (salaryData: InsuranceDataEmployee) =>
                    salaryData?.id === insuranceDataList.id
                )?.annual_total
              }
            >
              <Input />
            </Form.Item>
          </>
        ))}

        <Form.Item>
          <CustomizedButtonGroup>
            <Button onClick={handleCancel} size="large">
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
