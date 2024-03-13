import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import colors from '../../constant/Colors';

const Loading = () => {
  return (
    <View className="flex-1">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}
        >
          <ActivityIndicator size={40} color={colors.secondary} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default Loading;
