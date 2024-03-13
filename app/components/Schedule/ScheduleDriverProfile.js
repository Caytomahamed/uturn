import { View, Text } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ScheduleDriverProfile = ({ booked, rideColor, data }) => {
  const driverData = [
    {
      title: "Driver's ID",
      icon: 'badge',
      value: `#00${data.driverId}`,
    },
    {
      title: 'Car Details',
      icon: 'local-taxi',
      value: `${data.make}, ${data.model}, ${data.color}`,
    },
    {
      title: 'Vehicle Type',
      icon: 'directions-car',
      value: `${data.carType}`,
    },
  ];

  const driverDataBooked = [
    {
      title: 'Driver Phone Number',
      icon: 'phone',
      value: 4444444,
    },
    {
      title: 'Plate Number',
      icon: 'credit-card',
      value: 4444,
    },
  ];

  return (
    <View className="bg-white px-4 pb-3 mt-3  shadow-xl rounded-lg">
      <Text className="text-lg font-medium my-1 text-gray-400">
        Driver Information
      </Text>

      <View className="flex-row justify-between items-center ">
        <View className="flex-row items-center">
          <Avatar.Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq5X8mGpTG-HghdNFIS1rhvMQXTYBNlcft3Q&usqp=CAU',
            }}
            size={40}
          />
          <Text className="text-xl ml-2 font-bold capitalize">
            {data.driverFirstName} {data.driverLastName}
          </Text>
        </View>
        <Text className="text-lg font-bold">🌟4.5/5</Text>
      </View>

      <Text className="mt-4 mb-2 text-xl font-bold">
        Driver and Car Details
      </Text>

      {driverData.map((item) => (
        <View className="flex-row items-center my-2 " key={item.title}>
          <View
            className=" w-12 h-12 justify-center items-center rounded-md "
            style={{ backgroundColor: rideColor }}
          >
            <Icon name={item.icon} size={30} color="white" />
          </View>
          <View className="ml-2">
            <Text className="text-lg font-bold">{item.title}</Text>
            <Text className="text-gray-500 capitalize">{item.value}</Text>
          </View>
        </View>
      ))}

      {booked &&
        driverDataBooked.map((item) => (
          <View className="flex-row items-center my-2 " key={item.title}>
            <View
              className=" w-12 h-12 justify-center items-center rounded-md "
              style={{ backgroundColor: rideColor }}
            >
              <Icon name={item.icon} size={30} color="white" />
            </View>
            <View className="ml-2">
              <Text className="text-lg font-bold">{item.title}</Text>
              <Text className="text-gray-500 capitalize">{item.value}</Text>
            </View>
          </View>
        ))}
    </View>
  );
};

export default ScheduleDriverProfile;
