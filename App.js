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
            <NavigationContainer theme={theme}>
                <AppNavigator />
            </NavigationContainer>
        </ThemeProvider>
    );
};
