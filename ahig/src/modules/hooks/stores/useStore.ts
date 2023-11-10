import create, { State } from "zustand";
import { StoreLoggedInData } from "../../../types";

interface CustomState {
  loggedIn: StoreLoggedInData;
  teams: {id: string; title: string}[];
  copnd: {
    id: string;
    title: string;
  };
}

export interface Store extends State {
  state: CustomState;
  setState: (state: CustomState) => void;
}

export const useStore = create<Store>((set) => ({
  state: {
    loggedIn: {
      bool: false,
      whenExpire: 0,
    },
    teams: [],
    copnd: {
      id: '',
      title: 'Dashboard'
    },
  },
  setState: (s: CustomState) => set(() => ({ state: s })),
}));
