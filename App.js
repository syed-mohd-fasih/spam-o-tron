import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider, DarkTheme, DefaultTheme } from "react-native-paper";

import { useThemeStore } from "./src/stores/useThemeStore";
import { useAuthStore } from "./src/stores/useAuthStore";

import AppNavigator from "./src/navigation/AppNavigator";
import GlobalSnackbar from "./src/components/GlobalSnackbar";
import { SocketContextProvider } from "./src/context/SocketContext";

export default function App() {
    const { isDarkTheme } = useThemeStore();
    const theme = isDarkTheme ? DarkTheme : DefaultTheme;

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
        return null; // or you could return a <LoadingScreen /> here later
    }

    return (
        <SocketContextProvider>
            <PaperProvider theme={theme}>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
                <GlobalSnackbar />
            </PaperProvider>
        </SocketContextProvider>
    );
}
