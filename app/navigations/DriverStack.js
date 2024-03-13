import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import HomeScreen from '../screens/HomeScreen';
import SearchingScreen from '../screens/SearchingScreen';
import RideScreen from '../screens/RideScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';

// Component
import TabBarIcons from '../components/TabBar/TabBarIcons';
import CustomTabBarButton from '../components/TabBar/CustomTabBarButton';
import DriverHome from '../screens/DriverHome';
import DriverProfileScreen from '../screens/DriverProfileScreen';


const Tab = createBottomTabNavigator();

const DriverStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#FFf',
          borderRadius: 15,
          height: 90,
          ...style.shadow,
        },
      }}
    >
      <Tab.Screen
        name="DriverHomeScreen"
        component={DriverHome}
        options={{
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <TabBarIcons focused={focused} iconName="home" title="Home" />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcons
              focused={focused}
              iconName="notifications"
              title="notification"
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcons focused={focused} iconName="profile" title="profile" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
export default DriverStack;
