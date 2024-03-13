import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome';
import CreateAccount from '../screens/CreateAccount';
import PersonalInformation from '../screens/PersonalInformation';
import SetPicture from '../screens/SetPicture';
import SetPassword from '../screens/SetPassword';
import Login from '../screens/Login';

const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SetPicture"
        component={SetPicture}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SetPassword"
        component={SetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
