import styled from "styled-components";
import {
  Breadcrumb,
  Button,
  Input,
  Table,
  Pagination,
  MenuProps,
  Row,
  Col,
  Dropdown,
  message,
  Form,
  Card,
  Radio,
  Switch,
  Spin,
} from "antd";
import Link from "next/link";
import {
  UserAddOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  EllipsisOutlined,
  ExclamationOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from "constants/common";
import ProgramAPI from "apis/program";
import SettingAPI from "apis/setting";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/router";

import {
  PageHeader,
  PageHeaderNaviagtion,
  SearchBar,
  SearchBarContent,
  TableBodyContainer,
  TitleContent,
} from "styles/styled/PageHeader";
import { Colors } from "utils/colors";
import { ImportProgramModal } from "components/admin/program/ImportProgramModal";
import ConfirmModal from "components/ConfirmModal";
import SettingForm from "./SettingForm";

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

const Settings = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isNegativeMarking, setIsNegativeMarking] = useState<boolean>(false);
  const [isOptionRightMarking, setOptionRightMarking] =
    useState<boolean>(false);

  const [active, setActive] = useState<boolean>(false);

  const router = useRouter();
  const programAPI = new ProgramAPI();
  const settingAPI = new SettingAPI();
  const queryClient = useQueryClient();

  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);

  const [filterParams, setFilterParams] =
    useState<FilterParams>(DefaultFilterParams);

  const { data: attendanceData, isLoading } = useQuery(
    ["SettingData"],
    async () => {
      const response = await settingAPI.list();
      return response?.data;
    }
  );

  const data = attendanceData;

  console.log(attendanceData?.number_of_question_per_student, "This data");
  console.log(data);
  useEffect(() => {
    if (data) {
      setActive(data?.active);
    }
  }, [data]);

  const storeSetting = useMutation((data: any) => settingAPI.store(data));

  console.log(data?.exam_time, "this is data");

  const onChange = (checked: boolean) => {
    // console.log(`switch to ${checked}`);
    setIsNegativeMarking(checked);
  };

  const onChangeOptionRight = (checked: boolean) => {
    // console.log(`switch to ${checked}`);
    setOptionRightMarking(checked);
  };
  const onFinish = (data: any) => {
    const newData = {
      ...data,
      is_negative_marking: isNegativeMarking,
      an_option_right_marking: isOptionRightMarking,
    };
    storeSetting.mutate(newData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["SettingData"]);
      },
      onError: (data: any) => {
        const errorMessageWithNetworkIssue = data?.message;
        const errorMessage = data?.response?.data?.message;
      },
    });
  };

  return (
    <UsersContainer>
      <PageHeader>
        <PageHeaderNaviagtion>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/dashboard">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span style={{ color: Colors.BLACK }}>Settings</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <TitleContent>
            <h2>Settings</h2>
          </TitleContent>
        </PageHeaderNaviagtion>
      </PageHeader>
      {data ? (
        <SettingForm data={data} isLoading={isLoading} />
      ) : (
        <SettingForm data={data} isLoading={isLoading} />
      )}
    </UsersContainer>
  );
};

export default Settings;

const UsersContainer = styled.div``;

const StyledPagination = styled(Pagination)`
  // position: absolute;
  // bottom: 24px;
  // right: 24px;
`;

const CustomizedButtonGroup = styled.div`
  float: right;
  margin-top: 10px;
  right: 0;
`;
