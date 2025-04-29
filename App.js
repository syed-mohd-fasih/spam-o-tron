import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";

import { useThemeStore } from "./src/stores/useThemeStore";
import { useAuthStore } from "./src/stores/useAuthStore";

import { LightTheme, DarkTheme } from "./src/theme/customThemes";

import AppNavigator from "./src/navigation/AppNavigator";
import GlobalSnackbar from "./src/components/GlobalSnackbar";
import { SocketContextProvider } from "./src/context/SocketContext";

export default function App() {
    const isDarkTheme = useThemeStore((state) => state.isDarkTheme);
    const theme = isDarkTheme ? DarkTheme : LightTheme;

    const restoreUser = useAuthStore((state) => state.restoreUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            await restoreUser();
            setLoading(false);
        };

        initializeAuth();
    }, []);

    if (loading) {
        return null; // or you could return a <SplashScreen /> here
    }

    return (
        <SocketContextProvider>
            <PaperProvider theme={theme}>
                <NavigationContainer theme={theme}>
                    <AppNavigator />
                </NavigationContainer>
                <GlobalSnackbar />
            </PaperProvider>
        </SocketContextProvider>
    );
}
