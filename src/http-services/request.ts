import { getTokenFromLocalStorage } from '../helpers/tokenHelpers';

type RequestParams = {
  url: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  body?: Record<string, any>;
  useToken?: boolean;
};

export async function request({ url, method, body, useToken }: RequestParams) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const requestUrl = apiUrl + url;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (useToken) {
    const token = getTokenFromLocalStorage();
    headers['Authorization'] = `Bearer ${token}`;
  }
  const req = await fetch(requestUrl, { method, body: JSON.stringify(body), headers });

  const isReqWithError = req.status.toString().startsWith('4');
  const error = isReqWithError ? req.statusText : undefined;

  let data;
  try {
    data = await req.json();
  } catch {
    data = {};
  }

  return error ? { data, error } : { data };
}
