import create, { State } from "zustand";

interface CustomState {
  api: any;
  info: {
    name: string,
    version: string,
    tauriVersion: string,
  };
  is: boolean;
  hasSetSize: boolean;
  isMaximized: boolean;
}

export interface TauriStore extends State {
  state: CustomState;
  setState: (state: CustomState) => void;
}

export const useTauriStore = create<TauriStore>((set) => ({
  state: {
    api: null,
    info: {
      name: '',
      version: '',
      tauriVersion: ''
    },
    is: false,
    hasSetSize: false,
    isMaximized: false,
  },
  setState: (s: CustomState) => set(() => ({ state: s })),
}));
