import { useContext } from "react";
import { View } from "react-native";
import { Switch, Text } from "react-native-paper";
import { ThemeContext } from "../contexts/ThemeContext";

export default function SettingsScreen() {
    const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

    return (
        <View style={{ padding: 20 }}>
            <Text>Dark Theme</Text>
            <Switch value={isDarkTheme} onValueChange={toggleTheme} />
        </View>
    );
}
