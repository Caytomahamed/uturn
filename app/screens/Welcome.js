import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../components/Customs/CustomButton';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
  const navigation = useNavigation();
  
  return (
    <LinearGradient colors={['#fff', '#2438F6']} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View>
          <Image
            source={require('../assets/noha.jpg')}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: 'absolute',
              left: 10,
              transform: [
                { translateX: 20 },
                { translateY: 50 },
                { rotate: '-15deg' },
              ],
            }}
          />
          <Image
            source={require('../assets/road.jpeg')}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: 'absolute',
              top: -40,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: '-5deg' },
              ],
            }}
          />
          <Image
            source={require('../assets/probox.jpg')}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: 'absolute',
              top: 120,
              left: -50,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: '15deg' },
              ],
            }}
          />
          <Image
            source={require('../assets/vitz.jpg')}
            style={{
              height: 210,
              width: 210,
              borderRadius: 20,
              position: 'absolute',
              top: 80,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: '-15deg' },
              ],
            }}
          />
        </View>

        {/* content  */}

        <View
          style={{
            paddingHorizontal: 20,
            position: 'absolute',
            top: 360,
            width: '100%',
          }}
        >
          <Text
            style={{
              fontSize: 50,
              fontWeight: 800,
              color: '#Fff',
            }}
          >
            Let's Get
          </Text>
          <Text
            style={{
              fontSize: 46,
              fontWeight: 800,
              color: '#Fff',
            }}
          >
            Started
          </Text>

          <View style={{ marginVertical: 20 }}>
            <Text style={{ fontSize: 16, color: '#fff', marginVertical: 4 }}>
              Seamless travel at your fingertips.
            </Text>
            <Text style={{ fontSize: 16, color: '#fff', marginVertical: 4 }}>
              Effortless Bookings.
            </Text>
          </View>
          <CustomButton
            title="Join Now"
            onPress={() => navigation.navigate('CreateAccount')}
          />

          <View
            style={{
              flexDirection: 'row',
              marginTop: 16,
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fFF', fontSize: 16 }}>
              Already have a account?
            </Text>

            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginLeft: 3,
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
