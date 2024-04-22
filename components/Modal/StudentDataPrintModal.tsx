import { Button, Form, Modal, Select, Space } from "antd";
import { getLoginDetail } from "apis/student";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface Props {
  isModalOpen: boolean;
  handleCancel: () => void;
  handlePrint: any;
}
interface FilterParams {
  shift_id: string | number;
}
const StudentDataPrintModal = ({
  isModalOpen,
  handlePrint,
  handleCancel,
}: Props) => {
  const [form] = Form.useForm();
  const [printOption, setPrintOption] = useState("");
  const [shift_id, setShiftId] = useState<string>("");
  
  const selectShiftOption = [
    { value: "1", label: "Morning" },
    { value: "2", label: "Day" },
    { value: "3", label: "Eenning" },
  ];
  const [filterParams, setFilterParams] = useState<FilterParams>({ shift_id });
  const { data: LoginDetail } = useQuery(
    ["LoginDetail", { filterParams }],
    getLoginDetail
  );

  console.log(LoginDetail, "getStudentLogin");
  const handleShiftChange = (value: any) => {
    setShiftId(value);
  };
  useEffect(() => {
    setFilterParams((prevState) => ({
      ...prevState,
      shift_id: shift_id,
    }));
  }, [shift_id]);

  const exampleData = [
    { id: 1, name: "test test1", date_of_birth: "test", symbol_number: "A001" },
    { id: 1, name: "test test1", date_of_birth: "test", symbol_number: "A001" },
    { id: 1, name: "test test1", date_of_birth: "test", symbol_number: "A001" },
  ];
  const loginDetail = exampleData;
  const handleSubmit = () => {
    let detailData = {
      shift_id:shift_id,
      printOption:printOption,
      data:loginDetail
    }
   handlePrint(detailData);
  };
  return (
    <Modal
      title=""
      open={isModalOpen}
      footer={null}
      //   onOk={handleOk}
      onCancel={handleCancel}
      width={400}
    >
      <Form
        form={form}
        layout="horizontal"
        name="validateOnly"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="shift_id"
          label="Shift Id"
          rules={[{ required: true }]}
        >
          <Select
            defaultValue=""
            style={{ width: 120 }}
            allowClear
            options={selectShiftOption}
            onChange={handleShiftChange}
            placeholder="Select Shift"
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              type="primary"
              onClick={() => setPrintOption("login_detail")}
              htmlType="submit"
            >
              Print Student List
            </Button>
            <Button
              type="primary"
              onClick={() => setPrintOption("seat_plan")}
              htmlType="submit"
            >
              Print Seat Plan
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StudentDataPrintModal;
