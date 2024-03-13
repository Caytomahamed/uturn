import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../components/Customs/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constant/Colors';
import KeyboardAvoidViewAndDismiss from '../components/KeyboardAvoidViewAndDismiss';
import { appSelectUsers, login } from '../store/slices/users';
import MyToast from '../components/Customs/MyToast';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from '../components/Customs/LoadingModal';
function isEmailValid(email) {
  // Regular expression to validate email format with specific domains
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;

  if (emailRegex.test(email)) {
    return true; // Email is valid and matches the specified domains
  } else {
    return false; // Invalid email or doesn't match the specified domains
  }
}
const Login = () => {
  const windowHeight = Dimensions.get('window').height;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { isLoading, error, token, userType } = useSelector(appSelectUsers);

  const validate = () => {
    let errorMessage = '';
    if (email.trim() === '' || !isEmailValid(email)) {
      errorMessage = 'Email is required.Like this "example@gmail.com"';
    } else if (password.trim().length < 8 || password.trim() === '') {
      errorMessage = 'Password is required and at least 8 in length';
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
      await dispatch(login({ password, email }));
      // After dispatch completes, check the result
      if (!token) {
        handleShowToast();
        return;
      }

      if (userType === '3') {
        console.log('Navigating to HomeScreen');

        return;
      }

      navigation.navigate('DriverHomeScreen');
    } else {
      Alert.alert('🔥 Input is Empty', errMsg, [{ text: 'okay' }]);
    }
  };

  return (
    <KeyboardAvoidViewAndDismiss>
      <View style={{ height: Math.round(windowHeight) }} className="bg-white">
        <View className="flex-1">
          <LinearGradient colors={['#fff', '#2438F6']} style={{ flex: 1 }}>
            <View>
              <View>
                <Image
                  source={require('../assets/noha.jpg')}
                  style={{
                    height: 150,
                    width: 150,
                    borderRadius: 20,
                    position: 'absolute',
                    top: -10,
                    left: 10,
                    transform: [
                      { translateX: 20 },
                      { translateY: 50 },
                      { rotate: '-5deg' },
                    ],
                  }}
                />
                <Image
                  source={require('../assets/login-user.jpeg')}
                  style={{
                    height: 150,
                    width: 150,
                    borderRadius: 20,
                    position: 'absolute',
                    top: 30,
                    left: 160,
                    transform: [
                      { translateX: 50 },
                      { translateY: 50 },
                      { rotate: '15deg' },
                    ],
                  }}
                />
              </View>

              {/* content  */}

              <View
                style={{
                  paddingHorizontal: 20,
                  position: 'absolute',
                  top: 250,
                  width: '100%',
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 800,
                    color: '#Fff',
                  }}
                >
                  Let's sign you in
                </Text>

                <Text className="my-2 text-gray-100">Welcome back again</Text>

                <View style={{ marginBottom: 12 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      marginVertical: 8,
                      color: 'white',
                    }}
                  >
                    Email
                  </Text>
                  <View
                    style={{
                      width: '100%',
                      height: 48,
                      borderColor: 'white',
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
                        color: 'white',
                      }}
                      placeholder="Enter your lastname"
                      placeholderTextColor="white"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>
                </View>
                <View style={{ marginBottom: 12 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      marginVertical: 8,
                      color: 'white',
                    }}
                  >
                    Password
                  </Text>
                  <View
                    style={{
                      width: '100%',
                      height: 48,
                      borderColor: 'white',
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
                        color: 'white',
                      }}
                      placeholder="Enter your lastname"
                      placeholderTextColor="white"
                      value={password}
                      onChangeText={setPassword}
                    />
                  </View>

                  <MyToast isVisible={showToast} message={error} />
                </View>

                {isLoading && <LoadingModal isVisible={isLoading} />}
                <CustomButton title="Login" onPress={onNext} />

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 16,
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: '#fFF', fontSize: 16 }}>
                    Don't have an accounte?
                  </Text>

                  <Pressable
                    onPress={() => navigation.navigate('CreateAccount')}
                  >
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginLeft: 3,
                      }}
                    >
                      Register
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    </KeyboardAvoidViewAndDismiss>
  );
};

export default Login;

// <KeyboardAvoidViewAndDismiss>

//   </KeyboardAvoidViewAndDismiss>
