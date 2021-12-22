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
} from 'react-native';
import Button from '../components/Button';
import Inputbox from '../components/Inputbox';
import logo from '../assets/Logo.png';
import background_img from '../assets/background_img.png';
import {connect} from 'react-redux';
import * as actions from '../store/actions/actions';
import Heading from '../components/Heading';
import colors from '../assets/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LogIn = ({navigation, user_login, UserReducer}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  const _onPressSignUp = () => {
    navigation.navigate('SignUp');
  };
  const _onPresspassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const _onPressShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={background_img} style={styles.image}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
              names={'lock'}
              onPressIcon={_onPressShowPassword}
            />
            <Button
              title="Login"
              btnStyle={styles.loginBtnStyle}
              btnTextStyle={styles.loginBtnTextStyle}
              isBgColor={false}
              onBtnPress={() => user_login({email, password})}
            />
            <View style={styles.forgotPassView}>
              <Heading
                passedStyle={styles.forgotPassTExt}
                fontType="semi-bold"
                title="Forgot Password?"
              />
              <TouchableOpacity onPress={() => console.log('forget')}>
                <Heading
                  passedStyle={styles.clickHere}
                  fontType="semi-bold"
                  title="Click Here"
                />
              </TouchableOpacity>
            </View>
{/* 
            <View style={styles.horizontalLinePosition}>
              <View style={styles.horizontalLine} />
              <View>
                <Heading
                  fontType="semi-bold"
                  passedStyle={styles.orView}
                  title="Or"
                />
              </View>
              <View style={styles.horizontalLine} />
            </View> */}
            {/* <Button
              title="Sign Up Now"
              onBtnPress={() => _onPressSignUp()}
              btnStyle={{
                borderRadius: width * 0.08,
                borderWidth: 1,
                borderColor: 'white',
                backgroundColor: 'transparent',
                paddingVertical: height * 0.013,
              }}
              btnTextStyle={{
                color: 'white',
                fontFamily: 'Poppins-SemiBold',
              }}
              isBgColor={false}
              isBgColor={false}
            /> */}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerView: {
    alignItems: 'center',
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
    width: width * 0.4,
    marginTop: height * 0.1,
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
