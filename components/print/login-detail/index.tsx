import React, { forwardRef } from "react";
import { PrintTableLayout } from "styles/styled/PrintLayout";
type Props = {
  data?: any;
};
const PrintLoginDetail = forwardRef<HTMLDivElement, Props>(
  (props: Props, ref) => {
    const { data } = props;
    console.log(data, "hello");
    const DisplayData = data?.map((item:any) => (
      <>
        <div className="header" style={{ pageBreakBefore: "always" }}>
          <span>
            Date: {item.shift_date} || Time: {item.shift_time}
          </span>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Symbol No.</th>
              <th>Name</th>
              <th>Password</th>
              <th>Computer No (Seat No)</th>
            </tr>
            <tr>
              <th>{item.symbol_number}</th>
              <th>{item.name}</th>
              <th>{item.password}</th>
              <th>{item.seat_number}</th>
            </tr>
          </tbody>
        </table>
      </>
    ));
    return (
      <div style={{ display: "none" }} className="print-document">
        <div ref={ref}>
          <PrintTableLayout>
            {DisplayData}
          </PrintTableLayout>
        </div>
      </div>
    );
  }
);

PrintLoginDetail.displayName = "LoginDetail";

export default PrintLoginDetail;
