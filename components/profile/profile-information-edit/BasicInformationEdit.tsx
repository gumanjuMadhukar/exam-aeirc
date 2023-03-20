import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Select
} from 'antd';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Colors } from 'utils/colors';
import { updateEmployeeData, updateSelfData } from 'apis/employee';
import styled from 'styled-components';
import { officeEmailValidation } from 'utils';
import DesignationAPI from 'apis/designation';
import NationalityAPI from 'apis/nationality';

import dayjs from 'dayjs';
import { isAdmin } from 'utils/roles';
import { EmployeeDetails } from 'constants/schemas/employee';
import { useEffect, useState } from 'react';
interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  id?: string | number | null;
  data: EmployeeDetails;
}

export const gender = {
  male: 'MALE',
  female: 'FEMALE',
  other: 'OTHER'
};
export const BasicInformationEdit = (props: Props) => {
  const { id, isModalOpen, handleCancel, data } = props;
  const queryClient = useQueryClient();
  const designationAPI = new DesignationAPI();
  const nationalityAPI = new NationalityAPI();

  const designationListQuery = useQuery('designation-list', () =>
    designationAPI.list().then((res: any) => res.data)
  );
  const designationList = designationListQuery?.data?.data;

  const nationalityListQuery = useQuery('nationality-list', () =>
    nationalityAPI.list().then((res: any) => res.data)
  );

  const nationalityList = nationalityListQuery?.data?.data;

  const name = data?.name;
  const nameParts = name?.split(' ');

  let firstName, middleName, lastName;
  if (nameParts) {
    firstName = !!nameParts[0] ? nameParts[0] : '';
    middleName = nameParts?.length === 3 ? nameParts[1] : '';
    lastName = nameParts?.length === 3 ? nameParts[2] : nameParts[1];
  }

  const basicInformationMutation = useMutation((data: any) =>
    id ? updateEmployeeData(id, data) : updateSelfData(data)
  );
  const onFinish = (data: any) => {
    const newData = {
      ...data,
      ...(isAdmin() && {
        joined_date: data?.joined_date?.format('YYYY-MM-DD')
      }),
      name: data?.first_name + ' ' + data?.middle_name + ' ' + data?.last_name,
      ...(isAdmin() && {
        designationId: data?.designation
      }),
      nationalityId: data?.nationality
    };

    if (!isAdmin()) {
      delete newData['joined_date'];
    }
    basicInformationMutation.mutate(newData, {
      onSuccess: () => {
        queryClient.invalidateQueries(['employeeBasicInfo']);
        queryClient.invalidateQueries([`employeeBasicInfo-${id}`]);
        handleCancel();
        message.success('Basic Information Updated Successfully');
      },
      onError: (data: any) => {
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage);
      }
    });
  };
  return (
    <Modal
      title="Edit Basic Information"
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
          <Col lg={8} xs={24} md={8}>
            <Form.Item
              label=" First Name"
              name="first_name"
              initialValue={firstName}
              rules={[{ required: true, message: 'Please enter first name!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col lg={7} xs={24} md={7}>
            <Form.Item
              label="Middle Name"
              name="middle_name"
              initialValue={middleName}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col lg={8} xs={24} md={8}>
            <Form.Item
              label="Last Name"
              name="last_name"
              initialValue={lastName}
              rules={[{ required: true, message: 'Please enter Last name!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row style={{ justifyContent: 'space-between' }}>
          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Gender"
              name="gender"
              initialValue={data?.gender}
              rules={[{ required: true, message: 'Please choose gender!' }]}
            >
              <Radio.Group>
                <Radio value={gender.male}>Male</Radio>
                <Radio value={gender.female}>Female</Radio>
                <Radio value={gender.other}>Other</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Nationality"
              name="nationality"
              initialValue={data?.nationality?.id}
              rules={[
                { required: true, message: 'Please select nationality!' }
              ]}
            >
              <Select placeholder="Select Nationality">
                {nationalityList?.map((nationality: any) => (
                  <Select.Option key={nationality.id} value={nationality.id}>
                    {nationality?.nationality}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Date of Hiring"
              name="joined_date"
              initialValue={data?.joined_date ? dayjs(data?.joined_date) : ''}
              rules={[
                {
                  required: !isAdmin() ? false : true,
                  message: 'Please select hiring date!'
                }
              ]}
            >
              <DatePicker style={{ width: '100%' }} disabled={!isAdmin()} />
            </Form.Item>
          </Col>
          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Designation"
              name="designation"
              initialValue={data?.designation?.id}
              rules={[
                {
                  required: !isAdmin() ? false : true,
                  message: 'Please select designation!'
                }
              ]}
            >
              <Select placeholder="Select Designation" disabled={!isAdmin()}>
                {designationList?.map((designation: any) => (
                  <Select.Option key={designation.id} value={designation.id}>
                    {designation.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Username"
              name="username"
              initialValue={data?.user?.username}
              rules={[{ required: true, message: 'Please enter username!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Email"
              name="email"
              initialValue={data?.user?.email}
              rules={[
                { required: true, message: 'Please enter email!' },
                {
                  message: 'Provide office email.',
                  validator: officeEmailValidation
                }
              ]}
            >
              <Input disabled={!isAdmin()} />
            </Form.Item>
          </Col>
          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Phone"
              name="phone_number"
              initialValue={data?.phone_number}
              rules={[
                { required: true, message: 'Please enter phone number!' }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Address"
              name="address"
              initialValue={data?.address}
              rules={[{ required: true, message: 'Please enter address!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24}>
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
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

const CustomizedButtonGroup = styled.div`
  float: right;
  margin-top: 10px;
  right: 0;
`;
