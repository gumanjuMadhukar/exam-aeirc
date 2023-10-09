import styled from "styled-components";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import SettingAPI from "apis/setting";
import { useQuery } from "react-query";

import {
  PageHeader,
  PageHeaderNaviagtion,
  TitleContent,
} from "styles/styled/PageHeader";
import { Colors } from "utils/colors";

import SettingForm from "./SettingForm";

const Settings = () => {
  const [_isNegativeMarking, _setIsNegativeMarking] = useState<boolean>(false);
  const [_isOptionRightMarking, _setOptionRightMarking] =
    useState<boolean>(false);

  const [_active, setActive] = useState<boolean>(false);

  const settingAPI = new SettingAPI();

  const { data: attendanceData, isLoading } = useQuery(
    ["SettingData"],
    async () => {
      const response = await settingAPI.list();
      return response?.data;
    }
  );

  const data = attendanceData;

  useEffect(() => {
    if (data) {
      setActive(data?.active);
    }
  }, [data]);

  // const storeSetting = useMutation((data: any) => settingAPI.store(data));

  // const onChange = (checked: boolean) => {
  //   // console.log(`switch to ${checked}`);
  //   setIsNegativeMarking(checked);
  // };

  // const onChangeOptionRight = (checked: boolean) => {
  //   // console.log(`switch to ${checked}`);
  //   setOptionRightMarking(checked);
  // };
  // const onFinish = (data: any) => {
  //   const newData = {
  //     ...data,
  //     is_negative_marking: isNegativeMarking,
  //     an_option_right_marking: isOptionRightMarking,
  //   };
  //   storeSetting.mutate(newData, {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["SettingData"]);
  //     },
  //     onError: (data: any) => {
  //       const errorMessageWithNetworkIssue = data?.message;
  //       const errorMessage = data?.response?.data?.message;
  //     },
  //   });
  // };

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
