import React, { forwardRef } from 'react'
import { PrintTableLayout } from 'styles/styled/PrintLayout';

type Props = {
    data?: any;
  };

  const PrintSeatPlan = forwardRef<HTMLDivElement, Props>(
    (props: Props, ref) => {
      const { data } = props;
      console.log(data, "sgdh");
      return (
        <div style={{ display: "none" }} className="print-document">
          <div ref={ref}>
            <PrintTableLayout>
              <div className="header">
                <span>
                  Date: {data.exam_date} || Time: {data.exam_time}
                </span>
              </div>
              <table>
                <tr>
                  <th>Name</th>
                  <th>Roll No.</th>
                  <th>Shift Start Time</th>
                  <th>Lab</th>
                </tr>
                <tr>
                  <th>SAKDAS</th>
                  <th>NBAJKDA</th>
                  <th>BNFKJCNA</th>
                </tr>
              </table>
            </PrintTableLayout>
          </div>
        </div>
      );
    }
  );
PrintSeatPlan.displayName = "SeatPlan";
export default PrintSeatPlan