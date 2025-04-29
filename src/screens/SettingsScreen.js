import { View, StyleSheet } from "react-native";
import { Switch, Text, useTheme, Button, Divider } from "react-native-paper";

import { useThemeStore } from "../stores/useThemeStore";
import { useAuthStore } from "../stores/useAuthStore";

import CustomHeader from "../components/CustomHeader";

export default function SettingsScreen() {
    const { isDarkTheme, toggleTheme } = useThemeStore();
    const theme = useTheme();

    const logout = useAuthStore((state) => state.logout);

    return (
        <>
            <CustomHeader title="Settings" />
            <View
                style={[
                    styles.container,
                    { backgroundColor: theme.colors.background },
                ]}
            >
                <View style={styles.row}>
                    <Text
                        style={[styles.label, { color: theme.colors.primary }]}
                    >
                        Dark Theme
                    </Text>
                    <Switch value={isDarkTheme} onValueChange={toggleTheme} />
                </View>

                <Divider style={styles.divider} />

                <Button
                    mode="contained"
                    onPress={logout}
                    style={styles.logoutButton}
                    buttonColor={theme.colors.error}
                    textColor="#fff"
                >
                    Logout
                </Button>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        // justifyContent: "space-between",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
    },
    logoutButton: {
        marginTop: 40,
    },
    divider: {
        marginVertical: 20,
    },
});
