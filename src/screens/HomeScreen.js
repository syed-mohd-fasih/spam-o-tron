import { useEffect } from "react";
import { View, FlatList } from "react-native";
import { Avatar, List, IconButton } from "react-native-paper";

import { useConversationStore } from "../stores/useConversationStore";
import { useAuthStore } from "../stores/useAuthStore";

export default function HomeScreen({ navigation }) {
    const { conversations, fetchConversations, loading } =
        useConversationStore();
    const logout = useAuthStore((state) => state.logout);

    useEffect(() => {
        fetchConversations();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={conversations}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <List.Item
                        title={item.fullName}
                        description={item.username}
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
                )}
            />
            <IconButton icon="logout" onPress={logout} />
            <IconButton
                icon="cog"
                onPress={() => {
                    navigation.navigate("Settings");
                }}
            />
        </View>
    );
}
