import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import React from 'react';

const windowHeight = Dimensions.get('window').height;

const KeyboardAvoidViewAndDismiss = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      contentContainerStyle={styles.scrollViewContainer} // Add this line
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Math.round(windowHeight),
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flexGrow: 1, // Add this line
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default KeyboardAvoidViewAndDismiss;
