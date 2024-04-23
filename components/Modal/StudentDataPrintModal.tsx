import { Button, Form, Modal, Select, Space } from "antd";
import { getLoginDetail } from "apis/student";
import PrintLoginDetail from "components/print/login-detail";
import PrintSeatPlan from "components/print/seat-plan";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useReactToPrint } from "react-to-print";

interface Props {
  isModalOpen: boolean;
  handleCancel: () => void;
  handlePrint?: any;
}
interface FilterParams {
  shift_id: string | number;
}
const DefaultFilterParams = {
  shift_id: "",
};
const StudentDataPrintModal = ({ isModalOpen, handleCancel }: Props) => {
  const [form] = Form.useForm();

  const studentListRef = React.useRef<HTMLDivElement | null>(null);
  const seatPlanRef = React.useRef<HTMLDivElement | null>(null);
  const [printData, setPrintData] = useState<any>();
  const [shiftId, setShiftId] = useState<string>("");
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectShiftOption = [
    { value: "1", label: "Morning" },
    { value: "2", label: "Day" },
    { value: "3", label: "Eenning" },
  ];
  const handleShiftChange = (value: any) => {
    setShiftId(value);
    // console.log(value)
    // if(value ==""){
    //   setIsOpen(false)
    // }
    // else{
    //   setIsOpen(true)
    // }
  };
  const [filterParams, setFilterParams] =
    useState<FilterParams>(DefaultFilterParams);

  const handleLoginDetailPrint = () => {
    printData?.data.length !=0 && handleStudentListPrint();
  };
  const handleSeatPlanDetailPrint = () => {
    printData?.data.length !=0 && handleSeatPlanListPrint();
  };
  const handleStudentListPrint = useReactToPrint({
    content: () => studentListRef.current,
    documentTitle: "LoginDetail",
    pageStyle: `
    @page {
      size: portrait;
    }
  `,
  });
  const handleSeatPlanListPrint = useReactToPrint({
    content: () => seatPlanRef.current,
    documentTitle: "SeatPlan",
    pageStyle: `
    @page {
      size: portrait;
    }
  `,
  });

  const { data: LoginDetail } = useQuery(
    ["LoginDetail", { filterParams }],
    getLoginDetail
    // ,{enabled:loginData}
  );
  useEffect(() => {
    setPrintData(LoginDetail);
  }, [LoginDetail]);
  useEffect(() => {
    setFilterParams((prevState) => ({
      ...prevState,
      shift_id: shiftId,
    }));
  }, [shiftId]);

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
        {/* {isOpen && ( */}
          <Form.Item>
            <Space>
              <Button
                type="primary"
                // onClick={() => setPrintOption("login_detail")}
                onClick={handleLoginDetailPrint}
              >
                Print Student List
              </Button>
              <Button
                type="primary"
                // onClick={() => setPrintOption("seat_plan")}
                onClick={handleSeatPlanDetailPrint}
              >
                Print Seat Plan
              </Button>
            </Space>
          </Form.Item>
        {/* )} */}
      </Form>
      <PrintLoginDetail ref={studentListRef} data={printData} />
      <PrintSeatPlan ref={seatPlanRef} data={printData} />
    </Modal>
  );
};

export default StudentDataPrintModal;
