import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, useTheme, Text } from "react-native-paper";

import { useAuthStore } from "../stores/useAuthStore";
import { useSnackbarStore } from "../stores/useSnackbarStore";

export default function SignupScreen({ navigation }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const signup = useAuthStore((state) => state.signup);
    const { showSnackbar } = useSnackbarStore();
    const theme = useTheme();

    const handleSignup = () => {
        if (!fullName || !email || !username || !password || !confirmPassword) {
            showSnackbar("Please fill in all fields!");
            return;
        }

        if (password.length < 6) {
            showSnackbar("Password must be at least 6 characters long!");
            return;
        }

        if (password !== confirmPassword) {
            showSnackbar("Passwords do not match!");
            return;
        }

        const success = signup(
            fullName,
            username,
            email,
            password,
            confirmPassword
        );

        showSnackbar(
            success ? "Signup success!" : "Signup failed! Please try again."
        );
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
        >
            <View
                style={[
                    styles.card,
                    {
                        borderColor: theme.colors.primary,
                        backgroundColor: theme.colors.background,
                    },
                ]}
            >
                <Text style={[styles.title, { color: theme.colors.primary }]}>
                    Sign Up
                </Text>

                <TextInput
                    label="Full Name"
                    value={fullName}
                    onChangeText={setFullName}
                    style={styles.input}
                    mode="outlined"
                />
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    mode="outlined"
                    keyboardType="email-address"
                />
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
                <TextInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    style={styles.input}
                    mode="outlined"
                />

                <Button
                    mode="contained"
                    onPress={handleSignup}
                    style={styles.button}
                    buttonColor={theme.colors.primary}
                    textColor={theme.colors.onPrimary}
                >
                    Sign Up
                </Button>
                <Button onPress={() => navigation.navigate("Login")}>
                    Already have an account? Login
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: "100%",
        borderWidth: 1.5,
        borderRadius: 12,
        padding: 24,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginBottom: 16,
    },
});
