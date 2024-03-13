import { View, Text, Image, TextInput, Pressable } from 'react-native';
import React from 'react';
import { Shadow } from 'react-native-shadow-2';
import colors from '../constant/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { appSelectUsers, getCurrentUser, logout } from '../store/slices/users';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCurrentUser());
    }, [dispatch])
  );

  const { currentUser } = useSelector(appSelectUsers);

  const data = [
    {
      icon: 'person-outline',
      data: `${currentUser?.firstname} ${currentUser?.lastname}`,
    },
    {
      icon: 'mail-outline',
      data: `${currentUser?.email}`,
    },
    {
      icon: 'location-outline',
      data: `${currentUser?.address}`,
    },
    {
      icon: 'call-outline',
      data: `+252 ${currentUser?.phone}`,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ScrollView>
      <View
        className="items-center pt-5 pb-5"
        style={{
          backgroundColor: colors.secondary,
          opacity: 0.95,
          borderBottomLeftRadius: 18, // Adjust radius as needed
          borderBottomRightRadius: 18, // Adjust radius as needed
        }}
      >
        <Shadow
          distance={10}
          offset={[3, 4]}
          className="w-44 h-44 bg-white rounded-full overflow-hidden p-1 "
        >
          <View
            className="w-full bg-white h-full rounded-full box-border  overflow-hidden"
            style={{
              borderColor: colors.secondary,
              borderWidth: 4,
            }}
          >
            {currentUser?.imageUrl &&
            currentUser.imageUrl !== 'url_to_image' ? (
              <Image
                source={{ uri: currentUser.imageUrl }}
                className="h-full w-full "
                style={{ resizeMode: 'cover' }}
              />
            ) : (
              <Image
                source={require('../assets/profile-default.png')}
                className="h-full w-full "
                style={{ resizeMode: 'cover' }}
              />
            )}
          </View>
        </Shadow>

        <Text
          className="mt-4 text-2xl font-bold capitalize text-white"
          style={{ fontFamily: 'Roboto-Medium' }}
        >
          {currentUser ? currentUser?.firstname : 'Me'}{' '}
          {currentUser ? currentUser?.lastname : 'user'}
        </Text>
      </View>

      <View className="mx-3 mt-2">
        {data &&
          data.map((item) => (
            <View
              className="w-full bg-white mb-3  px-4 py-3 flex-row items-center justify-between"
              style={{
                shadowColor: 'rgba(0,0,0,0.5)',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 1,
                elevation: 15, // This is for Android
                borderRadius: 8,
              }}
              key={item.data}
            >
              <View className="flex-row items-center ">
                <Ionicons name={item.icon} color="#2A2E49" size={35} />
                <TextInput
                  readOnly
                  className="text-xl ml-2"
                  style={{ color: '#2A2E49' }}
                  value={item.data}
                />
              </View>

              <Ionicons name="pencil-outline" color="#2A2E49" size={35} />
            </View>
          ))}
        <View
          className="w-full bg-white mb-3  px-4 py-3 flex-row items-center justify-between"
          style={{
            shadowColor: 'rgba(0,0,0,0.5)',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 1,
            elevation: 15, // This is for Android
            borderRadius: 8,
          }}
        >
          <Pressable className="flex-row items-center " onPress={handleLogout}>
            <Ionicons name="exit-outline" color="#2A2E49" size={35} />
            <TextInput
              readOnly
              className="text-xl ml-2"
              style={{ color: '#2A2E49' }}
              value="logout"
            />
          </Pressable>
        </View>
      </View>

      <View style={{ height: 130 }}></View>
    </ScrollView>
  );
};

export default ProfileScreen;
