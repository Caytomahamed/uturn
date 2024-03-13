import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';


const CustomSearch = ({ show, onQuery }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <View className="flex-row items-center justify-between bg-white">
      <View
        style={styles.searchContainer}
        className="flex-row items-center flex-1"
      >
        <Ionicons name="search" size={26} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Search a calamada..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={() => onQuery(searchText)}
        />
      </View>
      <TouchableOpacity onPress={show}>
        <Ionicons name="options" size={40} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    flex: 1,
    height: 50,
    marginRight: 5,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 17,
  },
  filterContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: 10,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  filterOption: {
    marginBottom: 10,
  },
  filterValue: {
    textAlign: 'right',
    marginLeft: 5,
  },
});
export default CustomSearch;
