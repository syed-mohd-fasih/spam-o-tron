// components/CustomHeader.js
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export default function CustomHeader({ title }) {
    const theme = useTheme();

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
        >
            <Text style={[styles.title, { color: theme.colors.primary }]}>
                {title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        paddingTop: 40,
        paddingBottom: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#CC00FF",
    },
    title: {
        fontSize: 35,
        fontWeight: "bold",
    },
});
