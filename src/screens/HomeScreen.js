import { useEffect } from "react";
import { View, FlatList } from "react-native";
import { Avatar, List, useTheme } from "react-native-paper";

import { useConversationStore } from "../stores/useConversationStore";
import { useSocketContext } from "../context/SocketContext";

import CustomHeader from "../components/CustomHeader";

export default function HomeScreen({ navigation }) {
    const { conversations, fetchConversations, clearConversations } =
        useConversationStore();
    const { onlineUsers } = useSocketContext();

    const theme = useTheme();

    useEffect(() => {
        fetchConversations();
        return () => {
            clearConversations();
        };
    }, []);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme.colors.background,
            }}
        >
            <CustomHeader title="Chats" />
            <FlatList
                data={conversations}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    const isOnline = onlineUsers.includes(item._id);
                    return (
                        <List.Item
                            title={item.fullName}
                            description={item.username}
                            left={() => (
                                <Avatar.Image
                                    size={48}
                                    source={{ uri: item.profilePic }}
                                />
                            )}
                            right={() =>
                                isOnline ? (
                                    <View
                                        style={{
                                            width: 15,
                                            height: 15,
                                            borderRadius: 8,
                                            backgroundColor: "green",
                                            marginRight: 10,
                                            alignSelf: "center",
                                        }}
                                    />
                                ) : null
                            }
                            onPress={() =>
                                navigation.navigate("Chat", { user: item })
                            }
                            style={{
                                backgroundColor: theme.colors.background,
                                padding: 15,
                            }}
                            titleStyle={{ color: theme.colors.onSurface }}
                            descriptionStyle={{
                                color: theme.colors.onSurfaceVariant,
                            }}
                        />
                    );
                }}
                contentContainerStyle={{ paddingBottom: 80 }}
            />
        </View>
    );
}
