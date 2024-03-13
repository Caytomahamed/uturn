import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

//custom font
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

//Navigation
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import MainNav from './navigations/MainNav';

const store = configureStore();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto.ttf'),
    'GrapeNuts-Regular': require('./assets/fonts/GrapeNuts-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }


  return (
    <SafeAreaView className="flex-1 bg-white" onLayout={onLayoutRootView}>
      <Provider store={store}>
        <MainNav />
      </Provider>
    </SafeAreaView>
  );
}
