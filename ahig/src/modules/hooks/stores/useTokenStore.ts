import create from "zustand";
import { parseCookies, setCookie } from "nookies";
import { combine } from "zustand/middleware";
import { isServer } from "../../lib/isServer";

const jwtKey = "token";
const refreshTokenKey = "refreshToken"

const getDefaultValues = () => {
  if (!isServer) {
    try {
      const cookies = parseCookies();
      return {
        jwt: cookies[jwtKey] || "",
        refreshToken: cookies[refreshTokenKey] || "",
      };
    } catch {}
  }

  return {
    jwt: "",
    refreshToken: "",
  };
};

export const useTokenStore = create(
  combine(getDefaultValues(), (set) => ({
    setToken: (jwt: string, refreshToken: string) => {
      try {
        setCookie(null, jwtKey, jwt, { sameSite: true });
        setCookie(null, refreshTokenKey, refreshToken, { sameSite: true });
        console.log(parseCookies())
      } catch (err) {
        console.log(err)
      }

      set({ jwt, refreshToken });
    },
  }))
);
