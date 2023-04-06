import {
  Card,
  Col,
  Skeleton,
  Row,
  Table,
  Dropdown,
  MenuProps,
  Button,
  message
} from 'antd';
import PageHeader from 'components/layout/page-header';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { PageHeaderWrapper } from 'styles/authCSS';
import styled from 'styled-components';
import type { ColumnsType } from 'antd/es/table';
import { ExclamationOutlined } from '@ant-design/icons';
import EmployeeAPI from '../../../../apis/employee';

import {
  EllipsisOutlined,
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Colors } from 'utils/colors';
import { getAllEmployeeDocs, removeEmployeeDocs } from 'apis/admin/employee';
import DocumentUploadModal from 'components/admin/employee/DocumentUploadModal';
import DocumentViewModal from 'components/admin/employee/DocumentViewModal';
import DocumentEditModal from 'components/admin/employee/DocumentEditModal';
import ConfirmModal from 'components/ConfirmModal';

interface IViewDropDown {
  showModalView: (id: string) => void;
  showModalEdit: (id: string) => void;
  openCloseDeleteLeaveModal: (id?: string | undefined) => void;
  id: string;
}

export interface FinalBodyDataRemove {
  employeeId?: string | string[] | undefined;
  employeeFileId?: string;
  filesId?: any;
}

const ViewDropDown = ({
  showModalView,
  showModalEdit,
  openCloseDeleteLeaveModal,
  id
}: IViewDropDown) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div onClick={() => showModalView(id)}>
          <EyeOutlined />
          {' View'}
        </div>
      )
    },
    {
      key: '2',
      label: (
        <div onClick={() => showModalEdit(id)}>
          <EditOutlined />
          {' Edit'}
        </div>
      )
    },
    {
      key: '3',
      label: (
        <div onClick={() => openCloseDeleteLeaveModal(id)}>
          <DeleteOutlined />
          {' Delete'}
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

interface DataType {
  key: string;
  name: string;
  description: string;
  file_size: string;
}

export const Document = () => {
  const employeeAPI = new EmployeeAPI();
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [isDeleteLeaveModalOpen, setIsDeleteLeaveModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<string>('');
  const router = useRouter();
  const queryClient = useQueryClient();

  const { id } = router.query;
  const removeEmployeeDocsMutation = useMutation(
    ({ employeeId, employeeFileId }: FinalBodyDataRemove) =>
      removeEmployeeDocs({ employeeId, employeeFileId })
  );

  const openCloseDeleteLeaveModal = (id?: string) => {
    id ? setCurrentItem(id) : setCurrentItem('');
    setIsDeleteLeaveModalOpen(!isDeleteLeaveModalOpen);
  };

  const { data: allEmployeeDocs, isLoading: isLoadingEmployeeDocs } = useQuery(
    'getAllEmployeeDocs',
    () => getAllEmployeeDocs(id as string),
    {
      enabled: !!id
    }
  );

  const onConfirmDelete = () => {
    removeEmployeeDocsMutation.mutate(
      { employeeId: id, employeeFileId: currentItem },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['getAllEmployeeDocs']);
          message.success('Removed Document Successfully');
          openCloseDeleteLeaveModal();
        },
        onError: (data: any) => {
          const errorMessage = data?.response?.data?.message;
          message.error(errorMessage);
        }
      }
    );
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => (
        <>
          <p>{text}</p>
        </>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Number of files',
      render: item => {
        return item.files.length;
      }
    },
    {
      title: '',
      dataIndex: '',
      render: row => (
        <ViewDropDown
          showModalView={showModalView}
          showModalEdit={showModalEdit}
          openCloseDeleteLeaveModal={openCloseDeleteLeaveModal}
          id={row.id}
        />
      )
    }
  ];
  const HeaderItems = [
    {
      name: 'Employee',
      link: `/admin/employee/${id}`
    },
    {
      name: 'Documents',
      link: ``
    }
  ];

  const { data: employeeData, isLoading } = useQuery(
    `employeeBasicInfo-${id}`,
    () =>
      employeeAPI
        .get(id)
        .then(res => res.data.data)
        .catch(err => err),
    {
      enabled: !!id
    }
  );

  const showModalUpload = () => {
    setOpenUpload(true);
  };
  const showModalView = (id: string) => {
    setCurrentItem(id);
    setOpenView(true);
  };
  const showModalEdit = (id: string) => {
    setCurrentItem(id);
    setOpenEdit(true);
  };

  const hideModalUpload = () => {
    setOpenUpload(false);
  };
  const hideModalView = () => {
    setCurrentItem('');
    setOpenView(false);
  };
  const hideModalEdit = () => {
    setCurrentItem('');
    setOpenEdit(false);
  };

  if (isLoading || isLoadingEmployeeDocs) return <Skeleton />;
  return (
    <div>
      <PageHeaderWrapper>
        <PageHeader
          items={HeaderItems}
          titleContent={`Documents`}
          goBack={true}
        />
      </PageHeaderWrapper>
      <DocumentContent>
        <CardsContainer>
          <Col>
            <Card
              bordered={false}
              hoverable={false}
              bodyStyle={{ padding: 10 }}
            >
              <Row>
                <Col span={12}>
                  <h2>Documents of {employeeData?.employee?.name}</h2>
                </Col>
                <Col span={4} offset={8}>
                  <Button
                    type="ghost"
                    ghost
                    style={{
                      boxShadow: 'none',
                      borderColor: Colors.PRIMARY,
                      color: Colors.PRIMARY,
                      width: '100%',
                      marginTop: '.5rem'
                    }}
                    onClick={showModalUpload}
                  >
                    <UploadOutlined /> Upload
                  </Button>
                </Col>
              </Row>
              <Table
                columns={columns}
                dataSource={allEmployeeDocs}
                pagination={false}
              />
            </Card>
            <ConfirmModal
              buttonTitle="Confirm"
              openCloseModal={openCloseDeleteLeaveModal}
              open={isDeleteLeaveModalOpen}
              confirmText="remove the document"
              onConfirmModal={onConfirmDelete}
              icon={<ExclamationOutlined style={{ color: Colors.DANGER }} />}
            />
          </Col>
        </CardsContainer>
      </DocumentContent>
      <DocumentUploadModal hideModal={hideModalUpload} open={openUpload} />
      <DocumentViewModal
        hideModal={hideModalView}
        open={openView}
        currentItem={currentItem}
        allEmployeeDocs={allEmployeeDocs}
      />
      <DocumentEditModal
        hideModal={hideModalEdit}
        open={openEdit}
        currentItem={currentItem}
        allEmployeeDocs={allEmployeeDocs}
      />
    </div>
  );
};

export default Document;

const DocumentContent = styled.div`
  background: #fff;
  width: auto;
  margin: 20px;
`;

const CardsContainer = styled.div`
  padding: 20px;
`;
