import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const CarCardHorizantal = ({ data }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="bg-white w-56 mx-2  rounded-3xl overflow-hidden mb-3"
      onPress={() => navigation.navigate('CarDetailScreen', { data })}
      style={{
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: { width: 10, height: 2 },
        shadowOpacity: 1,
        elevation: 8, // This is for Android
      }}
    >
      <View>
        <Image
          source={{
            uri: data.carImg,
          }}
          className="h-36"
        />

        {/* details  */}
        <View className="p-2 ">
          <Text
            className="text-xl text-capitalize font-bold capitalize"
            style={{ fontFamily: 'Roboto-Medium' }}
          >
            {data.carType} {data.model}
          </Text>

          <View className="flex-row items-center my-2 ">
            <Icon name="location-enter" size={22} color="#194AF9" />
            <Text className="text-lg text-gray-500 ml-1">{data.start}</Text>
          </View>

          <View className="flex-row justify-between">
            <View className="flex-row justify-between items-center">
              <Icon name="car" size={25} color="#194AF9" />
              <Text className="text-lg font-bold ml-1">4 Seats</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Icon name="circle-multiple-outline" size={22} color="#194AF9" />
              <Text className="text-lg font-bold ml-1">
                ${Math.floor(parseFloat(data.price))}/mon
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CarCardHorizantal;
