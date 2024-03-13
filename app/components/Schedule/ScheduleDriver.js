import { View, Text } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ScheduleDriver = ({ booked, recovery }) => {
  const driverData = [
    {
      title: 'Cali Jamac',
      icon: 'badge',
      value: 4444444,
    },
    {
      title: 'Cummar Abdi',
      icon: 'local-taxi',
      value: 'make, model, and color.',
    },
    {
      title: 'Faadumo Cali',
      icon: 'directions-car',
      value: 'Noha',
    },
    {
      title: 'Maxamed Xirsi',
      icon: 'directions-car',
      value: 'Noha',
    },
  ];

  return (
    <View className="bg-white px-4 pb-3 mt-3  shadow-xl rounded-lg">
      <Text className="mt-4 mb-2 text-xl font-bold">Driver Details</Text>

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
            <Text className="text-gray-500">{item.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ScheduleDriver;
