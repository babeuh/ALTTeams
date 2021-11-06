import { log } from "../../lib/log";
import { StoreLoggedInData, UserCredentials, TokenStore } from "../../../types";
import { Store } from "../../hooks/stores/useStore";
import { apiVersion } from "../../lib/fetcher";

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
        updateTokenStores(
          token_store,
          {
            accessToken: "skypetoken=" + json["skypeTokenObject"]["skypeToken"],
            bearerToken: "Bearer " + json["bearerToken"],
          },
          store,
          {
            bool: true,
            whenExpire: json["skypeTokenObject"]["expiresIn"],
            whenChecked: Math.floor(Date.now() / 1000),
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

export const refreshST = async (store: Store, token_store: TokenStore) => {
  return new Promise<{ bool: boolean }>(async (resolve) => {
    const response = await fetch(`/api/${apiVersion}/refreshST`, {
      method: "POST",
      headers: { Authorization: token_store.bearerToken },
    });
    if (response.ok) {
      log("AUTH", "Successfully refreshed SkypeToken and validated session");
      const json = await response.json();
      updateTokenStores(
        token_store,
        {
          accessToken: "skypetoken=" + json["skypeToken"],
          bearerToken: token_store.bearerToken,
        },
        store,
        {
          bool: true,
          whenExpire: json["expiresIn"],
          whenChecked: Math.floor(Date.now() / 1000),
        }
      );
      resolve({ bool: true });
    } else {
      log("AUTH", "Error Refreshing SkypeToken");
      resolve({ bool: false });
    }
  });
};

export const updateTokenStores = (
  tokenStore: TokenStore,
  tokenStoreLoggedInData: { accessToken: string; bearerToken: string },
  store: Store,
  storeLoggedInData: StoreLoggedInData
) => {
  tokenStore.setTokens({
    accessToken: tokenStoreLoggedInData.accessToken,
    bearerToken: tokenStoreLoggedInData.bearerToken,
  });
  store.setState({
    ...store.state,
    loggedIn: storeLoggedInData,
  });
};
