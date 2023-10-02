import { request } from './request';
import { API_ROUTES } from './routes';
import { removeTokenFromLocalStorage, setTokenToLocalStorage } from '../helpers/tokenHelpers';

type LoginResponse = {
  token: string;
};

export async function login(username: string, password: string) {
  const req = await request<LoginResponse>({
    url: API_ROUTES.TOKEN,
    method: 'POST',
    body: { username, password },
  });
  const { data } = req;
  if (data?.token) {
    setTokenToLocalStorage(data.token);
  }
  return req;
}

export async function logout() {
  await request({ url: API_ROUTES.TOKEN, method: 'DELETE' });
  removeTokenFromLocalStorage();
}
