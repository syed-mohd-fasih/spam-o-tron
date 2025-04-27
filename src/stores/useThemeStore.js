import { create } from "zustand";
import { DarkTheme, DefaultTheme } from "react-native-paper";

export const useThemeStore = create((set) => ({
    isDarkTheme: false,

    toggleTheme: () =>
        set((state) => ({
            isDarkTheme: !state.isDarkTheme,
        })),

    getTheme: () => (get().isDarkTheme ? DarkTheme : DefaultTheme),
}));
