// stores/useThemeStore.js
import { create } from "zustand";

export const useThemeStore = create((set) => ({
    isDarkTheme: false,
    toggleTheme: () => set((state) => ({ isDarkTheme: !state.isDarkTheme })),
}));
