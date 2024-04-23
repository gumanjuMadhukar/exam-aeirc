import { Button, Form, Modal, Select, Space } from "antd";
import { getLoginDetail } from "apis/student";
import PrintLoginDetail from "components/print/login-detail";
import PrintSeatPlan from "components/print/seat-plan";
import React, { useState } from "react";
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
const DefaultFilterParams ={
  shift_id:""
}
const StudentDataPrintModal = ({ isModalOpen, handleCancel }: Props) => {
  const [form] = Form.useForm();

  const studentListRef = React.useRef<HTMLDivElement | null>(null);
  const seatPlanRef = React.useRef<HTMLDivElement | null>(null);
  const [printData, setPrintData] = useState<any>();
  const [loginData, setLoginData] =useState(false);
  const [shiftId, setShiftId] = useState<string>("");
  const selectShiftOption = [
    { value: "1", label: "Morning" },
    { value: "2", label: "Day" },
    { value: "3", label: "Eenning" },
  ];
  const handleShiftChange = (value: any) => {
    setShiftId(value);
  };
  const [filterParams, setFilterParams] = useState<FilterParams>(DefaultFilterParams);
  const { data: LoginDetail } = useQuery(
    ["LoginDetail", { filterParams }],
    getLoginDetail
    // ,{enabled:loginData}
  );
 console.log(LoginDetail, "det")
  const loginDataExample = [
    {
      id: 1,
      name: "test test1",
      symbol_number: "A001",
      password: "JEB3O6M4",
      start_time: "07:04:00",
      date: "2024-04-24",
      seat_number: "L1C1",
    },
    {
      id: 2,
      name: "test test2",
      symbol_number: "A002",
      password: "JEB3O6M4",
      start_time: "07:04:00",
      date: "2024-04-24",
      seat_number: "L1C2",
    },
    {
      id: 3,
      name: "test test3",
      symbol_number: "A003",
      password: "JEB3O6M4",
      start_time: "07:04:00",
      date: "2024-04-24",
      seat_number: "L1C3",
    },
    {
      id: 4,
      name: "test test4",
      symbol_number: "A003",
      password: "JEB3O6M4",
      start_time: "07:04:00",
      date: "2024-04-24",
      seat_number: "L1C4",
    },
  ];
  // const loginDetail = exampleData;
  // const handleSubmit = () => {
  //   let detailData = {
  //     shift_id:shift_id,
  //     printOption:printOption,
  //     data:loginDetail
  //   }
  //  handlePrint(detailData);
  // };
  // const handleSubmit = async (e: any) => {
  //   e.preventDefault;
  //   try {
  //     let detailData;
  //     if (printOption === "first") {
  //       detailData = await getLoginDetail({ queryKey: ["LoginDetail", { filterParams: { shift_id: shift_id } }] });
  //     } else if (printOption === "second") {
  //       // detailData = await getOtherDetail({ queryKey: ["OtherDetail", { filterParams: { shift_id: shiftId } }] });
  //     }
  //     handlePrint({ shift_id: shift_id, printOption, data: detailData });
  //   } catch (error) {
  //     console.error("Error fetching detail:", error);
  //   }
  // };

  const handlePrint = (printOption: any) => {
    // const {starting_symbol_no,ending_symbol_no, exam_date, exam_time} = data;
    const pdata = LoginDetail?.data
    console.log(pdata);
    setPrintData(pdata);
    if (shiftId !== "") {
      printOption == "login_detail"
        ? handleStudentListPrint()
        : printOption == "seat_plan"
        ? handleSeatPlanPrint()
        : null;
      setLoginData(false);
    }else{
      return;
    }
  };
  // useEffect(() => {
  //   printOption === "login_detail"
  //     ? handleStudentListPrint()
  //     : printOption === "seat_plan"
  //     ? handleSeatPlanPrint()
  //     : null;
  //   // printOption === 'login_detail' ? handleStudentListPrint : printOption ==='seat_plan' ? handleSeatPlanPrint: '';
  // }, [printOption]);
  const handleStudentDataPrint = () => {
    let printOption = "login_detail";
    setFilterParams((prevState) => ({
      ...prevState,
      shift_id: shiftId,
    }));
    handlePrint(printOption);
    setLoginData(true);
  };
  const handleSeatPlanDataPrint = () => {
    let printOption = "seat_plan";
    handlePrint(printOption);
    setLoginData(true);
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
  const handleSeatPlanPrint = useReactToPrint({
    content: () => seatPlanRef.current,
    documentTitle: "SeatPlan",
    pageStyle: `
    @page {
      size: portrait;
    }
  `,
  });
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
        <Form.Item>
          <Space>
            <Button
              type="primary"
              // onClick={() => setPrintOption("login_detail")}
              onClick={handleStudentDataPrint}
              htmlType="submit"
            >
              Print Student List
            </Button>
            <Button
              type="primary"
              // onClick={() => setPrintOption("seat_plan")}
              onClick={handleSeatPlanDataPrint}
              htmlType="submit"
            >
              Print Seat Plan
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <PrintLoginDetail ref={studentListRef} data={printData} />
      <PrintSeatPlan ref={seatPlanRef} data={printData} />
    </Modal>
  );
};

export default StudentDataPrintModal;
