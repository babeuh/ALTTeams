import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTokenStore } from "./stores/useTokenStore";
import { Store, useStore } from "./stores/useStore";
import { refreshJWT, updateTokenStores } from "../pages/auth/authenticate";
import { TokenStore } from "../../types";
import jwt from "jsonwebtoken";

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
        if (Math.floor(Date.now() / 1000) <= store.state.loggedIn.whenExpire) {
          setIsLoggedIn(true);
          return;
        } //else we continue and refresh our token
      }

      try {
        //check if a token is stored
        if (token_store.refreshToken !== "") {
          if (token_store.jwt !== "") {
            const jwebtoken: any = jwt.decode(token_store.jwt); // have to use any so that I can use token.exp
            const tokenExpirationDate = jwebtoken.exp;
            if (Math.floor(Date.now() / 1000) <= tokenExpirationDate) {
              setIsLoggedIn(true);
              if (config.redirect && config.loggedInLink) {
                router.replace(config.loggedInLink);
              }
              return;
            }
          }
          //refresh our skypetoken
          const refreshed = await refreshJWT(store, token_store);
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
          { jwt: token_store.jwt, refreshToken: token_store.refreshToken },
          store,
          {
            bool: false,
            whenExpire: 0,
          }
        );
        if (config.redirect && config.loggedOutLink) {
          router.replace(config.loggedOutLink);
        }
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.loggedInLink, config.loggedOutLink, config.redirect]);

  return isLoggedIn;
};
