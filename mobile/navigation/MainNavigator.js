import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import SingleChatScreen from "../screens/SingleChatScreen";

const config = Platform.select({
    web: { headerMode: "screen" },
    default: {}
});

const MainNavigator = createStackNavigator(
    {
        SingleChat: SingleChatScreen
    }
);

export default MainNavigator;
