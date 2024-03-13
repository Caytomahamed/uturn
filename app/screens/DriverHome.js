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
import HomeTopInfo from '../components/Home/HomeTopInfo';
import ScheduleDriver from '../components/Schedule/ScheduleDriver';
import { Avatar } from 'react-native-paper';

const DriverHome = () => {
  const navigation = useNavigation();
  // const { recovery } = route.params;
  // console.log(recovery);

  const data = {
    scheduleId: 4,
    driverId: 1,
    statusName: 'Scheduled',
    price: 25.99,
    start: 'Calamadaha',
    finish: 'UOH',
    description: 'Route Description',
    driverAddress: 'Driver Address',
    driverAvailable: 1,
    driverFirstName: 'John',
    driverLastName: 'Doe',
    driverEmail: 'cayto@gmail.com',
    driverPhone: 1234567890,
    scheduleCreatedAt: '2023-11-25 13:15:41',
    scheduleUpdatedAt: '2023-11-25 13:15:41',
    carType: 'Noha',
    model: 'Ml30',
    year: 2002,
  };

  const driverData = [
    {
      title: 'Cali Jamac',
      phone: 4238383,
      pickupLocation: 'Gacanta',
    },
    {
      title: 'Cali Jamac',
      phone: 6828746,
      pickupLocation: 'Star',
    },
    {
      title: 'Cali Jamac',
      phone: 3892013,
      pickupLocation: 'Masalaha',
    },
    {
      title: 'Cali Jamac',
      phone: 83648284,
      pickupLocation: 'M.A.A',
    },
  ];
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
            backgroundColor: colors.secondary,
            opacity: 0.95,
            borderBottomLeftRadius: 18, // Adjust radius as needed
            borderBottomRightRadius: 18, // Adjust radius as needed
          }}
          className="px-3 pt-3"
        >
          <HomeTopInfo />
          <Text
            className="text-white text-4xl font-semibold opacity-80 mt-4"
            style={{ fontFamily: 'Roboto-Medium' }}
          >
            Find ride that{' '}
          </Text>
          <Text
            className="text-white text-4xl font-semibold opacity-80"
            style={{ fontFamily: 'Roboto-Medium' }}
          >
            suit your lifestyle
          </Text>
        </View>
      </ImageBackground>

      <View
        className="mx-3 bg-white rounded-2xl pb-3"
        style={{
          transform: [{ translateY: -60 }],
          shadowColor: 'rgba(0,0,0,0.5)',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          elevation: 20, // This is for Android
          height: 184,
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
                {data.start}
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
              <Text className="text-lg font-bold">{data.finish}</Text>
            </View>
            <View>
              <Text className="text-xl font-bold" style={{ color: '#194AF9' }}>
                #34AVS
              </Text>
              <Text className="text-gray-400"> Schedule Id</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          transform: [{ translateY: -60 }],
          shadowColor: 'rgba(0,0,0,0.5)',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          elevation: 20, // This is for Android
        }}
        className="mx-3 mt-1"
      >
        <View className="bg-white px-4 pb-3 mt-3  shadow-xl rounded-lg">
          <Text className="mt-4 mb-2 text-xl font-bold">Passengers Detail</Text>

          {driverData.map((item) => (
            <View className="flex-row items-center my-2 " key={item.title}>
              <Avatar.Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq5X8mGpTG-HghdNFIS1rhvMQXTYBNlcft3Q&usqp=CAU',
                }}
                size={50}
              />
              <View className="ml-2">
                <Text className="text-lg font-bold">{item.title}</Text>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="call-outline" size={18} color="black" />
                  <Text className="text-gray-500">{item.phone}</Text>
                </View>
                <View className="flex-row items-center gap-1 mt-2">
                  <Ionicons name="location-outline" size={18} color="black" />
                  <Text className="text-gray-500">{item.pickupLocation}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={{ height: 80 }}></View>
    </ScrollView>
  );
};

export default DriverHome;
