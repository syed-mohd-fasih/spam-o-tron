import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/contexts/AuthContext";
import { ThemeProvider, ThemeContext } from "./src/contexts/ThemeContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { useContext } from "react";

export default function App() {
    return (
        <AuthProvider>
            <ThemeProviderWrapper />
        </AuthProvider>
    );
}

const ThemeProviderWrapper = () => {
    const { theme } = useContext(ThemeContext) || {};
    return (
        <ThemeProvider>
            <PaperProvider theme={theme}>
                <NavigationContainer theme={theme}>
                    <AppNavigator />
                </NavigationContainer>
            </PaperProvider>
        </ThemeProvider>
    );
};
