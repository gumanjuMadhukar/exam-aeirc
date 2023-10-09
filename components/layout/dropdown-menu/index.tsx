import React, { useEffect, useState } from "react";
import { DownOutlined, ManOutlined, PoweroffOutlined } from "@ant-design/icons";
import { Dropdown, Space, theme, Avatar } from "antd";
import type { MenuProps } from "antd";
import * as authService from "services/auth";
import { getInitials } from "utils/helpers";
import Link from "next/link";
import { ChangePasswordModal } from "components/admin/password/ChangePasswordModal";

const { useToken } = theme;

const DropdownMenu = () => {
  const { token } = useToken();

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    padding: "8px",
  };

  const menuStyle = {
    boxShadow: "none",
    fontWeight: "600",
    fontSize: "14px",
    justifyContent: "space-between",
  };

  const [name, setName] = useState<string | undefined>();

  useEffect(() => {
    setName(getInitials());
  });

  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);

  const openCloseModal = () => {
    setCreateUserModalOpen(!createUserModalOpen);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href="/employee/my-profile">
          <ManOutlined /> My Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <a onClick={authService.logout}>
          <PoweroffOutlined /> Logout
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a onClick={openCloseModal}>
          <PoweroffOutlined /> Change Password
        </a>
      ),
    },
  ];

  return (
    <>
      <Dropdown
        menu={{ items }}
        overlayStyle={{ padding: "10px" }}
        dropdownRender={(menu) => (
          <div style={contentStyle}>
            {React.cloneElement(menu as React.ReactElement, {
              style: menuStyle,
            })}
          </div>
        )}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar
              size="large"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#000000",
                boxShadow:
                  "0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 3px 6px -4px rgba(0, 0, 0, 0.12)",
                fontWeight: "600",
                fontSize: "18px",
                marginLeft: "10px",
              }}
            >
              {name}
            </Avatar>
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      <ChangePasswordModal
        handleCancel={openCloseModal}
        isModalOpen={createUserModalOpen}
      />
    </>
  );
};

export default DropdownMenu;
