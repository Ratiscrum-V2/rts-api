// types
export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = LoginCredentials & {
  nickname: string;
};

// type predicates
export function isLoginCredentials(
  object: unknown
): object is LoginCredentials {
  return (
    (object as LoginCredentials).email !== undefined &&
    (object as LoginCredentials).password !== undefined
  );
}

export function isRegisterCredentials(
  object: unknown
): object is RegisterCredentials {
  return (
    (object as RegisterCredentials).nickname !== undefined &&
    isLoginCredentials(object)
  );
}
