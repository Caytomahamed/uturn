import { View, Text, ImageBackground, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';

import colors from '../constant/Colors';

import HomeTopInfo from '../components/Home/HomeTopInfo';

import CarTypes from '../components/Home/CarTypes';
import CarCardHorizantal from '../components/CarCards/CarCardHorizantal';
import CompaniesCard from '../components/Companies/CompaniesCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  appSelectSchedules,
  getScheduleByAddress,
} from '../store/slices/schedules';
import { appSelectUsers, getCurrentUser } from '../store/slices/users';
import CustomButton from '../components/Customs/CustomButton';
import * as Notifications from 'expo-notifications';
import usePushNotifications from '../hooks/usePushNotifications ';
import { useFocusEffect } from '@react-navigation/native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const HomeScreen = () => {
  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        subtitle: 'me jsdasdf',
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }
  const dispatch = useDispatch();
  console.log('1');
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCurrentUser());
    }, [dispatch])
  );
  // Get notification token of devices
  const pushToken = usePushNotifications();
  console.log('home', pushToken);
  const { list, isLoading, userType } = useSelector(appSelectSchedules);
  const { token, currentUser } = useSelector(appSelectUsers);

  useEffect(() => {
    dispatch(getScheduleByAddress());
  }, [token]);

  // useEffect(() => {
  //   const backgroudSubscription = Notifications.addNotificationReceivedListener(
  //     (notification) => console.log(notification)
  //   );
  // });

  console.log('2');

  return (
    <ScrollView className="flex-1 ">
      <ImageBackground
        className="h-60 "
        source={require('../assets/noha.jpg')}
        resizeMode="cover"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: colors.secondary,
            opacity: 0.95,
            borderBottomLeftRadius: 18, // Adjust radius as needed
            borderBottomRightRadius: 18, // Adjust radius as needed
          }}
          className="px-3 pt-3"
        >
          <HomeTopInfo />
          <View className="mt-4">
            <Text
              className="text-white text-4xl font-semibold opacity-80"
              style={{ fontFamily: 'Roboto-Medium' }}
            >
              Find car that{' '}
            </Text>
            <Text
              className="text-white text-4xl font-semibold opacity-80"
              style={{ fontFamily: 'Roboto-Medium' }}
            >
              suit your lifestyle
            </Text>
          </View>
        </View>
      </ImageBackground>
      {console.log('3')}

      <View
        className="mx-4 p-5 bg-white rounded-3xl "
        style={{
          transform: [{ translateY: -50 }],
          shadowColor: 'rgba(0,0,0,0.5)',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          elevation: 20, // This is for Android
        }}
      >
        <CarTypes />
      </View>
      <View className="p-3" style={{ transform: [{ translateY: -25 }] }}>
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-medium">
            Available cars in{' '}
            {currentUser
              ? `"${currentUser.address
                  .slice(0, 1)
                  .toUpperCase()}${currentUser.address.slice(
                  1,
                  currentUser.address.length
                )}"`
              : 'xafada'}
          </Text>
        </View>

        {console.log('4')}

        {list && list.length > 0 ? (
          <FlatList
            data={list}
            renderItem={({ item }) => <CarCardHorizantal data={item} />}
            keyExtractor={(item) => item.scheduleId}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <View
            className="bg-white rounded-3xl h-48 overflow-hidden"
            style={{
              shadowColor: 'rgba(0,0,0,0.5)',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 1,
              elevation: 20, // This is for Android
            }}
          >
            <ImageBackground
              source={require('../assets/road.jpeg')}
              className="h-full w-full border-rounded-lg "
              resizeMode="cover"
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#486FFA',
                  opacity: 0.9,
                }}
                className="p-5"
              >
                <Text className="text-lg text-white">
                  ✅ Not found in car 🚗🚕🚔 in your registration address
                  (Xafada).
                </Text>
                <Text className="text-lg text-white">
                  ✅ So, recommended to use search.
                </Text>
                <Text className="text-lg text-white">
                  ✅ To get more information, contact our call center to
                  clarify. "508"
                </Text>
              </View>
            </ImageBackground>
          </View>
        )}
      </View>
      {console.log('5')}
      <View className="p-3" style={{ transform: [{ translateY: -40 }] }}>
        <Text
          className="text-xl font-bold"
          style={{ fontFamily: 'Roboto-Medium' }}
        >
          Frequently Visited
        </Text>
        <View>
          <CompaniesCard />
          <CompaniesCard />
        </View>
      </View>
      {/* <CustomButton
        title="Notification"
        filled
        onPress={schedulePushNotification}
      /> */}
      <View style={{ height: 120 }}></View>
    </ScrollView>
  );
};

export default HomeScreen;
