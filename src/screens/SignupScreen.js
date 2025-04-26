import { useState, useContext } from "react";
import { View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { AuthContext } from "../contexts/AuthContext";

export default function SignupScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);

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
            <Button mode="contained" onPress={() => login(username, password)}>
                Sign Up
            </Button>
            <Button onPress={() => navigation.navigate("Login")}>
                Already have an account? Login
            </Button>
        </View>
    );
}
