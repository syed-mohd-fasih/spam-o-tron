// theme.js
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

export const LightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: "#993399",
        background: "#FFFFFF",
        surface: "#F2F2F2",
        onBackground: "#000000",
        onSurfaceVariant: "#555555",
    },
};

export const DarkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: "#CC00FF",
        background: "#121212",
        surface: "#1E1E1E",
        onBackground: "#000000",
        onSurfaceVariant: "#AAAAAA",
    },
};
