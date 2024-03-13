import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Button,
  Pressable,
} from 'react-native';
import React from 'react';
import ScheduleDriverProfile from '../components/Schedule/ScheduleDriverProfile';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../constant/Colors';
import CarCardVertical from '../components/CarCards/CarCardVertical';
import { useSelector } from 'react-redux';
import { appSelectSchedules } from '../store/slices/schedules';
import Loading from '../components/Loading/Loading';

const SearchingResult = ({ route }) => {
  const { searchText } = route.params;
  const navigation = useNavigation();

  const { searchList, isLoading } = useSelector(appSelectSchedules);
  console.log(searchList);

  return (
    <ScrollView>
      <ImageBackground
        className="h-60 "
        source={require('../assets/noha.jpg')}
        resizeMode="cover"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: colors.secondary,
            opacity: 0.95,
            borderBottomLeftRadius: 18, // Adjust radius as needed
            borderBottomRightRadius: 18, // Adjust radius as needed
          }}
          className="px-3 pt-3"
        >
          <View className="shadow-xl flex-row justify-between items-center">
            <TouchableOpacity
              className="justify-center items-center rounded-full"
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>

            <Text
              className="text-white opacity-80 text-2xl font-bold"
              style={{ fontFamily: 'Roboto-Medium' }}
            >
              Search result
            </Text>

            <Ionicons name="search" size={30} color="#fff" />
          </View>
        </View>
      </ImageBackground>

      <View
        className="mx-3 bg-white rounded-2xl pb-3"
        style={{
          transform: [{ translateY: -150 }],
          shadowColor: 'rgba(0,0,0,0.5)',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          elevation: 20, // This is for Android
        }}
      >
        <Text className="text-lg py-3 ml-4 font-bold">
          Search "{`${searchText}`.slice(0, 8)}.." result found [
          {searchList.length}]
        </Text>

        {isLoading && <Loading />}
        {searchList.map((item) => (
          <CarCardVertical
            data={item}
            key={item.scheduleId}
            search="CarDetailScreen"
          />
        ))}

        {/* search not found */}
        {searchList.length === 0 &&
          !isLoading &&
          [{}].map((item) => (
            <CarCardVertical data={item} key={1} search="CarDetailScreen" />
          ))}
        {searchList.length === 0 && !isLoading && (
          <Text
            className="text-lg mx-4 my-2 text-gray-400"
            style={{ fontFamily: 'Roboto-Medium' }}
          >
            ⛔ Not found that place "{searchText}"".Please contact with the call
            center "707"
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default SearchingResult;
