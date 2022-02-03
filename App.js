import React, {useEffect} from 'react';
import MainNavigator from './src/MainNavigator';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/index';
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  
  async function registerAppWithFCM() {
   await messaging().registerDeviceForRemoteMessages();

  }

  useEffect(() => {
    registerAppWithFCM()
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
}
