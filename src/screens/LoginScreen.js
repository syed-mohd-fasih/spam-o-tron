import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button, useTheme } from "react-native-paper";

import { useAuthStore } from "../stores/useAuthStore";
import { useSnackbarStore } from "../stores/useSnackbarStore";

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { showSnackbar } = useSnackbarStore();
    const login = useAuthStore((state) => state.login);
    const theme = useTheme();

    const handleLogin = () => {
        if (!username || !password) {
            showSnackbar("Please fill in all fields!");
            return;
        }

        const success = login(username, password);
        showSnackbar(
            success ? "Login success!" : "Login failed! Please try again."
        );
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
        >
            <View style={[styles.card, { borderColor: theme.colors.primary }]}>
                <Text style={[styles.title, { color: theme.colors.primary }]}>
                    Login
                </Text>

                <TextInput
                    label="Username"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                    mode="outlined"
                />
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                    mode="outlined"
                />
                <Button
                    mode="contained"
                    onPress={handleLogin}
                    style={styles.button}
                    buttonColor={theme.colors.primary}
                    textColor={theme.colors.onPrimary}
                >
                    Login
                </Button>
                <Button onPress={() => navigation.navigate("Signup")}>
                    Don't have an account? Sign up
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: "100%",
        borderWidth: 1.5,
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        marginBottom: 25,
    },
    button: {
        marginBottom: 15,
    },
});
