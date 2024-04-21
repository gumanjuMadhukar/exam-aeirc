import { Button, Form, Input, Modal, Space } from "antd";
import React, { useState } from "react";

interface Props {
  isModalOpen: boolean;
  handleCancel:() => void;
  handlePrint : any;
}

const StudentDataPrintModal = ({ isModalOpen, handlePrint, handleCancel }: Props) => {
  const [form] = Form.useForm();
  const [printOption, setPrintOption] = useState('')
  const handleSubmit =(data:any) => {
    data ? handlePrint(data, printOption): "";
  }

  return (
    <Modal
      title=""
      open={isModalOpen}
      footer={null}
      //   onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        layout="vertical"
        name="validateOnly"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item name="starting_symbol_no" label="Start Symbol No" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="ending_symbol_no" label="End Symbol No" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="exam_date" label="Exam Date" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="exam_time" label="Exam Time" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" onClick={() => setPrintOption('login_detail')} htmlType="submit">
              Print Student List
            </Button>
            <Button type="primary" onClick={() => setPrintOption('seat_plan')} htmlType="submit">
              Print Seat Plan
            </Button>
            <Button htmlType="button" onClick={()=> form.resetFields()}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StudentDataPrintModal;
