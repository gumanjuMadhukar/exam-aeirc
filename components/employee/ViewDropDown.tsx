import { Button, Dropdown, Menu, MenuProps } from 'antd';
import {
  EyeOutlined,
  DeleteOutlined,
  MoreOutlined,
  EllipsisOutlined
} from '@ant-design/icons';
import { NextRouter } from 'next/router';

interface IProps {
  record: {
    id: number;
  };
  router: NextRouter;
}

const ViewDropDown = ({ record, router }: IProps) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div onClick={() => router.push(`employee/${record?.id}`)}>
          <EyeOutlined />
          {' Edit'}
        </div>
      )
    },
    {
      key: '2',
      label: (
        <div>
          <DeleteOutlined />
          {' Deactivate'}
        </div>
      )
    }
  ];

  return (
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <EllipsisOutlined className="rotate-90" />
    </Dropdown>
  );
};
export default ViewDropDown;
