export interface StoreLoggedInData {
  bool: boolean;
  whenExpire: number;
}
export interface TokenStore {
  jwt: string;
  refreshToken: string;
  setToken: (jwt: string, refreshToken: string) => void;
}
