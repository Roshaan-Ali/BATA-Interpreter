import React, {useEffect} from 'react';
import MainNavigator from './src/MainNavigator';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/index';
import {PersistGate} from 'redux-persist/integration/react';
import Test from "./src/screens/Test"


export default function App() {
  
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Test/>
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
    //     <MainNavigator />
    //   </PersistGate>
    // </Provider>
  );
}
