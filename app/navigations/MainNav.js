import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {
  appSelectUsers,
  checkAuth,
  getCurrentUser,
} from '../store/slices/users';
import { ActivityIndicator } from 'react-native-paper';
import colors from '../constant/Colors';
import DriverStack from './DriverStack';
import Loading from '../components/Loading/Loading';

const MainNav = () => {
  const dispatch = useDispatch();
  const { token, userType, error, currentUserLoading } =
    useSelector(appSelectUsers);
  const isLoading = useSelector((state) => state.entities.users.isLoading);

  // console.log(typeof userType);

  useEffect(() => {
    dispatch(checkAuth());
  }, [token, error]);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  console.log('C');

  if (isLoading) {
    // Show a loading indicator here
    return (
      <View className="flex-1 bg-blue-100">
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={{ backgroundColor: 'white', padding: 40, borderRadius: 10 }}
          >
            <ActivityIndicator size={40} color={colors.secondary} />
          </View>
        </View>
      </View>
    );
  }
  console.log('d');
  return (
    <NavigationContainer>
      {token !== null ? (
        userType === '2' ? (
          <DriverStack />
        ) : (
          <AppStack />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default MainNav;
