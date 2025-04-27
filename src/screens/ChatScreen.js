import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { TextInput, Button, Card, Text } from "react-native-paper";

import { useMessageStore } from "../stores/useMessageStore";
import { useAuthStore } from "../stores/useAuthStore";

export default function ChatScreen({ route }) {
    const { user } = useAuthStore();
    const { user: otherUser } = route.params;
    const { messages, fetchMessages, sendMessage, clearMessages } =
        useMessageStore();
    const [text, setText] = useState("");

    useEffect(() => {
        fetchMessages(otherUser._id);
        return () => clearMessages();
    });

    const handleSend = async () => {
        if (text.trim()) {
            await sendMessage(otherUser._id, text);
            setText(""); // Clear the input after sending
        }
    };

    const renderItem = ({ item }) => {
        const isMyMessage = item.senderId === user._id;
        return (
            <Card
                style={[
                    styles.messageCard,
                    isMyMessage ? styles.myMessage : styles.theirMessage,
                ]}
            >
                <Card.Content>
                    <Text>{item.message}</Text>
                    {/* Optional: Show timestamp later if you want */}
                    {/* <Text variant="labelSmall">{new Date(item.createdAt).toLocaleTimeString()}</Text> */}
                </Card.Content>
            </Card>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingVertical: 10 }}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder="Type a message..."
                    mode="outlined"
                    style={styles.textInput}
                />
                <Button
                    onPress={handleSend}
                    mode="contained"
                    style={styles.sendButton}
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
    myMessage: {
        alignSelf: "flex-end",
        backgroundColor: "#DCF8C5", // Light green for sent messages
    },
    theirMessage: {
        alignSelf: "flex-start",
        backgroundColor: "#FFFFFF", // White for received messages
    },
    inputContainer: {
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
    },
    textInput: {
        flex: 1,
        marginRight: 10,
    },
    sendButton: {
        alignSelf: "center",
    },
});
