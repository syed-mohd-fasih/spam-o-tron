import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";

import { useAuthStore } from "../stores/useAuthStore";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import ChatScreen from "../screens/ChatScreen";

import MainTabs from "../components/MainTabs";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const { user } = useAuthStore();
    const { colors } = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.background,
                },
                headerTintColor: colors.primary,
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 30,
                },
            }}
        >
            {user ? (
                <>
                    <Stack.Screen
                        name="Main"
                        component={MainTabs}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Chat" component={ChatScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Signup"
                        component={SignupScreen}
                        options={{ headerShown: false }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};

export default AppNavigator;
