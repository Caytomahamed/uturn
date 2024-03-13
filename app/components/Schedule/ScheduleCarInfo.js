import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScheduleDriverProfile from './ScheduleDriverProfile';
import colors from '../../constant/Colors';

const ScheduleCarInfo = ({ booked, data }) => {
  const specification = [
    {
      title: 'Capacity',
      icon: 'people',
      value: `${data.capacity} Seat`,
    },
    {
      title: 'Car Make',
      icon: 'build',
      value: `${data.make}`,
    },
    {
      title: 'Car Color',
      icon: 'palette',
      value: `${data.color}`,
    },
  ];
  return (
    <ScrollView className="p-4">
      {/* name and description */}
      <View className="border-b border-gray-300">
        <Text className="text-3xl font-bold capitalize">
          {data.carType} {data.model}
        </Text>
        <Text className="my-2 text-gray-500 text-lg ">
          {`${data.description}`.split(',').map((text) => {
            const firstLetter = `${text}`.slice(0, 1).toUpperCase();
            const onther = `${text}`.slice(1, text.length);
            return `${firstLetter + onther},  `;
          })}
        </Text>
      </View>

      {/* locations  */}
      <View className="bg-white  py-2 px-3 mt-3 flex-row items-center round-md shadow-xl">
        <Icon name="location-on" size={30} color="#194AF9" />
        <Text className="text-lg ml-2 font-semibold">{data.start}</Text>
      </View>

      {/* specification */}
      <View className="mt-2">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl my-2 font-bold">Specification</Text>
        </View>

        <View className="flex-row justify-between my-2">
          {specification.map((item) => (
            <View
              className="w-28 px-4 py-3 shadow-2xl bg-blue-200 rounded-2xl"
              key={item.title}
            >
              <View className="w-10 h-10 bg-white justify-center items-center rounded-full">
                <Icon name={item.icon} size={30} color="#194AF9" />
              </View>
              <Text className="text-gray-500">{item.title}</Text>
              <Text className="text-lg font-bold capitalize">{item.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* driver profile  */}
      <ScheduleDriverProfile
        booked={booked}
        data={data}
        rideColor={colors.primary}
      />
    </ScrollView>
  );
};

export default ScheduleCarInfo;
