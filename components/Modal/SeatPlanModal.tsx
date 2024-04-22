import { Button, Col, Form, Input, Modal, Row, Select, message } from "antd";
import { postSeatPlan } from "apis/seat-plan";
import { getShift } from "apis/shift";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";

const SeatPlanModalFormLayout = styled.div``;
interface FilterParams {
  currentPage: number;
  pageSize: number;
}

const DefaultFilterParams = {
  currentPage: 1,
  pageSize: 10,
};

const SeatPlanModal = ({ isModalOpen, handleCancel }: ModalProps) => {
  const [form] = Form.useForm();

  // const [filterParams, setFilterParams] = useState<FilterParams>(DefaultFilterParams)
  // const {data : Shift} = useQuery(["Shift", {filterParams}], getShift)
  // console.log(Shift, "Getshift")
  const postSeatPlanContent = useMutation((data: any) => postSeatPlan(data), {
    onSuccess: () => {
      form.resetFields();
      message.success("Shift have been created successfully");
    },
    onError: (data: any) => {
      const errorMessage = data?.response?.data?.message;
      message.error(errorMessage);
    },
  });
  const handleSubmit = (data: any) => {
    console.log(data, "form-data");
    var formData={
        shift_id:data.Shift,
        hall:{
            L1:{
                from:data.from_L1,
                to:data.to_L1
            },
            L2:{
                from:data.from_L2,
                to:data.to_L2
            },
            L3:{
                from:data.from_L3,
                to:data.to_L3
            },
        }
    }
    postSeatPlanContent.mutate(formData);
  };

  const labData = [
    { name: "Lab1",from:"from_L1",to:"to_L1", id: "1" },
    { name: "Lab2",from:"from_L2",to:"to_L2", id: "2" },
    { name: "Lab3",from:"from_L3",to:"to_L3", id: "3" },
  ];
  const selectShiftOption =[
    { value: "1", label: "Morning"},
    { value: "2", label: "Day"},
    { value: "3", label: "Eenning"},
  ]
  return (
    <Modal
      title="Seat Plan"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={"30vw"}
    >
      <SeatPlanModalFormLayout>
        <Form
          form={form}
          layout="vertical"
          name="SeatPlan"
          autoComplete="off"
          onFinish={handleSubmit}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="Shift"
                label="Select Shift"
                rules={[{ required: true }]}
              >
                <Select
                  defaultValue=""
                  style={{ width: 120 }}
                  allowClear
                  options={selectShiftOption}
                />
              </Form.Item>
            </Col>
            <Col>
              {labData.map((item: any) => (
                <Row>
                  <Col span={24}>{item.name}</Col>
                  <Col span={12}>
                    <Form.Item name={item.from}>
                      <Input placeholder="Start Symbol"/>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name={item.to}>
                      <Input placeholder="End Symbol"/>
                    </Form.Item>
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Generate Seat Plan
            </Button>
          </Form.Item>
        </Form>
      </SeatPlanModalFormLayout>
    </Modal>
  );
};

export default SeatPlanModal;
