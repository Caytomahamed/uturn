import {
  View,
  Text,
  TextInput,
  Dimensions,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constant/Colors';
// import Button from '../components/Button';

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import CustomButton from '../components/Customs/CustomButton';
import { useNavigation } from '@react-navigation/native';

const SetPicture = ({ route }) => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get('window').height;
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Check for permission to access media library
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const validate = () => {
    let errorMessage = '';

    if (!image) {
      errorMessage =
        'Select image is Required. Use "+" icon to add a profile picture?';
    }

    return errorMessage;
  };

  const onNext = () => {
    const errMsg = validate();
    if (!errMsg) {
      // Proceed to the next screen
      navigation.navigate('SetPassword', {
        data: {
          ...route.params.data,
          imageUrl: image,
        },
      });
    } else {
      Alert.alert('🔥 Input is Empty', errMsg, [{ text: 'OK' }]);
    }
  };

  const onSkip = () => {
    // Navigate to the next screen without validating the step
    navigation.navigate('SetPassword', {
      data: {
        ...route.params.data,
        imageUrl: null, // Set image URL to null or a default value
      },
    });
  };

  return (
    <View
      className="bg-white flex-1  justify-between"
      style={{ minHeight: Math.round(windowHeight) }}
    >
      <View className="px-5">
        <View>
          <Text className="text-2xl mt-4 font-bold text-center">
            Pick a profile picture
          </Text>
          <Text className="text-base text-gray-500 text-center">
            Have favorite selfie? Upload it now
          </Text>
        </View>
      </View>
      <View className="self-center">
        {image ? (
          <Image source={{ uri: image }} className="w-64 h-64 rounded-full" />
        ) : (
          <Image
            source={require('../assets/profile-default.png')}
            className="w-64 h-64 rounded-full"
          />
        )}
        <View
          className="w-20 h-20 absolute rounded-full bottom-0 right-0 justify-center items-center"
          style={{ backgroundColor: COLORS.secondary }}
        >
          <View className="w-16 h-16 bg-white rounded-full justify-center items-center">
            <Pressable onPress={pickImage}>
              <Icon name="plus" size={30} color={COLORS.secondary} />
            </Pressable>
          </View>
        </View>
      </View>
      <View className=" justify-center px-5 h-40">
        <CustomButton
          title="Next"
          filled
          onPress={onNext}
          style={{ marginBottom: 15 }}
        />
        <CustomButton title="Skip" onPress={onSkip} />
      </View>
    </View>
  );
};

export default SetPicture;
