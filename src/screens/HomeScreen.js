import { useEffect, useState, useContext } from "react";
import { View, FlatList } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { Avatar, List, IconButton } from "react-native-paper";
import axios from "../utils/api";

export default function HomeScreen({ navigation }) {
    const [users, setUsers] = useState([]);
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        axios.get("/users").then((res) => setUsers(res.data));
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={users}
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
        </View>
    );
}
