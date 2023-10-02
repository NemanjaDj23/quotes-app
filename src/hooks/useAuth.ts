import { useCallback, useState } from 'react';
import { getTokenFromLocalStorage } from '../helpers/tokenHelpers';
import { login, logout } from '../http-services/auth';

export function useAuth() {
  const [token, setToken] = useState<string | null>(getTokenFromLocalStorage());

  const handleLogin = useCallback(
    async (username: string, password: string) => {
      const response = await login(username, password);
      if (response.data?.token) {
        setToken(response.data.token);
      }

      return response;
    },
    [setToken],
  );

  const handleLogout = useCallback(async () => {
    const response = await logout();
    setToken(null);

    return response;
  }, [setToken]);

  return {
    handleLogin,
    handleLogout,
    isAuthenticated: !!token,
  };
}
