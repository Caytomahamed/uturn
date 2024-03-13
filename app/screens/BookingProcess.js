import { View, Text, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../components/Customs/CustomButton';
import KeyboardAvoidViewAndDismiss from '../components/KeyboardAvoidViewAndDismiss';
import { useDispatch } from 'react-redux';
import { bookingNow, getRides } from '../store/slices/bookings';
import usePushNotifications from '../hooks/usePushNotifications ';
import { useNavigation } from '@react-navigation/native';

const BookingProcess = ({ route }) => {
  const [data, setData] = useState(route.params.data);
  const [pickupLocation, setPickupLocation] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const pushToken = usePushNotifications();

  const handleBooking = () => {
    if (pickupLocation.trim() === '') {
      Alert.alert('Input is empty🚗', 'Field is required');
      return;
    }

    dispatch(
      bookingNow(pushToken, {
        driverId: data.driverId,
        scheduleId: data.scheduleId,
        pickuplocation: pickupLocation,
      })
    );

    // Refresh rides before navigating back
    dispatch(getRides());

    navigation.navigate('RideScreen');
  };
  return (
    <KeyboardAvoidViewAndDismiss>
      <View className="mx-3 mt-2">
        <Text className="text-2xl font-bold text-center my-2">
          Booking a Ride
        </Text>
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
              color: 'black',
            }}
          >
            Meesha lagaa qaadayo
          </Text>
          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: 'black',
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
                color: 'black',
              }}
              placeholder="Enter your pickup location"
              placeholderTextColor="black"
              value={pickupLocation}
              onChangeText={setPickupLocation}
            />
          </View>
        </View>
        {/* <MyToast isVisible={showToast} message={error} /> */}
        {/* <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
            color: 'black',
          }}
        >
          Meesha lagaa qaadayo
        </Text>
        <View
          style={{
            width: '100%',
            height: 48,
            borderColor: 'black',
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
              color: 'black',
            }}
            placeholder="Enter your lastname"
            placeholderTextColor="black"
            value={pickupLocation}
            onChangeText={setPickupLocation}
          />
        </View>
      </View> */}
        <CustomButton title="Booking Now" filled onPress={handleBooking} />
      </View>
    </KeyboardAvoidViewAndDismiss>
  );
};

export default BookingProcess;
