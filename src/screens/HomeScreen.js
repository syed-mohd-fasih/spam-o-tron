import { useEffect } from "react";
import { View, FlatList } from "react-native";
import { Avatar, List, IconButton } from "react-native-paper";

import { useConversationStore } from "../stores/useConversationStore";
import { useAuthStore } from "../stores/useAuthStore";
import { useSocketContext } from "../context/SocketContext";

export default function HomeScreen({ navigation }) {
    const { conversations, fetchConversations, loading, clearConversations } =
        useConversationStore();
    const logout = useAuthStore((state) => state.logout);
    const { onlineUsers } = useSocketContext();

    useEffect(() => {
        fetchConversations();

        return () => {
            clearConversations(); // Clear conversations when component unmounts
        };
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={conversations}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    const isOnline = onlineUsers.includes(item._id); // ✅ Check each user separately
                    return (
                        <List.Item
                            title={item.fullName}
                            description={
                                item.username +
                                (isOnline ? " (Online)" : " (Offline)")
                            }
                            left={() => (
                                <Avatar.Image
                                    size={48}
                                    source={{ uri: item.profilePic }}
                                />
                            )}
                            onPress={() =>
                                navigation.navigate("Chat", { user: item })
                            }
                        />
                    );
                }}
            />
            <IconButton icon="logout" onPress={logout} />
            <IconButton
                icon="cog"
                onPress={() => navigation.navigate("Settings")}
            />
        </View>
    );
}
