import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constant/Colors';

// success color = ""
const NotificationCard = ({ item }) => {
  const truncatedMessage =
    item.message.split(' ').slice(0, 10).join(' ') + '...';

  const iconsMap = {
    success: 'shield-sharp',
    warning: 'warning',
    update: 'help-circle',
    error: 'close-circle',
    chatbox: 'chatbox',
  };

  const icon = iconsMap[item.type] || iconsMap[chatbox];
  const color = colors[item.type] || colors[chatbox];

  return (
    <View
      className="bg-white flex-1 w-full mb-3  p-3"
      style={{
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        elevation: 5, // This is for Android
      }}
    >
      <View className="flex-1 flex-row ">
        <View
          className="w-14 h-14  rounded-full justify-center items-center"
          style={{ backgroundColor: color }}
        >
          <Ionicons name={icon} size={30} color="white" />
        </View>
        <View className="ml-3 break-words">
          <Text className="text-lg font-semibold ">{item.title}</Text>
          {/* <Text className="text-gray-500 text-lg">{item.message}</Text> */}
          <Text className="text-gray-500 ">
            {/* {isExpanded ? item.message : truncatedMessage}
            {item.message.length > 10 && (
              <Pressable onPress={() => setIsExpanded(true)}>
                <Text className="text-blue-500 underline">See more</Text>
              </Pressable>
            )} */}
            {item.message}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationCard;
