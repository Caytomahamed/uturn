import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import colors from '../../constant/Colors';

// Import your images statically
import home from '../../assets/home.png';
import notifications from '../../assets/notifications.png';
import profile from '../../assets/profile.png';
import ride from '../../assets/ride.png';

const imageMap = {
  home,
  notifications,
  profile,
  ride,
};

const TabBarIcons = ({ focused, iconName, title }) => {
  const imagePath = imageMap[iconName];

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Image
        style={{
          ...styles.image,
          tintColor: focused ? colors.secondary : colors.gray,
        }}
        source={imagePath}
      />
      <Text
        style={{
          ...styles.text,
          color: focused ? colors.secondary : colors.gray,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default TabBarIcons;

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    height: 28,
    width: 28,
  },
  text: {
    fontSize: 13,
    textTransform: 'capitalize',
  },
});
