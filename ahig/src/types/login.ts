export type LoginValue =
  | { email: string; password: string; type: "credentials" }
  | { token: string; type: "token" };

export interface UserCredentials {
  email: string;
  password: string;
}
