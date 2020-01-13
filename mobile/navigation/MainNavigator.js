import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import ListUsersScreen from '../screens/ListUsersScreen';
import SingleChatScreen from '../screens/SingleChatScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ListUsersStack = createStackNavigator(
  {
    ListUsers: ListUsersScreen,
    SingleChat: SingleChatScreen,
  },
  config
);

export default ListUsersStack;
