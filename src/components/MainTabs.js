import { useState } from "react";
import { BottomNavigation } from "react-native-paper";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";

export default function MainTabs({ navigation }) {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {
            key: "home",
            title: "Home",
            focusedIcon: "home",
            unfocusedIcon: "home-outline",
        },
        {
            key: "settings",
            title: "Settings",
            focusedIcon: "cog",
            unfocusedIcon: "cog-outline",
        },
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case "home":
                return <HomeScreen navigation={navigation} />;
            case "settings":
                return <SettingsScreen navigation={navigation} />;
            default:
                return null;
        }
    };

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            sceneAnimationEnabled={true}
        />
    );
}
