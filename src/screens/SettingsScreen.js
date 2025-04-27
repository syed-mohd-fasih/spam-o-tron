import { View } from "react-native";
import { Switch, Text } from "react-native-paper";

import { useThemeStore } from "../stores/useThemeStore";

export default function SettingsScreen() {
    const { isDarkTheme, toggleTheme } = useThemeStore();
    return (
        <View style={{ padding: 20 }}>
            <Text>Dark Theme</Text>
            <Switch value={isDarkTheme} onValueChange={toggleTheme} />
        </View>
    );
}
