import { useState, useContext } from "react";
import { View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { AuthContext } from "../contexts/AuthContext";

export default function SignupScreen({ navigation }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { signup } = useContext(AuthContext);

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                label="Full Name"
                value={fullName}
                onChangeText={setFullName}
            />
            <TextInput label="Email" value={email} onChangeText={setEmail} />
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
            <TextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <Button mode="contained" onPress={() => signup(username, password)}>
                Sign Up
            </Button>
            <Button onPress={() => navigation.navigate("Login")}>
                Already have an account? Login
            </Button>
        </View>
    );
}
