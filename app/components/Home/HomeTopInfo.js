import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react';

import { Ionicons } from '@expo/vector-icons';
import colors from '../../constant/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { appSelectUsers, getCurrentUser } from '../../store/slices/users';

const HomeTopInfo = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(appSelectUsers);

  // console.log('currentUser', currentUser);

  return (
    <View className="flex-row justify-between items-center">
      {/* Hi userName  */}
      <View>
        <Text
          className="text-xl pl-1 text-white"
          style={{ fontFamily: 'Roboto-Medium' }}
        >
          Hi {currentUser ? currentUser.firstname : 'users'}
        </Text>
      </View>

      {/* avatar and notification  */}
      <View className="flex-row items-center  ">
        <View
          className="w-10 h-10 rounded-lg justify-center items-center mr-2 shadow-md shadow-white"
          style={{ backgroundColor: '#093efd' }}
        >
          <Ionicons name="notifications" size={26} color="white" />
        </View>
        <TouchableOpacity
          style={{ width: 38, height: 38 }}
          className="items-center justify-center rounded-full overflow-hidden"
        >
          {currentUser && currentUser.imageUrl !== 'url_to_image' ? (
            <View>
              <Image
                source={{ uri: currentUser.imageUrl }}
                style={{ width: 38, height: 38 }}
              />
            </View>
          ) : (
            <Ionicons name="person" size={26} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeTopInfo;
