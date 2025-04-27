import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider, DarkTheme, DefaultTheme } from "react-native-paper";

import { useThemeStore } from "./src/stores/useThemeStore";

import AppNavigator from "./src/navigation/AppNavigator";

import GlobalSnackbar from "./src/components/GlobalSnackbar";

export default function App() {
    const { isDarkTheme } = useThemeStore();
    const theme = isDarkTheme ? DarkTheme : DefaultTheme;

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
            <GlobalSnackbar />
        </PaperProvider>
    );
}
