import {
  View,
  Text,
  TextInput,
  Dimensions,
  Pressable,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';

import COLORS from '../constant/Colors';

// import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../components/Customs/CustomButton';
import KeyboardAvoidViewAndDismiss from '../components/KeyboardAvoidViewAndDismiss';

const PersonalInformation = ({ navigation, route }) => {
  const [faculty, setFaculty] = useState('');
  const [address, setAddress] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');

  const validate = () => {
    let errorMessage = '';

    if (address.trim() === '') {
      errorMessage = 'Address is required.';
    } else if (faculty.trim() === '') {
      errorMessage = 'Faculty is required.';
    } else if (yearOfStudy.trim() === '') {
      errorMessage = 'Year  is required.';
    }
    return errorMessage;
  };

  const onNext = () => {
    const errMsg = validate();
    if (!errMsg) {
      // navigate to next screen here
      navigation.navigate('SetPicture', {
        data: {
          ...route.params.data,
          address,
          faculty,
          yearOfStudy,
        },
      });
    } else {
      Alert.alert('🔥 Input is Empty', errMsg, [{ text: 'okay' }]);
    }
  };

  return (
    <KeyboardAvoidViewAndDismiss>
      <View className="flex-1 bg-white divide-y divide-gray-300  divide-solid justify-between">
        <View className="px-5">
          <View className="mb-3">
            <Text className="text-2xl mt-4 font-bold text-center">
              Personal Information
            </Text>
            <Text className="text-base text-gray-500 text-center">
              Add a your Personal information
            </Text>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
              Address(xafada)
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
                value={address}
                onChangeText={setAddress}
              />
            </View>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
              Faculty
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
                value={faculty}
                onChangeText={setFaculty}
              />
            </View>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
              Year
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
                value={yearOfStudy}
                onChangeText={setYearOfStudy}
              />
            </View>
          </View>
          <View className="mt-3">
            <CustomButton title="Next" filled onPress={onNext} />
          </View>
        </View>
      </View>
    </KeyboardAvoidViewAndDismiss>
  );
};

export default PersonalInformation;
