import { useState, useContext } from "react";
import { View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginScreen({ navigation }) {
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
                Login
            </Button>
            <Button onPress={() => navigation.navigate("Signup")}>
                Don't have an account? Sign up
            </Button>
        </View>
    );
}
