import React, {useEffect, useState} from 'react';
import BataInformation from './screens/BataInformation';
import CustomDrawer from './CustomDrawer';
import LanguageSelection from './screens/LanguageSelection';
import HomeScreensStack from './HomeScreensStack';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
// import PushNotifications from './screens/PushNotifications';\
import PushNotification, {Importance} from 'react-native-push-notification';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ChangeLanguage from './screens/ChangeLanguage';
import ChangePhoneNo from './screens/ChangePhoneNo';
import History from './screens/History';
import * as actions from './store/actions/actions';
import {connect} from 'react-redux';
const Drawer = createDrawerNavigator();

const MainAppScreens = ({
  UserReducer,
  getAllReviews,
  getAllLanguages,
  getCurrentBooking,
  getBookingHistory,
  getReviewsAndRatingsCount,
}) => {
  const [loading, setLoading] = useState(false);
  const [initialRoute, setInitialRoute] = useState('Home');
  const accessToken = UserReducer?.accessToken;
  const id = UserReducer?.userData?.id;

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        // console.log(token, 'AHSAN');
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
  const unsubscribe = messaging().onMessage(remoteMessage => {
    console.log(remoteMessage, 'Notification');

    // Call api to get current booking data
    if (remoteMessage?.data?.type == 'assign') {
      getCurrentBooking(accessToken);
      console.log('asgined');
    }
    if (remoteMessage.notification) {
      console.log('agai====================================');
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
  
    requestUserPermission();
    // fcmNotificationsListener();
    getAllLanguages();
    getAllReviews(accessToken);
    getCurrentBooking(accessToken);
    getBookingHistory(accessToken);
    getReviewsAndRatingsCount(accessToken);
    console.log('All Functions Ran!!!!!');
  }, []);

  const routes = [
    {
      id: 1,
      iconName: 'home',
      iconType: 'Entypo',
      routeName: 'home',
    },
    {
      id: 5,
      iconName: 'history',
      iconType: 'MaterialIcons',
      routeName: 'history',
    },
    // {
    //   id: 2,
    //   iconName: 'language',
    //   iconType: 'FontAwesome',
    //   routeName: 'change language',
    // },
    // {
    //   id: 3,
    //   iconName: 'phone',
    //   iconType: 'FontAwesome',
    //   routeName: 'change phone no.',
    // },

    // {
    //   id: 4,
    //   iconName: 'info',
    //   iconType: 'Foundation',
    //   routeName: 'BATA information',
    // },
    // {
    //   id: 5,
    //   iconName: 'settings-sharp',
    //   iconType: 'Ionicons',
    //   routeName: 'settings',
    // },
  ];

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status: AHSAN', authStatus);
    }
  };

  // const fcmNotificationsListener = () => {
  //   try {
  //     messaging()
  //       .getToken()
  //       .then(token => {
  //         console.log(token, 'AHSAN');
  //       });

  //     messaging().onNotificationOpenedApp(remoteMessage => {
  //       console.log(
  //         'Notification caused app to open from background state:',
  //         remoteMessage.notification,
  //       );
  //     });
  //     messaging()
  //       .getInitialNotification()
  //       .then(remoteMessage => {
  //         if (remoteMessage) {
  //           console.log(
  //             'Notification caused app to open from quit state:',
  //             remoteMessage.notification,
  //           );
  //         }
  //       });
  //     const unsubscribe = messaging().onMessage(remoteMessage => {
  //       console.log(remoteMessage, 'Notification');

  //       // Call api to get current booking data
  //       if (remoteMessage?.data?.type == 'assign') {
  //         getCurrentBooking(accessToken);
  //         console.log('asgined');
  //       }
  //       if (remoteMessage.notification) {
  //         console.log('agai====================================');
  //         PushNotification.localNotification({
  //           channelId: 'channel-id',
  //           channelName: 'My channel',
  //           message: remoteMessage.notification.body,
  //           playSound: true,
  //           title: remoteMessage.notification.title,
  //           priority: 'high',
  //           soundName: 'default',
  //         });
  //       }
  //     });

  //     return unsubscribe;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  if (loading) {
    return null;
  } else {
    return (
      <Drawer.Navigator
        initialRouteName={initialRoute}
        screenOptions={{headerShown: false}}
        drawerContent={props => {
          return (
            <CustomDrawer
              navigation={props.navigation}
              routes={routes}
              drawerRoutes={props.state.routeNames}
            />
          );
        }}>
        <Drawer.Screen name="home" component={HomeScreensStack} />
        <Drawer.Screen name="change language" component={LanguageSelection} />
        <Drawer.Screen name="BATA information" component={BataInformation} />
        <Drawer.Screen name="change phone no." component={ChangePhoneNo} />
        <Drawer.Screen name="history" component={History} />
      </Drawer.Navigator>
    );
  }
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(MainAppScreens);
