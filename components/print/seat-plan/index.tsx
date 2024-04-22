import React, { forwardRef } from "react";
import { PrintTableLayout } from "styles/styled/PrintLayout";

type Props = {
  data?: any;
};

const PrintSeatPlan = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  const { data } = props;
  console.log(data, "shgdh");
  const examDate = data?.exam_date;
  console.log(examDate, "edate");


  return (
    <div style={{ display: "none" }} className="print-document">
      <div ref={ref}>
        <PrintTableLayout>
          <div className="header">
            <span>
              Date: {data?.exam_date} || Time: {data?.exam_time}
            </span>
          </div>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Roll No.</th>
                <th>Shift Start Time</th>
                <th>Lab</th>
              </tr>
              {data?.exampleData?.map((wdata:any) => (
              <tr>
                <th>{wdata?.lab}</th>
                <th>{wdata?.name}</th>
                <th>{wdata?.Roll}</th>
                <th>{wdata?.start_time}</th>
              </tr>
              ))}
            </tbody>
          </table>
        </PrintTableLayout>
      </div>
    </div>
  );
});
PrintSeatPlan.displayName = "SeatPlan";
export default PrintSeatPlan;
