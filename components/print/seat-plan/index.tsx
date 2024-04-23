import React, { forwardRef } from "react";
import { PrintTableLayout } from "styles/styled/PrintLayout";

type Props = {
  data?: any;
};

const PrintSeatPlan = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  const { data } = props;
  return (
    <div style={{ display: "none" }} className="print-document">
      <div ref={ref}>
        <PrintTableLayout>
          <div className="header">
            <span>
              Date: {data?.shift_date} || Time: {data?.shift_time}
            </span>
          </div>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Roll No.</th>
                <th>Computer No (Seat No)</th>
              </tr>
              {data?.map((datas:any) => (
              <tr style={{textAlign:'center'}}>
                <td>{datas?.name}</td>
                <td>{datas?.symbol_number}</td>
                <td>{datas?.seat_number}</td>
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
