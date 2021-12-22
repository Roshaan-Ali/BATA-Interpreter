import React, {useState} from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';
import * as actions from '../store/actions/actions';
import background_img from '../assets/background_img.png';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import colors from '../assets/colors';
import {connect} from 'react-redux';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Otp = ({navigation, user_signup, route}) => {
  const OTP = '0000';
  console.log(route.params);

  const _onConfirmOtp = code => {
    if (code == OTP) {
      console.log(`Code is ${code}, you are good to go!`);
      user_signup({
        ...route.params,
      }).then(() => {
        console.log('Otp Done');
      });
    } else {
      alert('Invalid OTP!');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground source={background_img} style={styles.image}>
        <Heading title="Enter OTP Code" passedStyle={styles.heading} />

        <View style={styles.inputBoxes}>
          <OTPInputView
            style={{width: '80%', height: 200}}
            pinCount={4}
            // code={otpCode} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged={code => {
            //   setOtpCode(code)
            // }}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              _onConfirmOtp(code);
            }}
          />
        </View>
        {/* <Button title="Confirm" onBtnPress={() => _onPressSignUp()} /> */}
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLinePosition: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: width * 0.5,
  },
  image: {
    justifyContent: 'center',
    width: width,
    height: height,
    alignSelf: 'center',
    alignItems: 'center',
  },
  scrollview: {
    height: height,
  },
  inputBoxes: {
    marginTop: height * 0.02,
    marginHorizontal: width * 0.05,
  },
  heading: {
    color: 'white',
    fontSize: width * 0.11,
    fontWeight: 'bold',
  },

  // OTP Styles
  underlineStyleBase: {
    width: width * 0.15,
    height: height * 0.08,
    fontSize: width * 0.07,
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: width * 0.02,
    color: colors?.themePurple1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(Otp);
