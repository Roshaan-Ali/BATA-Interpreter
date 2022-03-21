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
  cleanReduxAfterCompletingTask,
  firebaseMessagingData
}) => {
  const [loading, setLoading] = useState(false);
  const [initialRoute, setInitialRoute] = useState('Home');
  const accessToken = UserReducer?.accessToken;
  const id = UserReducer?.userData?.id;


  useEffect(()=>{
    checkApplicationPermission();
    requestUserPermission();
    getAllLanguages();
    // getAllReviews(accessToken);
    getCurrentBooking(accessToken);
    getBookingHistory(accessToken);
    getReviewsAndRatingsCount(accessToken);
  },[])

  useEffect(() => {
    console.log("AHSAN")
    try{

    
    messaging()
      .getToken()
      .then(token => {
        console.log(token, 'AHSAN');
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
    console.log(remoteMessage, 'Notification');
      firebaseMessagingData(remoteMessage)
      if (remoteMessage?.data?.type == 'assign') {
        getCurrentBooking(accessToken);
      }

      if(remoteMessage?.data?.type == 'workDone'){
        getCurrentBooking(accessToken);
        cleanReduxAfterCompletingTask()
      }
    
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
    }
      catch(err){
        console.log(err)
      }
  }, []);

  async function checkApplicationPermission() {
    const authorizationStatus = await messaging().requestPermission();
  
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }
  }

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

  ];

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission({
      announcement: true,
      provisional: true,
    });
    if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
    } else if (authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status: AHSAN', authStatus);
    }
  };

  

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
