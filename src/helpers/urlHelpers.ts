export function addSearchUrlParams(url: string, params: Record<string, any>) {
  let paramsPairs = [];
  for (let key in params) {
    paramsPairs.push(`${key}=${params[key]}`);
  }

  return `${url}?${paramsPairs.join('&')}`;
}

export function replaceUrlParamsWithValues(url: string, params: Record<string, any>) {
  let newUrl = url;
  for (let key in params) {
    newUrl = newUrl.replace(`:${key}`, params[key]);
  }
  return newUrl;
}
