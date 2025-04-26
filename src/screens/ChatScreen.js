import { useEffect, useState, useContext } from "react";
import { View, FlatList } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import axios from "../utils/api";
import { AuthContext } from "../contexts/AuthContext";

export default function ChatScreen({ route }) {
    const { user } = useContext(AuthContext);
    const { user: otherUser } = route.params;
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        axios
            .get(`/messages/${otherUser._id}`)
            .then((res) => setMessages(res.data));
    }, []);

    const sendMessage = async () => {
        await axios.post(`/messages/send/${otherUser._id}`, { message: text });
        setMessages((prev) => [...prev, { message: text, senderId: user._id }]);
        setText("");
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Card
                        style={{
                            margin: 5,
                            alignSelf:
                                item.senderId === user._id
                                    ? "flex-end"
                                    : "flex-start",
                        }}
                    >
                        <Card.Content>
                            <Text>{item.message}</Text>
                        </Card.Content>
                    </Card>
                )}
            />
            <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Type a message..."
            />
            <Button onPress={sendMessage}>Send</Button>
        </View>
    );
}
