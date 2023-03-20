import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Input, Dropdown, Space, Modal, DatePicker, Form, message } from 'antd';
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { useMutation, useQueryClient } from 'react-query';
import type { MenuProps } from 'antd';
import HolidayApi from 'apis/holiday';
import utc from 'dayjs/plugin/utc';
import ConfirmModal from 'components/ConfirmModal';
import { Colors } from 'utils/colors';

dayjs.extend(utc);

function CustomDropdown(props: any) {
  const queryClient = useQueryClient();
  const deleteHoliday = useMutation((id: any) => holidayApi.destroy(id));
  const [isConfirmHolidayModalOpen, setIsConfirmHolidayModalOpen] =
    useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const holidayApi = new HolidayApi();

  const { record } = props;
  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const openCloseConfirmHolidayModal = () => {
    setIsConfirmHolidayModalOpen(!isConfirmHolidayModalOpen);
  };

  const onConfrimDeleteHoliday = () => {
    deleteHoliday.mutate(record.id, {
      onSuccess: () => {
        queryClient.invalidateQueries('holidayList');
        openCloseConfirmHolidayModal();
      },
      onError: (data: any) => {
        const errorMessage = data?.response?.data?.message;
        message.error(errorMessage);
      }
    });
  };

  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      icon: <EditOutlined />,
      key: '1',
      onClick: () => showModal()
    },
    {
      label: 'Delete',
      icon: <DeleteOutlined />,
      key: '2',
      onClick: () => openCloseConfirmHolidayModal()
    }
  ];

  const onFinish = (data: HolidayListDataType) => {
    data['date'] = dayjs(data?.date).format('YYYY-MM-DD') + 'T00:00:00.000Z';

    props.update(data, record.id);
    hideModal();
  };

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        date: dayjs(record?.date, 'YYYY-MM-DD'),
        name: record?.name
      });
    }
  }, [record]);

  const config = {
    rules: [
      {
        required: true,
        message: 'Please select time!'
      }
    ]
  };

  return (
    <>
      <Modal
        destroyOnClose
        title="Edit Holiday"
        open={open}
        onOk={form.submit}
        onCancel={hideModal}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          form={form}
          preserve={false}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{
            name: record?.name,
            date: dayjs(record?.date, 'YYYY-MM-DD')
          }}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
            label="Name"
          >
            <Input />
          </Form.Item>
          <Form.Item label="Date " name="date" {...config}>
            <DatePicker style={{ width: '465px', backgroundColor: '#fff' }} />
          </Form.Item>
        </Form>
      </Modal>
      <Dropdown menu={{ items }}>
        <a onClick={e => e.preventDefault()}>
          <Space>
            <EllipsisOutlined className="rotate-90" />
          </Space>
        </a>
      </Dropdown>
      <ConfirmModal
        buttonTitle="Confirm"
        openCloseModal={openCloseConfirmHolidayModal}
        open={isConfirmHolidayModalOpen}
        confirmText="delete the holiday"
        onConfirmModal={onConfrimDeleteHoliday}
        icon={<CloseCircleOutlined style={{ color: Colors.DANGER }} />}
      />
    </>
  );
}

export default CustomDropdown;
