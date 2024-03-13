import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react';
import CarCardVertical from '../components/CarCards/CarCardVertical';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { appSelectBooking, getRides } from '../store/slices/bookings';
import { useFocusEffect } from '@react-navigation/native';

const RideScreen = () => {
  const dispatch = useDispatch();

  const { list, offDayLoading, error, unBookingLoading, isLoading } =
    useSelector(appSelectBooking);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getRides());
    }, [dispatch])
  );

  return (
    <View className="px-1 pt-3">
      <View className=" mx-2 shadow-xl flex-row justify-between items-center mb-3">
        <Text
          className="text-black opacity-80 text-2xl font-bold"
          style={{ fontFamily: 'Roboto-Medium' }}
        >
          Your Ride
        </Text>

        <Ionicons name="car" size={30} color="#000" />
      </View>
      <Text className="text-lg px-3 font-bold">My Ride</Text>

      {/* <CarCardVertical data={{}} /> */}

      {list &&
        list.length !== 0 &&
        list.map((item) => <CarCardVertical data={item} key={item.driverId} />)}

      {/* <Text className="text-lg px-3 font-bold mt-5">Recovery</Text>
      <CarCardVertical data={data} recovery={true} />

      <View className="mt-5 px-3">
        <Text className="text-lg">Recovery car description</Text>
      </View> */}

      {error && list.length === 0 && (
        <View className="justify-center items-center opacity-20 mt-40">
          {/* <Image src={require('../assets/noha.jpg')} className="w-20 h-20" /> */}
          <Ionicons name="car-outline" size={130} color="#808080" />
          <Text>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default RideScreen;
