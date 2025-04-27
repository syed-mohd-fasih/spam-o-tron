import { useState, useContext } from "react";
import { View } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { AuthContext } from "../contexts/AuthContext";

export default function SignupScreen({ navigation }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { signup } = useContext(AuthContext);

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleSignup = () => {
        if (!fullName || !email || !username || !password || !confirmPassword) {
            showToast("Please fill in all fields!");
            return;
        }

        if (password.length < 6) {
            showToast("Password must be at least 6 characters long!");
            return;
        }

        if (password !== confirmPassword) {
            showToast("Passwords do not match!");
            return;
        }

        signup(username, password, fullName, email);
    };

    const showToast = (message) => {
        setSnackbarMessage(message);
        setSnackbarVisible(true);
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <TextInput
                label="Full Name"
                value={fullName}
                onChangeText={setFullName}
                style={{ marginBottom: 10 }}
            />
            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={{ marginBottom: 10 }}
            />
            <TextInput
                label="Username"
                value={username}
                onChangeText={setUsername}
                style={{ marginBottom: 10 }}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ marginBottom: 10 }}
            />
            <TextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={{ marginBottom: 10 }}
            />
            <Button
                mode="contained"
                onPress={handleSignup}
                style={{ marginBottom: 10 }}
            >
                Sign Up
            </Button>
            <Button onPress={() => navigation.navigate("Login")}>
                Already have an account? Login
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
