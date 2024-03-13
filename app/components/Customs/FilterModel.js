import { View, Text, Button, Pressable } from 'react-native';
import React from 'react';
import { Modal } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
const FilterModel = ({ onHide, visible }) => {
  return (
    <Modal
      visible={visible}
      onDismiss={onHide}
      onRequestClose={onHide}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        className="bg-white w-72 h-72 p-5"
        style={{
          shadowColor: 'rgba(0,0,0,0.1)',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          elevation: 5, // This is for Android
          borderRadius: 20,
        }}
      >
        <Text
          className="text-xl font-semibold"
          style={{ fontFamily: 'Roboto-Medium' }}
        >
          Search filters
        </Text>

        <Pressable
          onPress={onHide}
          style={{ position: 'absolute', top: 18, right: 18 }}
        >
          <Ionicons name="close" color="gray" size={22} />
        </Pressable>
      </View>
    </Modal>
  );
};

export default FilterModel;
