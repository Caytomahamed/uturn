import { View, Text, ImageBackground, Image, Button } from 'react-native';
import React from 'react';
import colors from '../../constant/Colors';
import { Shadow } from 'react-native-shadow-2';

const CompaniesCard = () => {
  return (
    <View className="mt-12">
      <View
        style={{
          position: 'absolute',
          left: 25,
          top: -26,
          zIndex: 1,
        }}
      >
        <Shadow
          distance={10}
          offset={[3, 4]}
          className="w-16 h-16 bg-white rounded-full overflow-hidden p-1 "
        >
          <View
            className="w-full bg-white h-full rounded-full box-border  overflow-hidden"
            style={{
              borderColor: '#f0f0f0',
              borderWidth: 1,
            }}
          >
            <Image
              source={require('../../assets/noha.jpg')}
              className="h-full w-full "
              style={{ resizeMode: 'center' }}
            />
          </View>
        </Shadow>
      </View>

      <Shadow
        distance={15}
        offset={[1, 2]}
        className="h-56 w-full  "
        style={{
          overflow: 'hidden',
          borderRadius: 20,
        }}
      >
        <ImageBackground
          source={require('../../assets/road.jpeg')}
          className="h-full w-full border-rounded-lg "
          resizeMode="cover"
        >
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              opacity: 0.9,
            }}
            className="px-3 pt-3"
          >
            {/* COMPONY INFO  */}
            <View
              style={{
                position: 'absolute',
                top: 50,
              }}
              className="pl-5"
            >
              <Text
                className="text-xl font-bold capitalize"
                style={{ fontFamily: 'Roboto-Medium' }}
              >
                Company name
              </Text>

              <Text className="text-gray-500 mt-2" style={{ fontSize: 17 }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima
                nam incidunt
              </Text>

              <View className="flex-row justify-between mt-5">
                <Shadow distance={8} offset={[1, 2]}>
                  <View
                    style={{
                      backgroundColor: '#DEF4E8',
                      paddingHorizontal: 23,
                      paddingVertical: 13,
                      borderRadius: 10,
                    }}
                  >
                    <Text className="text-lg capitalize text-green-800">
                      🌟 4.5/5
                    </Text>
                  </View>
                </Shadow>
                <Shadow distance={1} offset={[1, 2]}>
                  <View
                    style={{
                      backgroundColor: '#486FFA',
                      paddingHorizontal: 22,
                      paddingVertical: 13,
                      borderRadius: 10,
                      marginLeft: 10,
                    }}
                    className="flex-row"
                  >
                    <Text className="text-xl capitalize text-white font-bold">
                      average $23/
                    </Text>
                    <Text className="text-lg capitalize text-gray-300">
                      Seats
                    </Text>
                  </View>
                </Shadow>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Shadow>
    </View>
  );
};

export default CompaniesCard;
