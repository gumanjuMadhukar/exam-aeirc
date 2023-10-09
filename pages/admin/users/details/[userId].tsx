import styled from "styled-components";
import { Breadcrumb, Table, Tag } from "antd";
import Link from "next/link";
import { useState } from "react";
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from "constants/common";
import UserAPI from "apis/user";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import {
  PageHeader,
  PageHeaderNaviagtion,
  TableBodyContainer,
  TitleContent,
} from "styles/styled/PageHeader";
import { Colors } from "utils/colors";

interface FilterParams {
  currentPage: number;
  pageSize: number;
  status: string;
  search: string;
}

const DefaultFilterParams = {
  currentPage: INITIAL_CURRENT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  status: "true",
  search: "",
};

const StudentDetails = () => {
  const [_searchValue, _setSearchValue] = useState("");
  const router = useRouter();
  const { userId } = router.query;
  const userAPI = new UserAPI();

  const programListColumns: any = [
    {
      title: "S.N",
      render: (_text: any, _record: any, index: number) => index + 1,
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Subject Name",
      key: "subject_name",
      render: (row: any) => <text>{row?.subject?.name}</text>,
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Student Count",
      render: (row: any) => <text>{row?.student_count}</text>,
      responsive: ["sm", "md", "lg"],
    },
  ];

  const [_filterParams, _setFilterParams] =
    useState<FilterParams>(DefaultFilterParams);

  // const handleSearch = (e: any) => {
  //   const { name, value } = e.target;
  //   setFilterParams((prevState) => ({
  //     ...prevState,
  //     currentPage: INITIAL_CURRENT_PAGE,
  //     search: searchValue,
  //   }));
  // };

  const userQuery = useQuery(
    ["UserDetailData"],
    async () =>
      await userAPI
        .get(userId)
        .then((res) => res.data)
        .catch((err) => err),
    {
      enabled: !!userId,
    }
  );

  const details = userQuery?.data;

  return (
    <UsersContainer>
      <PageHeader>
        <PageHeaderNaviagtion>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/dashboard">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span style={{ color: Colors.BLACK }}>Users Details</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <TitleContent>
            <h2>{details?.user_data?.name}</h2>
            <Tag color={"success"} style={{ fontSize: "16px" }}>
              {details?.user_data?.phone_number}
            </Tag>
          </TitleContent>
        </PageHeaderNaviagtion>
      </PageHeader>

      {/* <Col md={8} lg={4} sm={12}>
          <Card title="Number of Students">
            <strong>{details?.subject_count}</strong>
          </Card>
        </Col>
        <Col md={8} lg={5} sm={12}>
          <Card title="Number of Students"></Card>
        </Col>
        <Col md={8} lg={5} sm={12}>
          <Card title="Number of Students"></Card>
        </Col>
        <Col md={8} lg={5} sm={12}>
          <Card title="Number of Students"></Card>
        </Col>
        <Col md={8} lg={4} sm={12}>
          <Card title="Number of Students"></Card>
        </Col> */}

      <TableBodyContainer style={{ marginTop: "20px" }}>
        <Table
          columns={programListColumns}
          dataSource={details?.subject_data}
          pagination={false}
          onRow={(record) => ({
            onClick: () =>
              router.push(`/admin/users/student/${record?.subject?.id}`),
          })}
          // scroll={{ x: 1000 }}
        />
      </TableBodyContainer>
    </UsersContainer>
  );
};

export default StudentDetails;

const UsersContainer = styled.div``;

// const StyledPagination = styled(Pagination)`
//   // position: absolute;
//   // bottom: 24px;
//   // right: 24px;
// `;

// const ProfileWrapper = styled(Row)`
//   padding: 25px;
//   justify-content: space-between;
// `;

// const LeftProfile = styled(Col)`
//   background-color: #fff;
//   height: 300px;
// `;

// const ProfileImage = styled.div`
//   width: 200px;
//   text-align: center;
//   .ant-image {
//     width: 100%;
//     .profile-img {
//       &.img-padding {
//         padding: 40px;
//       }
//       background: ${Colors.LIGHTER_BG};
//       border-radius: 50%;
//     }
//   }
// `;

// const ImageWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100%;
// `;

// const StyledTag = styled(Tag)`
//   margin-left: 15px;
// `;
