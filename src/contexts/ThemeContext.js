import { createContext, useState } from "react";
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider,
} from "react-native-paper";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        setIsDarkTheme((prev) => !prev);
    };

    const theme = isDarkTheme ? PaperDarkTheme : PaperDefaultTheme;

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            <PaperProvider theme={theme}>{children}</PaperProvider>
        </ThemeContext.Provider>
    );
};
