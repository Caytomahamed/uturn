import { View, Text, TextInput, Dimensions, Alert } from 'react-native';
import React, { useState } from 'react';
import COLORS from '../constant/Colors';

import CustomButton from '../components/Customs/CustomButton';
import KeyboardAvoidViewAndDismiss from '../components/KeyboardAvoidViewAndDismiss';

function isEmailValid(email) {
  // Regular expression to validate email format with specific domains
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;

  if (emailRegex.test(email)) {
    return true; // Email is valid and matches the specified domains
  } else {
    return false; // Invalid email or doesn't match the specified domains
  }
}
const  CreateAccount= ({ navigation }) => {
  const windowHeight = Dimensions.get('window').height;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const validate = () => {
    let errorMessage = '';

    if (firstName.trim() === '') {
      errorMessage = 'First Name is required.';
    } else if (lastName.trim() === '') {
      errorMessage = 'Last Name is required.';
    } else if (email.trim() === '' || !isEmailValid(email)) {
      errorMessage = 'Email is required.Like this "example@gmail.com"';
    } else if (phone.trim().length !== 9) {
      errorMessage = 'Phone is required.Only 9 digits';
    }
    return errorMessage;
  };

  const onNext = () => {
    const errMsg = validate();
    if (!errMsg) {
      // navigate to next screen here
      navigation.navigate('PersonalInformation', {
        data: {
          firstname: firstName,
          lastname: lastName,
          email: email,
          password: '',
          passwordConfirm: '',
          phone: +phone,
          birthdate: '',
          address: '',
          city: "'",
          state: '',
          bloodType: '',
          roleName: 'user',
        },
      });
    } else {
      Alert.alert('🔥 Input is Empty', errMsg, [{ text: 'okay' }]);
    }
  };

  return (
    <KeyboardAvoidViewAndDismiss>
      <View style={{ height: Math.round(windowHeight) }} className="bg-white">
        <View className="flex-1">
          <View className="my-3">
            <Text className="text-2xl mt-3 font-bold text-center">
              Create Account
            </Text>
            <Text className="text-base text-gray-500 text-center">
              Conneted with us to get your ticket
            </Text>
          </View>

          <View className="px-5">
            <View className="mb-3">
              <Text className="text-base my-2">First name</Text>
              <View
                style={{
                  width: '100%',
                  height: 48,
                  borderColor: COLORS.B,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 22,
                }}
              >
                <TextInput
                  style={{
                    width: '100%',
                  }}
                  placeholder="Enter your firstname"
                  placeholderTextColor={COLORS.black}
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text
                style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}
              >
                Last name
              </Text>
              <View
                style={{
                  width: '100%',
                  height: 48,
                  borderColor: COLORS.B,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 22,
                }}
              >
                <TextInput
                  style={{
                    width: '100%',
                  }}
                  placeholder="Enter your lastname"
                  placeholderTextColor={COLORS.black}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text
                style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}
              >
                Mobile Number
              </Text>
              <View
                style={{
                  width: '100%',
                  height: 48,
                  borderColor: COLORS.B,
                  borderWidth: 1,
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingLeft: 22,
                }}
              >
                <TextInput
                  placeholder="+252"
                  placeholderTextColor={COLORS.black}
                  keyboardType="numeric"
                  editable={false}
                  style={{
                    width: '13%',
                    height: '100%',
                    borderColor: COLORS.black,
                    borderRightWidth: 1,
                  }}
                ></TextInput>
                <TextInput
                  style={{
                    width: '80%',
                  }}
                  keyboardType="numeric"
                  placeholder="630000000 "
                  placeholderTextColor={COLORS.black}
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text
                style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}
              >
                Email address
              </Text>
              <View
                style={{
                  width: '100%',
                  height: 48,
                  borderColor: COLORS.B,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 22,
                }}
              >
                <TextInput
                  style={{
                    width: '100%',
                  }}
                  keyboardType="email-address"
                  placeholder="Enter your Email address"
                  placeholderTextColor={COLORS.black}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>
            <View className="mt-3">
              <CustomButton title="Next" filled onPress={onNext} />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidViewAndDismiss>
  );
};

export default CreateAccount;
