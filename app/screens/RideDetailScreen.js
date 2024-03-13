import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Button,
  Pressable,
} from 'react-native';
import React from 'react';
import ScheduleDriverProfile from '../components/Schedule/ScheduleDriverProfile';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../constant/Colors';
import { useDispatch } from 'react-redux';
import {
  getRides,
  rideOffToday,
  unBookingRide,
} from '../store/slices/bookings';
import usePushNotifications from '../hooks/usePushNotifications ';

const RideDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { data, recovery, offToday } = route.params;

  const dispatch = useDispatch();

  const pushToken = usePushNotifications();
  const handleOffToday = () => {
    dispatch(
      rideOffToday(data.bookingId, { offToday: !data.offToday }, pushToken)
    );
    dispatch(getRides());
    navigation.navigate('RideScreen');
  };

  const handleUnBooking = () => {
    dispatch(unBookingRide(data.bookingId, pushToken));
    dispatch(getRides());
    navigation.navigate('RideScreen');
  };
  const rideColor =
    (recovery && colors.warning) ||
    (offToday && colors.success) ||
    colors.secondary;
  return (
    <ScrollView>
      <ImageBackground
        className="h-60 "
        source={require('../assets/noha.jpg')}
        resizeMode="cover"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: rideColor,
            opacity: 0.95,
            borderBottomLeftRadius: 18, // Adjust radius as needed
            borderBottomRightRadius: 18, // Adjust radius as needed
          }}
          className="px-3 pt-3"
        >
          <View className="shadow-xl flex-row justify-between items-center">
            <TouchableOpacity
              className="justify-center items-center rounded-full"
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>

            <Text
              className="text-white opacity-80 text-2xl font-bold"
              style={{ fontFamily: 'Roboto-Medium' }}
            >
              Booking Ride
            </Text>

            <Ionicons name="book" size={30} color="#fff" />
          </View>
        </View>
      </ImageBackground>

      <View
        className="mx-3 bg-white rounded-2xl pb-3"
        style={{
          transform: [{ translateY: -120 }],
          shadowColor: 'rgba(0,0,0,0.5)',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          elevation: 20, // This is for Android
        }}
      >
        <Text className="text-lg font-bold px-3 pt-4">Ride Information</Text>
        <View className=" h-full flex-1 flex-row p-4 justify-between">
          <View>
            <View className="mb-2">
              <Text
                className="text-gray-400"
                style={{ fontFamily: 'Roboto-Medium' }}
              >
                PickupLocation
              </Text>
              <Text
                className="text-lg font-bold"
                style={{ fontFamily: 'Roboto-Regular' }}
              >
                {data.pickuplocation}
              </Text>
            </View>
            <View>
              <Text className="text-gray-400">Payment Status</Text>
              <Text className="text-lg font-bold">Confirmed</Text>
            </View>
          </View>

          <View>
            <View className="mb-2">
              <Text className="text-gray-400">DropOffLocation</Text>
              <Text className="text-lg font-bold"> {data.pickuplocation}</Text>
            </View>
            <View>
              <Text className="text-xl font-bold" style={{ color: '#194AF9' }}>
                #BR{data.bookingId}
              </Text>
              <Text className="text-gray-400"> Booking ID</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          transform: [{ translateY: -110 }],
          shadowColor: 'rgba(0,0,0,0.5)',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          elevation: 20, // This is for Android
        }}
        className="mx-3 mt-1"
      >
        <ScheduleDriverProfile
          booked={true}
          rideColor={rideColor}
          data={data}
        />
      </View>

      {/* Call action  */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={{
            backgroundColor: rideColor,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            marginHorizontal: 15,
            borderRadius: 20,
            transform: [{ translateY: -80 }],
            paddingHorizontal: 20,
            paddingVertical: 12,
            flex: 1,
            // cursor: 'not-allowed',
            // opacity: offToday ? 0.8 : 1,
          }}
          // disabled={offToday ? true : false}
          className="cursor-not-allowed"
          onPress={handleOffToday}
        >
          <Text
            className="text-lg text-white font-semibold mx-3 capitalize"
            style={{ fontFamily: 'Roboto-Medium' }}
          >
            Off today
          </Text>
        </TouchableOpacity>
        {!recovery && (
          <TouchableOpacity
            style={{
              backgroundColor: rideColor,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
              marginHorizontal: 15,
              borderRadius: 20,
              transform: [{ translateY: -80 }],
              paddingHorizontal: 20,
              paddingVertical: 12,
              flexDirection: 'row',
            }}
            onPress={handleUnBooking}
          >
            <Text
              className="text-lg text-white font-semibold capitalize"
              style={{ fontFamily: 'Roboto-Medium' }}
            >
              Cancle
            </Text>
            <Text
              className="text-white"
              style={{ fontFamily: 'Roboto-Medium' }}
            >
              (unBooked)
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default RideDetailScreen;
