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

const Tab = createBottomTabNavigator();

const TabBar = () => {
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
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <TabBarIcons focused={focused} iconName="home" title="Home" />
          ),
        }}
      />
      <Tab.Screen
        name="RideScreen"
        component={RideScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcons focused={focused} iconName="ride" title="myride" />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchingScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/search.png')}
              style={{ width: 40, height: 40, tintColor: '#Fff', left: 2 }}
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
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
export default TabBar;
