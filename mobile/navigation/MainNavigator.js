import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import UsersListScreen from "../screens/UsersListScreen";
import SingleChatScreen from "../screens/SingleChatScreen";

const config = Platform.select({
    web: { headerMode: "screen" },
    default: {}
});

const UsersListStack = createStackNavigator(
    {
        UsersList: UsersListScreen,
        SingleChat: SingleChatScreen
    },
    config
);

export default UsersListStack;
