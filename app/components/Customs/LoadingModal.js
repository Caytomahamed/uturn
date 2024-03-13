// LoadingModal.js
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import colors from '../../constant/Colors';

const LoadingModal = ({ isVisible, text }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{ backgroundColor: 'white', padding: 40, borderRadius: 10 }}
        >
          <ActivityIndicator size={40} color={colors.secondary} />
          {text && <Text style={{ marginTop: 10 }}>{text}</Text>}
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;
