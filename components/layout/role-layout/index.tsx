import { ReactNode } from 'react';
import { Roles } from 'utils/enums';

interface Iprops {
  role: string | undefined;
  children: ReactNode;
}

const RoleLayout = ({ role, children }: Iprops) => {
  return role === Roles.ADMIN || role === Roles.SUPERADMIN ? (
    <>{children}</>
  ) : (
    <></>
  );
};

export default RoleLayout;
