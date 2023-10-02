const TOKEN_KEY = 'token';

export function setTokenToLocalStorage(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getTokenFromLocalStorage(): string {
  return localStorage.getItem(TOKEN_KEY) || '';
}

export function removeTokenFromLocalStorage() {
  localStorage.removeItem(TOKEN_KEY);
}

function dispatchTokenUpdate() {}
