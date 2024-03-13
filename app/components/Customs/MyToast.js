// CustomToast.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const MyToast = ({ isVisible, message, duration = 2000 }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, duration);
    }
  }, [isVisible, fadeAnim, duration]);

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MyToast;
