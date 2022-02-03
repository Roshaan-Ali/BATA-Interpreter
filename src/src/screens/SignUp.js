import React, {useState} from 'react';
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
import background_img from '../assets/background_img.png';
import Heading from '../components/Heading';
import DropdownComp from '../components/DropdownComp';
import colors from '../assets/colors';
import CustomDropdownModal from '../components/CustomDropdownModal';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignUp = ({navigation}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [p_language, setP_language] = useState([
    {_id: 1, label: 'Burmese'},
    {_id: 11, label: 'Chin'},
    {_id: 3, label: 'Kachin'},
    {_id: 4, label: 'Karen'},
    {_id: 22, label: 'Mon'},
    {_id: 2, label: 'Rohingya'},
  ]);

  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [selectedPrimaryLang, setSelectedPrimaryLang] = useState('');
  const [showDropDownModal, setShowDropDownModal] = useState(false);

  const _onPressSignUp = () => {
    if (
      lastname === '' ||
      p_language === '' ||
      firstname === '' ||
      email === ''
    ) {
      alert('All fields required');
    } else {
      navigation.navigate('SignupPackage', {
        firstname,
        lastname,
        password,
        email,
        selectedPrimaryLang,
      });
    }
  };
  const _onPresslogin = () => {
    navigation.navigate('LogIn');
  };

  const _onPressShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  // on language selection
  const _onDropdownSelectionPress = language => {
    setSelectedPrimaryLang(language.label);
    setShowDropDownModal(false);
  };

  return (
    <ImageBackground source={background_img} style={styles.image}>
      <ScrollView showsVerticalScrollIndicator={false} style="">
        <View
          style={{
            paddingVertical: height * 0.1,
            paddingBottom: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Heading
            title="Sign Up Now"
            passedStyle={styles.heading}
            fontType="bold"
          />
          <Inputbox
            value={firstname}
            setTextValue={setFirstname}
            placeholderTilte="First Name"
            isShowIcon={true}
            names={'person'}
          />
          <Inputbox
            value={lastname}
            setTextValue={setLastname}
            placeholderTilte="Last Name"
            isShowIcon={true}
            names={'person'}
          />
          <Inputbox
            value={email}
            setTextValue={setEmail}
            placeholderTilte="Email"
            names={'email'}
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
          <TouchableOpacity
            style={styles.dropdown}
            activeOpacity={0.8}
            onPress={() => setShowDropDownModal(true)}>
            <Heading
              title={
                selectedPrimaryLang === ''
                  ? 'Primary Language'
                  : selectedPrimaryLang
              }
              passedStyle={styles.languageText}
            />
          </TouchableOpacity>

          <Button
            title="Next >"
            onBtnPress={() => _onPressSignUp()}
            btnStyle={{
              borderRadius: width * 0.08,
              backgroundColor: 'white',
              paddingVertical: height * 0.015,
            }}
            btnTextStyle={{
              color: colors.themePurple1,
              fontFamily: 'Poppins-SemiBold',
            }}
            isBgColor={false}
          />
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              justifyContent: 'center',
            }}>
            <Heading
              passedStyle={{color: 'white', fontSize: width * 0.035}}
              title="Already have an Account?"
            />
            <TouchableOpacity onPress={() => _onPresslogin()}>
              <Heading
                passedStyle={{
                  color: 'white',
                  fontSize: width * 0.035,
                  textDecorationLine: 'underline',
                  marginLeft: width * 0.02,
                }}
                title="Login"
              />
            </TouchableOpacity>
          </View>
        </View>
        {showDropDownModal && (
          <CustomDropdownModal
            array={p_language}
            onPress={_onDropdownSelectionPress}
            isModalVisible={showDropDownModal}
            setIsModalVisible={setShowDropDownModal}
          />
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    justifyContent: 'center',
    height: height,

    alignItems: 'center',
  },
  languageText: {
    fontSize: width * 0.045,
    color: 'white',
  },
  inputBoxes: {
    marginTop: height * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: 'white',
    fontSize: width * 0.11,
    marginTop: height * 0.01,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 15,
    width: width * 0.8,
    marginVertical: height * 0.025,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: width * 0.045,
    height: height * 0.08,
  },
});

export default SignUp;
