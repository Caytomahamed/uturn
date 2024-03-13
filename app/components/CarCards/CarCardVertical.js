import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../../constant/Colors';

const CarCardVertical = ({ data = {}, recovery, search }) => {
  const navigation = useNavigation();
  console.log('hellow');

  const { offToday } = data;

  const rideColor =
    (recovery && colors.warning) || (offToday && colors.success) || '#fff';

  const textColor =
    ((recovery || offToday) && 'text-white font-bold') ||
    'text-gray-400 font-bold';

  const screen = search || 'RideDetailScreen';
  return (
    <>
      <TouchableOpacity
        className="mx-3 border-t-2 border-gray-200 "
        onPress={() =>
          Object.keys(data).length > 0 &&
          navigation.navigate(screen, { data, recovery, offToday })
        }
      >
        {Object.keys(data).length > 0 ? (
          <View
            className=" flex-row overflow-hidden"
            style={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              backgroundColor: rideColor,
            }}
          >
            <Image
              source={{
                uri: data.carImg,
              }}
              className="h-full w-32 mr-2 bg-cover"
            />

            <View className=" h-full flex-1 flex-row p-4 justify-between">
              <View>
                <View className="mb-2">
                  <Text className={textColor}>Car type</Text>
                  <Text className="text-lg font-bold capitalize">
                    {data.carType}
                  </Text>
                </View>
                <View>
                  <Text className={textColor}>Car Seat</Text>
                  <Text className="text-lg font-bold">4 Seat</Text>
                </View>
              </View>

              <View>
                <View className="mb-2">
                  <Text className={textColor}>Seat Left</Text>
                  <View className="flex-row ">
                    {/* <Ionicons name="seat" size={20} color="yellow" /> */}
                    <Text className="text-lg font-bold ml-1">
                      {data.seatsLeft} Seats
                    </Text>
                  </View>
                </View>
                <View>
                  <Text
                    className="text-xl font-bold"
                    style={{ color: '#194AF9' }}
                  >
                    ${Math.floor(parseFloat(data.price))}
                  </Text>
                  <Text className={textColor}>/person</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View
            className=" flex-row overflow-hidden"
            style={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              backgroundColor: rideColor,
            }}
          >
            <View className="h-full w-32 mr-2 bg-cover bg-gray-200 justify-center items-center"></View>

            <View className=" h-full flex-1 flex-row p-4 justify-between">
              <View>
                <View className="mb-2">
                  <Text className="text-gray-400">Car type</Text>
                  <Text className="text-lg font-bold capitalize bg-gray-200"></Text>
                </View>
                <View>
                  <Text className="text-gray-400">Car Seat</Text>
                  <Text className="text-lg font-bold bg-gray-200"></Text>
                </View>
              </View>

              <View>
                <View className="mb-2">
                  <Text className="text-gray-400">Seat Left</Text>
                  <View className="flex-row ">
                    <Text className="text-lg font-bold ml-1 bg-gray-200 w-16"></Text>
                  </View>
                </View>
                <View>
                  <Text className="text-lg  text-gray-400">person</Text>
                  <Text className="text-gray-400 bg-gray-200"></Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
      <Text
        style={{
          color: 'darkgray',
          fontSize: 16,

          marginHorizontal: 10,
          marginVertical: 10,
          // textAlign: 'center',
        }}
      >
        {!search && offToday
          ? 'You have successfully marked this booking as off today.'
          : 'This booking is currently active.'}
      </Text>
    </>
  );
};

export default CarCardVertical;
