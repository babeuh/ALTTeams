import create, { State } from "zustand";
import { StoreLoggedInData } from "../../../types";

interface CustomState {
  loggedIn: StoreLoggedInData;
  ui: {
    centerMaximized: boolean;
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
      whenChecked: 0,
    },
    ui: {
      centerMaximized: false,
    },
  },
  setState: (s: CustomState) => set((store: Store) => ({ state: s })),
}));
