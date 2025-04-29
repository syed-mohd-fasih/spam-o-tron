import { Text } from "react-native-paper";

export default function MessageBubble({ messageItem }) {
    const { user } = useAuthStore();

    const isMyMessage = messageItem.senderId === user._id;
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
                    {messageItem.message}
                </Text>
            </Card.Content>
        </Card>
    );
}
