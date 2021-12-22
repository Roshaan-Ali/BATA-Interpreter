import React, { useEffect } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Home from './screens/Home';
import Booking from './screens/Booking';
import Profile from './screens/Profile';
import Packages from './screens/Packages';
import Translators from './screens/Translators';
import Interpreter from './screens/Interpreter';
import SearchingScreen from './screens/SearchingScreen';
import LanguageSelection from './screens/LanguageSelection';
import ConfirmTranslatorModal from './components/ConfirmTranslatorModal';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification'
import Reviews from './screens/Reviews';
const HomeStack = createNativeStackNavigator();
const HomeScreensStack = props => {
  useEffect(() => {
    try {
      messaging()
        .getToken()
        .then(token => {
          console.log(token)
          // setFCMToken(token);
          // console.log(token)
        });
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
          }
        });
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log(remoteMessage, '');

        if (remoteMessage.notification) {
          PushNotification.localNotification({
            channelId: 'channel-id',
            channelName: 'My channel',
            message: remoteMessage.notification.body,
            playSound: true,
            title: remoteMessage.notification.title,
            priority: 'high',
            soundName: 'default',
          });
        }
      });
      return unsubscribe;
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <HomeStack.Screen name="Home" component={Home} {...props.navigation} />
      <HomeStack.Screen
        name="Language"
        component={LanguageSelection}
        {...props.navigation}
      />
      <HomeStack.Screen
        name="Packages"
        component={Packages}
        {...props.navigation}
      />
      <HomeStack.Screen
        name="Translator"
        component={Translators}
        {...props.navigation}
      />
      <HomeStack.Screen
        name="Booking"
        component={Booking}
        {...props.navigation}
      />
      <HomeStack.Screen
        name="Interpreter"
        component={Interpreter}
        {...props.navigation}
      />
      <HomeStack.Screen
        name="Searching"
        component={SearchingScreen}
        {...props.navigation}
      />
      <HomeStack.Screen
        name="Reviews"
        component={Reviews}
        {...props.navigation}
      />
      <HomeStack.Screen
        name="ConfirmModal"
        component={ConfirmTranslatorModal}
        {...props.navigation}
      />
      <HomeStack.Screen
        name="Profile"
        component={Profile}
        {...props.navigation}
      />
    </HomeStack.Navigator>
  );
};

export default HomeScreensStack;
