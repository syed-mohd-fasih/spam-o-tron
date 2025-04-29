import { useEffect, useState, useRef } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import {
    TextInput,
    Button,
    Card,
    Text,
    ActivityIndicator,
    useTheme,
} from "react-native-paper";

import { useMessageStore } from "../stores/useMessageStore";
import { useAuthStore } from "../stores/useAuthStore";
import useListenMessages from "../utils/useListenMessages";

export default function ChatScreen({ route, navigation }) {
    const theme = useTheme();
    const { user } = useAuthStore();
    const { user: otherUser } = route.params;
    const { messages, fetchMessages, sendMessage, clearMessages, loading } =
        useMessageStore();
    const [text, setText] = useState("");
    const flatListRef = useRef(null);

    useListenMessages();

    useEffect(() => {
        fetchMessages(otherUser._id);
        navigation.setOptions({ title: otherUser.username });
        return () => clearMessages();
    }, [otherUser._id, fetchMessages, clearMessages]);

    useEffect(() => {
        setTimeout(() => {
            if (flatListRef.current) {
                flatListRef.current.scrollToEnd({ animated: true });
            }
        }, 500);
    }, [loading, messages]);

    const handleSend = async () => {
        if (text.trim()) {
            await sendMessage(otherUser._id, text);
            setText("");
        }
    };

    useEffect(() => {
        if (flatListRef.current && messages.length > 0) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const renderItem = ({ item }) => {
        const isMyMessage = item.senderId === user._id;
        return (
            <Card
                style={[
                    styles.messageCard,
                    {
                        alignSelf: isMyMessage ? "flex-end" : "flex-start",
                        backgroundColor: isMyMessage
                            ? theme.colors.primaryContainer
                            : theme.colors.surfaceVariant,
                    },
                ]}
            >
                <Card.Content>
                    <Text style={{ color: theme.colors.onSurface }}>
                        {item.message}
                    </Text>
                </Card.Content>
            </Card>
        );
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
        >
            {loading ? (
                <ActivityIndicator
                    style={{
                        padding: 10,
                    }}
                    animating={true}
                    size={"large"}
                />
            ) : (
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item, index) => item._id || index.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: 10 }}
                />
            )}
            <View style={styles.inputContainer}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder="Type a message..."
                    mode="outlined"
                    style={styles.textInput}
                    placeholderTextColor={theme.colors.onSurfaceVariant}
                    contentStyle={{ paddingVertical: 8 }} // Better vertical padding inside input
                />
                <Button
                    onPress={handleSend}
                    mode="contained"
                    style={styles.sendButton}
                    contentStyle={styles.sendButtonContent}
                    labelStyle={styles.sendButtonLabel}
                >
                    Send
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messageCard: {
        margin: 5,
        maxWidth: "70%",
    },
    inputContainer: {
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        borderTopWidth: 1,
    },
    textInput: {
        flex: 1,
        marginRight: 8,
        // borderRadius: 40,
    },
    sendButton: {
        borderRadius: 20,
    },
    sendButtonContent: {
        paddingHorizontal: 6,
        paddingVertical: 6,
    },
    sendButtonLabel: {
        fontSize: 14,
        fontWeight: "bold",
    },
});
