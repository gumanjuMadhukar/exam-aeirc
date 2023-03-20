import { Tag } from 'antd';

interface Props {
  status: any;
}
const EmployeeStatus = (props: Props) => {
  const { status = 'active' } = props;
  return (
    <>
      {status?.map((status: any) => {
        let color = status === 'active' ? '#1890FF' : '#F5222D';
        return (
          <Tag color={color} key={status}>
            {status.replace(status[0], status[0].toUpperCase())}
          </Tag>
        );
      })}
    </>
  );
};
export default EmployeeStatus;
