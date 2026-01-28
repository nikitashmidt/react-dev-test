import { create } from "zustand";
import type { Call } from "../types";

type UIState = {
  selectedCall: Call | null;
  setSelectedCall: (call: Call) => void;
};

export const useUIStore = create<UIState>((set) => ({
  selectedCall: null,

  setSelectedCall: (call) => set({ selectedCall: call }),
}));
