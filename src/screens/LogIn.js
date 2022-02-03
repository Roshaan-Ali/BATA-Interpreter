import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  Keyboard,TouchableWithoutFeedback
} from 'react-native';
import Button from '../components/Button';
import Inputbox from '../components/Inputbox';
import logo from '../assets/Logo.png';
import background_img from '../assets/background_img.png';
import {connect} from 'react-redux';
import * as actions from '../store/actions/actions';
import Heading from '../components/Heading';
import colors from '../assets/colors';
import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppStatusBar from '../components/AppStatusBar';
import AlertModal from '../components/AlertModal';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LogIn = ({navigation, user_login, UserReducer, setErrorModal}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showLoginFailedModal, setShowLoginFailedModal] = useState(
    UserReducer?.errorModal?.status,
  );



  const _onPressShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const _onPressLogin = () => {
    if (email.length > 0 && password.length > 0) {
      setIsLoading(true);

      setTimeout(() => {
        user_login({email :email, password:password});
        setIsLoading(false);
      }, 2000);
    } else {
      setShowAlertModal(true);
    }
  };

  useEffect(() => {
    if (UserReducer?.errorModal?.status === true) {
      setShowLoginFailedModal(true);
    }
    if (UserReducer?.errorModal?.status === false) {
      setShowLoginFailedModal(false);
    }
  }, [UserReducer?.errorModal]);
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: '#EF2692'}}>
        {/* {Platform.OS == 'ios' && ( */}
        <AppStatusBar
          platform={Platform.OS}
          backgroundColors={colors.themePurple1}
          barStyle="light-content"
        />
        {/* )} */}
        <ImageBackground source={background_img} style={styles.image}>
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.container}
            >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.centerView}>
              <Image resizeMode="contain" source={logo} style={styles.logo} />

              <Inputbox
                value={email}
                setTextValue={setEmail}
                placeholderTilte="E-mail"
                isShowIcon={true}
                names={'person'}
              />

              <Inputbox
                value={password}
                setTextValue={setPassword}
                placeholderTilte="Password"
                isSecure={!isShowPassword}
                isPassword={true}
                isShowIcon={true}
                iconStyle={{
                  color: 'white',
                  paddingLeft: width * 0.006,
                }}
                iconWrapperStyle={{
                  position: 'absolute',
                  right: width * 0.04,
                  left: width * 0.7,
                }}
                names={'lock'}
                onPressIcon={_onPressShowPassword}
              />

              {isLoading ? (
                <TouchableOpacity
                  style={styles.loadingComponent}
                  activeOpacity={1}>
                  <LottieView
                    speed={1}
                    style={styles.lottieStyles}
                    autoPlay
                    colorFilters={'blue'}
                    loop
                    source={require('../assets/Lottie/purple-loading-2.json')}
                  />
                </TouchableOpacity>
              ) : (
                <Button
                  title="Login"
                  btnStyle={styles.loginBtnStyle}
                  btnTextStyle={styles.loginBtnTextStyle}
                  isBgColor={false}
                  onBtnPress={_onPressLogin}
                />
              )}
              {/* <View style={styles.forgotPassView}>
                <Heading
                  passedStyle={styles.forgotPassTExt}
                  fontType="semi-bold"
                  title="Forgot Password?"
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgetPassword')}>
                  <Heading
                    passedStyle={styles.clickHere}
                    fontType="semi-bold"
                    title="Click Here"
                  />
                </TouchableOpacity>
              </View> */}
            </View>
            </TouchableWithoutFeedback>
          {/* </ScrollView> */}
          </KeyboardAvoidingView>
        </ImageBackground>

        {showAlertModal && (
          <AlertModal
            title="Oh Snaps!"
            message="Look out, one or more requried fields are left empty."
            isModalVisible={showAlertModal}
            setIsModalVisible={setShowAlertModal}
          />
        )}
        {showLoginFailedModal && (
          <AlertModal
            title="Login Failed!"
            message={UserReducer?.errorModal?.msg}
            isModalVisible={showLoginFailedModal}
            setIsModalVisible={setShowLoginFailedModal}
            onPress={() => setErrorModal()}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingComponent: {
    borderRadius: 50,
    position: 'relative',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.08,
    width: width * 0.8,
    marginVertical: height * 0.02,
  },
  lottieStyles: {
    height: height * 0.15,
    position: 'absolute',
    left: 0,
    right: 0,
    // top: height * -0.02,
  },
  container: {
    flex: 1,
  },
  centerView: {
    alignItems: 'center',
    height: '100%',
    width:'100%',
    paddingVertical:10

  },
  forgotPassView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnTextStyle: {
    color: colors.themePurple1,
    fontFamily: 'Poppins-SemiBold',
  },
  loginBtnStyle: {
    borderRadius: width * 0.08,
    backgroundColor: 'white',
    paddingVertical: height * 0.015,
  },
  clickHere: {
    paddingLeft: width * 0.01,
    color: 'white',
    fontSize: width * 0.035,
    textDecorationLine: 'underline',
  },
  forgotPassTExt: {
    color: 'white',
    fontSize: width * 0.04,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  horizontalLinePosition: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.5,
    marginVertical: height * 0.02,
  },
  orView: {
    width: 30,
    textAlign: 'center',
    color: 'white',
    fontSize: width * 0.04,
  },
  // inputView: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderWidth: 1,
  //   borderColor: '#E3E3E3',
  //   borderRadius: 15,
  //   width: width * 0.8,
  //   height: height * 0.08,
  // },
  logo: {
    width: width * 0.5,
    height: height * 0.35,
    // marginTop: height * 0.1,
  },

  image: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputBoxes: {
    backgroundColor: 'yellow',
    justifyContent: 'space-around',
  },
});

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(LogIn);
