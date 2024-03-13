import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

const usePushNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState(null);

  useEffect(() => {
    const registerForPushNotifications = async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to receive push notifications denied!');
          return;
        }

        const tokenData = await Notifications.getExpoPushTokenAsync({
          projectId: 'cf20b974-56da-4554-ad05-abdce17e6729',
        });
        const newExpoPushToken = tokenData.data;

        // Do something with the expoPushToken (send to server, store locally, etc.)
        setExpoPushToken(newExpoPushToken);
      } catch (error) {
        console.error('Error registering for push notifications:', error);
      }
    };

    registerForPushNotifications();

    // Cleanup the listener when the component unmounts
    return () => {
      Notifications.removeNotificationSubscription();
    };
  }, []);

  return expoPushToken;
};

export default usePushNotifications;
