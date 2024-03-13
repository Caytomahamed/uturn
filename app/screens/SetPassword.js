import { View, Text, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';

// import { useSelector, useDispatch } from 'react-redux';
// import { signUp } from '../store/slices/users';
import LoadingModal from '../components/Customs/LoadingModal';
import CustomButton from '../components/Customs/CustomButton';
import KeyboardAvoidViewAndDismiss from '../components/KeyboardAvoidViewAndDismiss';
import COLORS from '../constant/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { appSelectUsers, signUp } from '../store/slices/users';
import MyToast from '../components/Customs/MyToast';

const SetPassword = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const { isLoading, error, token } = useSelector(appSelectUsers);
  const [showToast, setShowToast] = useState(false);

  // dispatch createUser action
  const dispatch = useDispatch();

  const validate = () => {
    let errorMessage = '';

    if (password.trim().length < 8 || password.trim() === '') {
      errorMessage = 'Password is required and at least 8 in length';
    } else if (confirm.trim().length < 8 || confirm.trim() === '') {
      errorMessage = 'Confirm is required and At least 8 in length';
    } else if (
      password.trim().length !== confirm.trim().length ||
      password !== confirm
    ) {
      errorMessage =
        'Confirm password is not the same as the password. Please try again';
    }
    return errorMessage;
  };

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000); // Set a timeout to hide the toast after a certain duration
  };

  const onNext = async () => {
    const errMsg = validate();

    if (!errMsg) {
      // Create a new user
      await dispatch(
        signUp({ ...route.params.data, password, passwordConfirm: confirm })
      );
      // After dispatch completes, check the result
      if (!token) {
        handleShowToast();
        return;
      }

      // Success signUp, go home
      navigation.navigate('HomeScreen');
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
              You'll need a password
            </Text>
            <Text className="text-base text-gray-500 text-center">
              Make sure is 8 characters or more
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
              Password
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
                placeholder="Enter your password"
                placeholderTextColor={COLORS.black}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
              Confirm password
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
                placeholder="Enter your confirm password"
                placeholderTextColor={COLORS.black}
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
              />
            </View>
            {/* {isLoading && (
              <LoadingModal isVisible={isLoading} text="Loading..." />
            )} */}
          </View>
          <MyToast isVisible={showToast} message={error} />
        </View>

        <View className="h-20 justify-center items-end px-5 ">
          <View className="w-32 ">
            <CustomButton title="Sign Up" filled onPress={onNext} />
          </View>
        </View>
      </View>
    </KeyboardAvoidViewAndDismiss>
  );
};

export default SetPassword;
