export const loginValidator = (login: string): boolean => {
  if (login.length === 0) {
    return false;
  }
  if (!login.includes('@')) {
    return false;
  }
  if (login.at(-1) === '@') {
    return false;
  }
  if (!login.includes('.')) {
    return false;
  }

  return true;
};

export const passwordValidator = (password: string): boolean => {
  if (password.length === 0) {
    return false;
  }
  if (password.length < 4) {
    return false;
  }
  return true;
};
