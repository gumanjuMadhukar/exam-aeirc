import styled from 'styled-components';
import {
  Input,
  Select,
  Col,
  Modal,
  Form,
  Space,
  Button,
  Row,
  Table,
  DatePicker,
  message
} from 'antd';
import { useState } from 'react';
import { PlusOutlined, CalendarOutlined } from '@ant-design/icons';
import HolidayApi from 'apis/holiday';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import type { ColumnsType } from 'antd/es/table';
import CustomDropdown from './custom-dropdown';
import { Colors } from 'utils/colors';
import { InferGetServerSidePropsType } from 'next';
import { Roles } from 'utils/enums';
import { DateFormatYMD } from 'utils/DateFormat';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import PageHeader from 'components/layout/page-header';
import { useRouter } from 'next/router';

dayjs.extend(utc);

const HeaderItems = [
  {
    name: 'Holiday',
    link: '/holiday'
  }
];

function Holiday({
  role
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const holidayApi = new HolidayApi();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [year, setYear] = useState();
  const [open, setOpen] = useState(false);

  const saveMutation = useMutation((data: any) => holidayApi.store(data));
  const updateMutation = useMutation((data: any) => {
    const { id, record } = data;
    return holidayApi.patch(id, record);
  });

  const queryList = useQuery(
    [
      'holidayList',
      {
        year
      }
    ],
    async () => {
      const queryParams: any = {
        year
      };
      if (year) queryParams.year = year;
      const response = await holidayApi.list(queryParams);
      return response?.data?.data;
    }
  );
  const [form] = Form.useForm();
  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const config = {
    rules: [
      {
        type: 'object' as const,
        required: true,
        message: 'Please select a date!'
      }
    ]
  };

  const handleChange = (value: any) => {
    setYear(value);
  };

  const onFinish = (data: HolidayListDataType) => {
    data['date'] = dayjs(data?.date).format('YYYY-MM-DD') + 'T00:00:00.000Z';

    saveMutation.mutate(data, {
      onSuccess: (data: any) => {
        hideModal();
        queryClient.invalidateQueries('holidayList');
        message.success('Holiday created successfully');
      },
      onError: (data: any) => {
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage);
      }
    });
  };

  const update = async (record: any, id: any) => {
    const data = {
      id,
      record
    };
    updateMutation.mutate(data, {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries('holidayList');
        message.success('Holiday updated successfully');
      },
      onError: (data: any) => {
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage);
      }
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: text => <span> {DateFormatYMD(text)}</span>
    },
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day'
    },
    ...(role === Roles.ADMIN || role === Roles.SUPERADMIN
      ? [
          {
            title: '',
            key: 'action',
            render: (_: any, record: any) => (
              <Space size="middle">
                <CustomDropdown record={record} update={update} />
              </Space>
            )
          }
        ]
      : [])
  ];

  const navigateToCalender = () => {
    router.push('/holiday/calendar');
  };

  const options = [
    { value: new Date().getFullYear(), text: new Date().getFullYear() },
    { value: '2022', text: '2022' },
    { value: '2023', text: '2023' }
  ];

  const { data } = queryList;

  return (
    <LeaveContainer>
      <Modal
        destroyOnClose
        title="Add Holiday"
        open={open}
        onOk={form.submit}
        onCancel={hideModal}
        okText="Add"
        maskClosable={false}
        cancelText="Cancel"
      >
        <Form
          form={form}
          preserve={false}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Please enter the holiday name!' }
            ]}
            label="Holiday Name"
          >
            <Input />
          </Form.Item>
          <Form.Item label="Select Date" name="date" {...config}>
            <DatePicker style={{ width: '465px' }} />
          </Form.Item>
        </Form>
      </Modal>
      <PageHeader
        items={HeaderItems}
        titleContent="Holiday"
        icon={<PlusOutlined style={{ color: Colors.WHITE }} />}
        buttonLabel="Add Holiday"
        buttonCb={showModal}
        secondButtonLabel="View on Calendar"
        secondButtonCb={navigateToCalender}
        secondButtonIcon={<CalendarOutlined style={{ color: Colors.WHITE }} />}
        buttonRoleConstraint={true}
        role={role}
      />
      <TableBodyContainer>
        <SearchBar>
          <SearchBarContent>
            <Row gutter={16}>
              <Col>
                {' '}
                <Space>
                  <Select
                    defaultValue={options[0]}
                    onChange={handleChange}
                    style={{ width: 120 }}
                    options={options.map((option, index) => ({
                      label: option.text,
                      value: option.value
                    }))}
                  />
                </Space>
              </Col>
            </Row>
          </SearchBarContent>
        </SearchBar>
        <TableLayout>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: 500 }}
            pagination={
              data?.length > 10 && {
                defaultPageSize: 1,
                total: data?.length,
                hideOnSinglePage: true,
                showSizeChanger: true,
                className: 'bg-white-halfrem',
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`,
                responsive: true
              }
            }
          />
        </TableLayout>
      </TableBodyContainer>
    </LeaveContainer>
  );
}

export default Holiday;

// This gets called on every request
export async function getServerSideProps(context: any) {
  let role = context?.req?.cookies['role'];

  // Pass data to the page via props
  return { props: { role } };
}

interface DataType {
  key: string;
  name: string;
  date: string;
}

const SearchButton = styled(Button)`
  background-color: ${Colors.SECONDARY};
  color: ${Colors.WHITE};
  border-radius: 0px;
  box-shadow: none;
  border: 0;
  &:hover {
    background-color: ${Colors.SECONDARY} !important;
    border: 0 !important;
    color: ${Colors.WHITE} !important;
  }
`;

const LeaveContainer = styled.div``;
const TableBodyContainer = styled.div`
  padding: 24px;
`;
const SearchBar = styled.div`
  background: #fff;
  height: 64px;
  @media (max-width: 480px) {
    overflow-wrap: anywhere;
  }
`;
const SearchBarContent = styled.div`
  padding: 16px;
  float: right;
`;

const TableLayout = styled.div`
  padding-top: 30px;
`;
