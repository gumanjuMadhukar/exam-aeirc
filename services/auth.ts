import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { logout as LogoutAPI } from '../apis/auth';

/**
 * Log out of the system.
 *
 */
export async function logout() {
  LogoutAPI().finally(() => {
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('refresh-token');
    window.location.href = '/auth/login';
  });
}
