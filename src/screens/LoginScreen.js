import { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";

import { useAuthStore } from "../stores/useAuthStore";
import { useSnackbarStore } from "../stores/useSnackbarStore";

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { showSnackbar } = useSnackbarStore();

    const login = useAuthStore((state) => state.login);

    const handleLogin = () => {
        if (!username || !password) {
            showSnackbar("Please fill in all fields!");
            return;
        }

        const success = login(username, password);
        if (success) {
            navigation.navigate("Home");
        } else {
            showSnackbar("Login failed! Please try again.");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                label="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button mode="contained" onPress={() => handleLogin()}>
                Login
            </Button>
            <Button onPress={() => navigation.navigate("Signup")}>
                Don't have an account? Sign up
            </Button>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000} // 3 seconds
                action={{
                    label: "Dismiss",
                    onPress: () => setSnackbarVisible(false),
                }}
            >
                {snackbarMessage}
            </Snackbar>
        </View>
    );
}
