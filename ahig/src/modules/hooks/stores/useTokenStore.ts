import create from "zustand";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { combine } from "zustand/middleware";
import { isServer } from "../../lib/isServer";

const accessTokenKey = "accessToken";
const bearerTokenKey = "bearerToken";

const getDefaultValues = () => {
  if (!isServer) {
    try {
      let cookies = parseCookies();
      return {
        accessToken: cookies[accessTokenKey] || "",
        bearerToken: cookies[bearerTokenKey] || "",
      };
    } catch {}
  }

  return {
    accessToken: "",
    bearerToken: "",
  };
};

export const useTokenStore = create(
  combine(getDefaultValues(), (set) => ({
    setTokens: (x: { accessToken: string; bearerToken: string }) => {
      try {
        setCookie(null, accessTokenKey, x.accessToken, { sameSite: true });
        setCookie(null, bearerTokenKey, x.bearerToken, { sameSite: true });
      } catch {}

      set(x);
    },
  }))
);
