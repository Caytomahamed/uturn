import { View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import CustomSearch from '../components/Customs/CustomSearch';
import { Shadow } from 'react-native-shadow-2';
import { Ionicons } from '@expo/vector-icons';
import FilterModel from '../components/Customs/FilterModel';
import { useDispatch, useSelector } from 'react-redux';
import { appSelectSchedules, searchSchedule } from '../store/slices/schedules';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading/Loading';

const SearchingScreen = () => {
  const navigation = useNavigation();
  const data = [
    { id: 1, text: 'calamadaha' },
    { id: 2, text: '150' },
    { id: 3, text: 'masalaha' },
  ];

  const [visible, setVisisble] = useState(false);

  const show = () => setVisisble(true);
  const hide = () => setVisisble(false);

  const [searchText, setSearchText] = useState('');

  const onQuery = (text) => setSearchText(text);

  const dispatch = useDispatch();

  const { isLoading } = useSelector(appSelectSchedules);

  const handleInputSubmit = async (searchText) => {
    // This function will be called when the user submits the text input
    console.log('User input:', searchText);
    dispatch(searchSchedule(searchText));

    if (!isLoading) navigation.navigate('SearchingResult', { searchText });
  };

  return (
    <View className="flex-1">
      <Shadow
        distance={10}
        offset={[1, 1]}
        className="w-full bg-white px-3 py-3"
      >
        <CustomSearch show={show} onQuery={handleInputSubmit} />
      </Shadow>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white px-5 mt-2 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="time" size={16} color="gray" />
              <Text className="py-3 font-semibold ml-1">{item.text}</Text>
            </View>
            <Ionicons name="close-circle" size={16} color="gray" />
          </View>
        )}
      />
      <FilterModel onHide={hide} visible={visible} />

      {isLoading && <Loading />}
    </View>
  );
};

export default SearchingScreen;
