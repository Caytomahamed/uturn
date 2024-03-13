import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '../../constant/Colors';

const CustomTabBarButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
    >
      <View
        style={{
          height: 70,
          width: 70,
          borderRadius: 35,
          backgroundColor: colors.secondary,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 10,
  },
});
