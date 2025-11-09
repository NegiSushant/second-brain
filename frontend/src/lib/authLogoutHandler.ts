let logoutFn: (() => void) | null = null;

export const registerLogoutHandler = (fn: () => void) => {
  logoutFn = fn;
};

export const authLogoutHandler = () => {
  if (logoutFn) logoutFn();
};
