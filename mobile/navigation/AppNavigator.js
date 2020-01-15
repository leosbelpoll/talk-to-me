import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';

import MainTabNavigator from './MainTabNavigator';
import UsersListStack from './MainNavigator';
import SignInScreen from '../screens/SignInScreen'

const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Routers: UsersListStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  })
);
