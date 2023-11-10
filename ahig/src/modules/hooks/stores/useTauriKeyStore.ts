import create from "zustand";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { combine } from "zustand/middleware";
import { isServer } from "../../lib/isServer";

const tauriKeyKey = "tauriKey";

const getDefaultValues = () => {
  if (!isServer) {
    try {
      const cookies = parseCookies();
      return {
        tauriKey: cookies[tauriKeyKey] || "",
      };
    } catch {}
  }

  return {
    tauriKey: "",
  };
};

export const useTauriKeyStore = create(
  combine(getDefaultValues(), (set) => ({
    setTauriKey: (x: { tauriKey: string; }) => {
      try {
        setCookie(null, tauriKeyKey, x.tauriKey, { sameSite: true });
      } catch {}

      set(x);
    },
  }))
);

