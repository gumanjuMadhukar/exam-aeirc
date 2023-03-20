import { Col, Modal, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';
import { Colors } from 'utils/colors';
import {
  FirstHalf,
  FullDay,
  Holiday,
  Leave,
  SecondHalf,
  Weekend,
  WorkingDay,
  WorkOnHoliday
} from 'utils/icon';

const datas = [
  {
    icon: <FullDay />,
    name: 'Working Day : Present'
  },
  {
    icon: <WorkOnHoliday />,
    name: 'Worked on Holiday'
  },
  {
    icon: <Leave />,
    name: 'On leave'
  },
  {
    icon: <Holiday />,
    name: 'Holiday'
  },
  {
    icon: <FirstHalf />,
    name: '1st Half Leave'
  },
  {
    icon: <SecondHalf />,
    name: '2nd Half Leave'
  },
  {
    icon: <Weekend />,
    name: 'Weekend'
  },
  {
    icon: 'WD',
    name: 'Working Days'
  },
  {
    icon: <WorkingDay />,
    name: 'Working Day'
  }
];

const columns: ColumnsType<any> = [
  {
    title: 'Icon',
    dataIndex: 'icon',
    key: 'icon',
    render: text => <p className="flex justify-center">{text}</p>
  },
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a style={{ color: Colors.GREY8 }}>{text}</a>
  }
];

const ViewLegends = () => {
  const data = datas.map((data: any) => ({
    icon: data.icon,
    name: data.name
  }));
  return (
    <StyledTable
      columns={columns}
      dataSource={data}
      pagination={false}
      showHeader={false}
      className="m-0"
      bordered={false}
    />
  );
};

export default ViewLegends;

const StyledTable = styled(Table)`
  &.ant-table-wrapper .ant-table-thead > tr > th,
  &.ant-table-wrapper .ant-table-tbody > tr > td {
    padding: 0px !important;
  }
  &.ant-modal-body {
    padding-left: 15px !important;
  }
  tr {
    margin-top: 12px !important;
    th {
      color: ${Colors.GREY8} !important;
      font-size: 12px;
    }
    td {
      border: 0px !important;
      p {
        color: ${Colors.GREY8} !important;
        font-size: 12px;
        padding: 8px 0px;
      }

      &:last-child {
        font-weight: 600;
      }
    }
  }
`;
