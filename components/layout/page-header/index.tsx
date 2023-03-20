import { Breadcrumb, Button, Space } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { ReactNode } from 'react';
import { Colors } from 'utils/colors';
import { LeftCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import RoleLayout from '../role-layout';

interface BreadcrumbItem {
  name: string;
  link: string;
}

interface Props {
  items: BreadcrumbItem[];
  titleContent: string;
  buttonLabel?: string;
  buttonCb?: () => void;
  icon?: ReactNode;
  secondButtonLabel?: string;
  secondButtonCb?: () => void;
  secondButtonIcon?: ReactNode;
  buttonRoleConstraint?: boolean;
  role?: string;
  goBack?: boolean;
}

const PageHeader = ({
  items,
  buttonLabel,
  titleContent,
  buttonCb,
  icon,
  secondButtonCb,
  secondButtonIcon,
  secondButtonLabel,
  buttonRoleConstraint,
  role,
  goBack
}: Props) => {
  const router = useRouter();

  const getButton = () => (
    <InitialBtn
      style={{
        background: Colors.COLOR_PRIMARY_BG,
        boxShadow: 'none'
      }}
      type="primary"
      icon={icon ? icon : ''}
      onClick={() => buttonCb && buttonCb()}
    >
      {buttonLabel}
    </InitialBtn>
  );
  return (
    <PageHeaderNaviagtion>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href="/dashboard">Home</Link>
        </Breadcrumb.Item>
        {items?.length > 0 &&
          items.map((item: BreadcrumbItem, index: number) => {
            return (
              <Breadcrumb.Item key={index}>
                <span
                  style={{
                    color:
                      index + 1 === items?.length ? Colors.BLACK : 'inherit'
                  }}
                >
                  {item?.link ? (
                    <Link href={item?.link}>{item.name}</Link>
                  ) : (
                    item.name
                  )}
                </span>
              </Breadcrumb.Item>
            );
          })}
      </Breadcrumb>
      <TitleContent>
        <h2>
          {goBack && (
            <StyledLeftCircleOutlined
              onClick={() => {
                router.back();
              }}
            />
          )}{' '}
          {titleContent}
        </h2>
        <Space>
          {buttonLabel &&
            (buttonRoleConstraint ? (
              <RoleLayout role={role}>{getButton()}</RoleLayout>
            ) : (
              getButton()
            ))}
          {secondButtonLabel && (
            <SecondBtn
              icon={secondButtonIcon ? secondButtonIcon : ''}
              onClick={() => secondButtonCb && secondButtonCb()}
            >
              {secondButtonLabel}
            </SecondBtn>
          )}
        </Space>
      </TitleContent>
    </PageHeaderNaviagtion>
  );
};

export default PageHeader;

const PageHeaderNaviagtion = styled.div`
  background: #fff;
  padding: 24px;
  padding-bottom: 0px !important;
  // border-top: 1px solid rgba(0, 0, 0, 0.2);
`;

const TitleContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 480px) {
    display: flex;
    flex-wrap: wrap;
  }
  h2 {
    text-transform: Capitalize;
  }
`;

const SecondBtn = styled(Button)`
  background: ${Colors.SECONDARY};
  boxshadow: none;
  color: ${Colors.WHITE};
  &:hover {
    border-color: ${Colors.SECONDARY} !important;
    color: ${Colors.WHITE} !important;
  }
  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 10px;
  }
`;

const InitialBtn = styled(Button)`
  background: ${Colors.COLOR_PRIMARY_BG};
  boxshadow: 'none';
  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 10px;
  }
`;

const StyledLeftCircleOutlined = styled(LeftCircleOutlined)`
  color: gray;
  &:hover {
    color: #333; /* Darker color */
  }
`;
