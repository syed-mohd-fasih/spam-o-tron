import { useState, useContext } from "react";
import { View } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleLogin = () => {
        if (!username || !password) {
            showToast("Please fill in all fields!");
            return;
        }

        login(username, password);
    };

    const showToast = (message) => {
        setSnackbarMessage(message);
        setSnackbarVisible(true);
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
