import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import colors from '../../constant/Colors';

const CustomButton = (props) => {
  const filledColor = props.color || colors.secondary;
  const outlinedColor = colors.white;
  const bgColor = props.filled ? filledColor : outlinedColor;
  const textColor = props.filled ? colors.white : colors.secondary;

  return (
    <TouchableOpacity
      style={{
        ...style.button,
        ...{ backgroundColor: bgColor, borderColor: textColor },
        ...props.style,
      }}
      onPress={props.onPress}
    >
      <Text style={{ fontSize: 16, ...{ color: textColor } }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomButton;
