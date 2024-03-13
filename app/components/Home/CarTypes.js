import { View, Text, Image } from 'react-native';
import React from 'react';

const CarTypes = () => {
  return (
    <View className="mt-4 ">
      <View className="flex-row  justify-around">
        <View className="items-center ">
          <View
            style={{
              width: 65,
              height: 65,
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: '#b0b0b0',
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <Image
              source={require('../../assets/noha.jpg')}
              className="w-full h-full"
              style={{ resizeMode: 'contain' }}
            />
          </View>
          <Text
            className="text-lg text-gray-400 font-semibold"
            style={{ fontFamily: 'Roboto-Medium' }}
          >
            Noha
          </Text>
        </View>
        <View className="items-center">
          <View
            style={{
              width: 65,
              height: 65,
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: '#b0b0b0',
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <Image
              source={require('../../assets/vitz.jpg')}
              className="w-full h-full"
              style={{ resizeMode: 'contain' }}
            />
          </View>
          <Text className="text-lg font-semibold text-gray-400">Vitz</Text>
        </View>
        <View className="items-center">
          <View
            style={{
              width: 65,
              height: 65,
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: '#b0b0b0',
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <Image
              source={require('../../assets/probox.jpg')}
              className="w-full h-full"
              style={{ width: 50, height: 50, resizeMode: 'contain' }}
            />
          </View>
          <Text
            className="text-lg font-semibold text-gray-400"
            style={{ fontFamily: 'Roboto-Medium' }}
          >
            Probox
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CarTypes;
