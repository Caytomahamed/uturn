import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabBar from './TabBar';

import CarDetailScreen from '../screens/CarDetailScreen';
import RideDetailScreen from '../screens/RideDetailScreen';
import SearchingResult from '../screens/SearchingResult';
import BookingProcess from '../screens/BookingProcess';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabBar}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CarDetailScreen"
        component={CarDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RideDetailScreen"
        component={RideDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchingResult"
        component={SearchingResult}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BookingProcess"
        component={BookingProcess}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
