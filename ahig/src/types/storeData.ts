export interface StoreLoggedInData {
  bool: boolean;
  whenExpire: number;
  whenChecked: number;
}
export interface LoginStore {
  accessToken: string;
  bearerToken: string;
  setTokens: (x: { accessToken: string; bearerToken: string }) => void;
}
