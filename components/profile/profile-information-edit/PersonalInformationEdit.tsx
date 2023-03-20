import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select
} from 'antd';
import { updateEmployeeData, updateSelfData } from 'apis/employee';
import { EmployeeDetails } from 'constants/schemas/employee';
import dayjs from 'dayjs';
import { useMutation, useQueryClient } from 'react-query';
import { CustomizedButtonGroup } from 'styles/profileInformation';
import { isNumeric } from 'utils';
import { Colors } from 'utils/colors';

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  id: any;
  data: EmployeeDetails;
}

export const PersonalInformationEdit = (props: Props) => {
  const queryClient = useQueryClient();
  const { id, isModalOpen, handleCancel, data } = props;

  const basicInformationMutation = useMutation((data: any) =>
    id ? updateEmployeeData(id, data) : updateSelfData(data)
  );
  const onFinish = (data: any) => {
    const newData = {
      ...data,
      dob: data?.dob?.format('YYYY-MM-DD'),
      cit_number: parseInt(data?.cit_number)
    };
    basicInformationMutation.mutate(newData, {
      onSuccess: () => {
        handleCancel();
        queryClient.invalidateQueries(['employeeBasicInfo']);
        queryClient.invalidateQueries([`employeeBasicInfo-${id}`]);
        message.success('Personal Information Updated Successfully');
      },
      onError: (data: any) => {
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage);
      }
    });
  };

  const options = [
    {
      value: false,
      label: 'Single'
    },
    {
      value: true,
      label: 'Married'
    }
  ];
  return (
    <Modal
      title="Edit Personal Information"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={'50vw'}
      className="modal-content-responsive"
    >
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Row style={{ justifyContent: 'space-between' }}>
          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Citizenship No."
              name="citizenship_number"
              initialValue={data?.citizenship_number}
              rules={[
                { required: true, message: 'Please enter citizenship no.!' }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="CIT No."
              name="cit_number"
              initialValue={data?.cit_number}
              rules={[
                { required: true, message: 'Please enter cit no.!' },
                { validator: isNumeric }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Date of Birth"
              name="dob"
              initialValue={data?.dob ? dayjs(data?.dob) : ''}
              rules={[{ required: true, message: 'Please select birth date!' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Marital Status"
              name="marital_status"
              initialValue={data?.marital_status ? true : false}
              rules={[
                { required: true, message: 'Please choose marital status!' }
              ]}
            >
              <Select options={options}></Select>
            </Form.Item>
          </Col>
          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Father Name"
              name="fathers_name"
              initialValue={data?.fathers_name}
              rules={[{ required: true, message: 'Please enter father name' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Mother Name"
              name="mothers_name"
              initialValue={data?.mothers_name}
              rules={[{ required: true, message: 'Please enter mother name' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Permanent Address"
              name="permanent_address"
              initialValue={data?.permanent_address}
              rules={[
                { required: true, message: 'Please enter permanent address' }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Emergency Contact"
              name="emergency_contact"
              initialValue={data?.emergency_contact}
              rules={[
                { required: true, message: 'Please enter emergency contact' },
                {
                  min: 7,
                  message: 'Emergency contact must be at least 7 characters'
                },
                {
                  max: 13,
                  message:
                    'Emergency contact must not be greater than 13 characters'
                },
                { validator: isNumeric }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
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
