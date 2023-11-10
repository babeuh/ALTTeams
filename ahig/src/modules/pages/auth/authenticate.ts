import { log } from "../../lib/log";
import { StoreLoggedInData, UserCredentials, TokenStore } from "../../../types";
import { Store } from "../../hooks/stores/useStore";
import { apiVersion } from "../../lib/fetcher";
import jwt from "jsonwebtoken";

export const authenticate = async (
  userCredentials: UserCredentials,
  store: Store,
  token_store: TokenStore
) => {
  return new Promise<{ bool: boolean; response: Response }>(async (resolve) => {
    try {
      const response = await fetch(`/api/${apiVersion}/auth`, {
        method: "POST",
        body: JSON.stringify(userCredentials),
      });
      if (response.ok) {
        log("AUTH", "Successfully Authenticated");
        const json = await response.json();

        const token: any = jwt.decode(json.jwt); // have to use any so that I can use token.exp
        const tokenExpirationDate = token.exp;

        updateTokenStores(
          token_store,
          { jwt: json.jwt, refreshToken: json.refreshToken },
          store,
          {
            bool: true,
            whenExpire: tokenExpirationDate,
          }
        );
        resolve({ bool: true, response });
      } else {
        log("AUTH", "Error Authenticating");
        resolve({ bool: false, response });
      }
    } catch (error) {
      log("AUTH", error);
    }
  });
};

export const refreshJWT = async (store: Store, token_store: TokenStore) => {
  return new Promise<{ bool: boolean }>(async (resolve) => {

    const response = await fetch(`/api/${apiVersion}/refreshTokens`, {
      method: "POST",
    });
    if (response.ok) {
      log("AUTH", "Successfully refreshed tokens");

      const json = await response.json();
      const token: any = jwt.decode(json.jwt); // have to use any so that I can use token.exp
      const tokenExpirationDate = token.exp;

      updateTokenStores(
        token_store,
        { jwt: json.jwt, refreshToken: json.refreshToken },
        store,
        {
          bool: true,
          whenExpire: tokenExpirationDate,
        }
      );
      resolve({ bool: true });
    } else {
      log("AUTH", "Error Refreshing JWT");
      resolve({ bool: false });
    }
  });
};

export const updateTokenStores = (
  tokenStore: TokenStore,
  x: { jwt: string; refreshToken: string },
  store: Store,
  storeLoggedInData: StoreLoggedInData
) => {
  tokenStore.setToken(x.jwt, x.refreshToken);
  store.setState({
    ...store.state,
    loggedIn: storeLoggedInData,
  });
};
