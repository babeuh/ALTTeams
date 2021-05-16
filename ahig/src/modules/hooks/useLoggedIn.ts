import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTokenStore } from "./stores/useTokenStore";
import { useStore } from "./stores/useStore";
import { authenticate, updateTokenStores } from "../pages/auth/authenticate";

export let useLoggedIn = (config: {
  redirect: boolean;
  loggedInLink?: string;
  loggedOutLink?: string;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const store = useStore();
  const token_store = useTokenStore();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (store.state.loggedIn.bool === true) {
        if (
          Math.floor(Date.now() / 1000) <=
          store.state.loggedIn.whenChecked + store.state.loggedIn.whenExpire
        ) {
          setIsLoggedIn(true);
        }
        return;
      }
      try {
        //check if already have token and then authenticate
        if (token_store.bearerToken !== "") {
          let auth = await authenticate(
            token_store.bearerToken,
            store,
            token_store
          );
          if (auth.bool) {
            setIsLoggedIn(true);
            if (config.redirect && config.loggedInLink) {
              router.replace(config.loggedInLink);
            }
            return;
          }
        }
        if (config.redirect && config.loggedOutLink) {
          router.replace(config.loggedOutLink);
        }
      } catch (error) {
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
