import { log } from "../../lib/log";
import { StoreLoggedInData, LoginValue, LoginStore } from "../../../types";
import { Store } from "../../hooks/stores/useStore";

export const authenticate = async (
  token: string,
  store: Store,
  token_store: LoginStore
) => {
  return new Promise<{ bool: boolean; r: Response }>(async (resolve) => {
    let r = await fetch("/api/v1/auth", {
      method: "POST",
      headers: { Authorization: token },
    });
    if (r.ok) {
      log("AUTH", "Successfully Authenticated");
      let json = await r.json();
      updateTokenStores(
        token_store,
        {
          accessToken: "skypetoken=" + json["skypeToken"],
          bearerToken: token,
        },
        store,
        {
          bool: true,
          whenExpire: json["expiresIn"],
          whenChecked: Math.floor(Date.now() / 1000),
        }
      );
      resolve({ bool: true, r });
    } else {
      log("AUTH", "Error Authenticating");
      resolve({ bool: false, r });
    }
  });
};

export const updateTokenStores = (
  tokenStore: LoginStore,
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
