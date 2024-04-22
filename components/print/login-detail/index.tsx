import React, { forwardRef } from "react";
import { PrintTableLayout } from "styles/styled/PrintLayout";
type Props = {
  data?: any;
};
const PrintLoginDetail = forwardRef<HTMLDivElement, Props>(
  (props: Props, ref) => {
    const { data } = props;
    console.log(data, "sgdh");

    // const names = Array.from(
    //   { length: 300 },
    //   (_, index) => `Name ${index + 1}`
    // );

    return (
      <div style={{ display: "none" }} className="print-document">
        <div ref={ref}>
          <PrintTableLayout>
            <div className="header">
              <span>
                Date: {data?.exam_date} || Time: {data?.exam_time}
              </span>
            </div>
            {/* {names.map((index) => (
              <table style={{ pageBreakAfter: "always" }}>
              <tr>
                <th>Name</th>
                <th>Password</th>
                <th>Computer No (Seat No)</th>
              </tr>
              <tr>
                <th>SAKDAS</th>
                <th>NBAJKDA</th>
                <th>BNFKJCNA</th>
              </tr>
            </table> 
            ))} */}
            <table>
              <tbody>
                <tr>
                  <th>Symbol No.</th>
                  <th>Name</th>
                  <th>Password</th>
                  <th>Computer No (Seat No)</th>
                </tr>
                <tr>
                  <th>SAKDAS</th>
                  <th>SAKDAS</th>
                  <th>NBAJKDA</th>
                  <th>BNFKJCNA</th>
                </tr>
              </tbody>
            </table>
          </PrintTableLayout>
        </div>
      </div>
    );
  }
);

PrintLoginDetail.displayName = "LoginDetail";

export default PrintLoginDetail;
