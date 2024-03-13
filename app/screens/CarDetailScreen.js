import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ScheduleCarInfo from '../components/Schedule/ScheduleCarInfo';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { bookingNow } from '../store/slices/bookings';
import CustomPopup from '../components/Customs/CustomPopup';
import colors from '../constant/Colors';

const CarDetailScreen = ({ route }) => {
  const [visible, setVisisble] = useState(false);

  const show = () => setVisisble(true);
  const hide = () => setVisisble(false);
  const { data } = route.params;
  const navigation = useNavigation();

  const handleBookingProcess = () => {
    navigation.navigate('BookingProcess', { data });
  };
  return (
    <View className="flex-1">
      <ImageBackground
        source={{
          uri: data.carImg,
        }}
        className="h-64 bg-white"
      >
        <TouchableOpacity
          className="ml-3 mt-4 w-10 h-10 justify-center items-center rounded-full absolute"
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: '#1D2926' }}
        >
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </ImageBackground>

      {/*body*/}
      <ScheduleCarInfo data={data} />

      {/* action  */}
      <View
        className="rounded-t-3xl bg-red-400"
        style={{ backgroundColor: '#26272D' }}
      >
        <View className="flex-row justify-between px-4 py-6 items-center">
          <Text className="text-gray-400 text-xl">
            {data.seatsLeft} Seat Left
          </Text>
          <Text className="text-white text-2xl">
            ${Math.floor(parseFloat(data.price))}/month
          </Text>
        </View>

        <View className="bg-white px-4 py-5 rounded-t-3xl">
          <Button
            className="text-white
           p-2 text-4xl "
            textColor="white"
            style={{ backgroundColor: '#194AF9' }}
            onPress={handleBookingProcess}
          >
            Booking
          </Button>
        </View>
      </View>
    </View>
  );
};

export default CarDetailScreen;
