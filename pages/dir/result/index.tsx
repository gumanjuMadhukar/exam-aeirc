import { Breadcrumb, Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import {
  PageHeader,
  PageHeaderNaviagtion,
  TitleContent,
} from "styles/styled/PageHeader";
import { PageLayout } from "styles/styled/styled";
import { Colors } from "utils/colors";

const Result = () => {
  const openCloseModal = () => {};
  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderNaviagtion>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/dashboard">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span style={{ color: Colors.BLACK }}>Program</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <TitleContent>
            <h2></h2>
            <Button
              style={{
                background: Colors.COLOR_PRIMARY_BG,
                boxShadow: "none",
                color: Colors.WHITE,
              }}
              // type="primary"
              icon={<UserAddOutlined />}
              onClick={openCloseModal}
            >
               Encrypted Result
            </Button>
            <Button
              style={{
                background: Colors.COLOR_PRIMARY_BG,
                boxShadow: "none",
                color: Colors.WHITE,
              }}
              // type="primary"
              icon={<UserAddOutlined />}
              onClick={openCloseModal}
            >
              Decrypted Result
            </Button>
          </TitleContent>
        </PageHeaderNaviagtion>
      </PageHeader>
    </PageLayout>
  );
};

export default Result;
