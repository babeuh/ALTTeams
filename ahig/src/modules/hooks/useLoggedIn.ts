import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTokenStore } from "./stores/useTokenStore";
import { Store, useStore } from "./stores/useStore";
import { refreshST, updateTokenStores } from "../pages/auth/authenticate";
import { TokenStore } from "../../types";

export const useLoggedIn = (config: {
  redirect: boolean;
  loggedInLink?: string;
  loggedOutLink?: string;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const store: Store = useStore();
  const token_store: TokenStore = useTokenStore();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (store.state.loggedIn.bool === true) {
        if (
          Math.floor(Date.now() / 1000) <=
          store.state.loggedIn.whenChecked + store.state.loggedIn.whenExpire
        ) {
          setIsLoggedIn(true);
          return;
        } //else we continue and refresh our token
      }

      try {
        //check if a token is stored
        if (token_store.bearerToken !== "") {
          //refresh our skypetoken (has benefit of verifying that)
          const refreshed = await refreshST(store, token_store);
          if (refreshed.bool) {
            setIsLoggedIn(true);
            if (config.redirect && config.loggedInLink) {
              router.replace(config.loggedInLink);
            }
            return;
          }
        }
        //token is invalid or not stored
        if (config.redirect && config.loggedOutLink) {
          router.replace(config.loggedOutLink);
        }
      } catch (error) {
        //token is invalid or not stored
        updateTokenStores(
          token_store,
          {
            accessToken: token_store.accessToken,
            bearerToken: token_store.bearerToken,
          },
          store,
          {
            bool: false,
            whenExpire: 0,
            whenChecked: Math.floor(Date.now() / 1000),
          }
        );
        if (config.redirect && config.loggedOutLink) {
          router.replace(config.loggedOutLink);
        }
      }
    })();
  }, []);

  return isLoggedIn;
};
