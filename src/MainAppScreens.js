import React, {useEffect, useState} from 'react';
import BataInformation from './screens/BataInformation';
import CustomDrawer from './CustomDrawer';
import LanguageSelection from './screens/LanguageSelection';
import HomeScreensStack from './HomeScreensStack';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import PushNotifications from './screens/PushNotifications';
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

  useEffect(() => {
    getAllLanguages();
    getAllReviews(accessToken);
    getCurrentBooking(accessToken);
    getBookingHistory(accessToken);
    getReviewsAndRatingsCount(accessToken);
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
    {
      id: 2,
      iconName: 'language',
      iconType: 'FontAwesome',
      routeName: 'change language',
    },
    // {
    //   id: 3,
    //   iconName: 'phone',
    //   iconType: 'FontAwesome',
    //   routeName: 'change phone no.',
    // },

    {
      id: 4,
      iconName: 'info',
      iconType: 'Foundation',
      routeName: 'BATA information',
    },
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
      console.log('Authorization status:', authStatus);
    }
  };

  useEffect(() => {
    requestUserPermission();
  }, []);
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
