import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  PixelRatio,
} from 'react-native';
import Header from '../components/Header';
import Heading from '../components/Heading';
import IconComp from '../components/IconComp';
import colors from '../assets/colors';
import LottieView from 'lottie-react-native';
import Button from '../components/Button';
import * as actions from '../store/actions/actions';
import {launchImageLibrary} from 'react-native-image-picker';
import DisplayNameChangeModal from '../components/DisplayNameChangeModal';
import {connect} from 'react-redux';
import AlertModal from '../components/AlertModal';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppStatusBar from '../components/AppStatusBar';
import CustomDropdownModal from '../components/CustomDropdownModal';
import {color} from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import {imageUrl} from '../config/config';

const {width, height} = Dimensions.get('window');

const Profile = ({
  navigation,
  UserReducer,
  updateUserData,
  updatePhoto,
  setErrorModal,
}) => {
  let p_language = UserReducer?.languages;
  const accessToken = UserReducer.accessToken;
  // image state
  const [userImage, setUserImage] = useState(null);
  // const [image, setImage] = useState(UserReducer?.userData?.profile_image);

  // display name state
  const [firstName, setFirstName] = useState(UserReducer?.userData?.first_name);
  const [lastName, setLastName] = useState(UserReducer?.userData?.last_name);

  const fullName = UserReducer?.userData?.first_name.concat(
    ` ${UserReducer?.userData?.last_name}`,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const [language, setLanguage] = useState(UserReducer?.userData?.language);
  // modal state
  const [showFirstNameChangeModal, setShowFirstNameChangeModal] =
    useState(false);
  const [showLastNameChangeModal, setShowLastNameChangeModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [showUpdateFailedModal, setShowUpdateFailedModal] = useState(
    UserReducer?.errorModal?.status,
  );
  // Change First Name
  const _onPressEditFirstName = () => {
    setShowFirstNameChangeModal(true);
  };

  // Change Last Name
  const _onPressEditLastName = () => {
    setShowLastNameChangeModal(true);
  };

  // Upload Photo
  const uploadPhoto = async () => {
    var options = {
      title: 'Select Image',
      allowsEditing: true,
      quality: 0.9,
      maxWidth: 1200,
      maxHeight: 1200,
      mediaType: 'photo',
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      // var ArraySingleImage = []
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        // SelectMultipleImage()
      } else {
        // setUserImage(
        //   `data:${response.assets[0].type};base64,${response.assets[0].base64}`,
        // );
        setUserImage(response.assets[0]);
      }
    });
  };

  // Save Button Function
  const _onPressSave = async () => {
    setIsLoading(true);
    if (userImage !== null) {
      await updatePhoto(userImage, accessToken);
      const userData = {
        first_name: firstName,
        last_name: lastName,
        language: UserReducer?.userData?.language?.map(ele => ele?.id),
        // profile_image:UserReducer?.userData?.profile_image
      };
      await updateUserData(userData, accessToken, onSuccess);
      setUserImage(null);
    } else {
      const userData = {
        first_name: firstName,
        last_name: lastName,
        language: UserReducer?.userData?.language?.map(ele => ele?.id),
        // profile_image:UserReducer?.userData?.profile_image
      };
      await updateUserData(userData, accessToken, onSuccess);
    }

    setIsLoading(false);
  };

  const onSuccess = () => {
    setShowAlert(true);
  };

  // language selection
  const _onDropdownSelectionPress = item => {
    setLanguage(item);
    setShowLanguageModal(false);
  };

  useEffect(() => {
    if (UserReducer?.errorModal?.status === true) {
      setShowUpdateFailedModal(true);
    }
    if (UserReducer?.errorModal?.status === false) {
      setShowUpdateFailedModal(false);
    }
  }, [UserReducer?.errorModal]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <AppStatusBar
          backgroundColor={colors.themePurple1}
          barStyle="light-content"
        />
        {/* Header  */}
        <Header title="Back" showBackBtn={true} navigation={navigation} />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Page Heading */}
          <Heading
            title="Profile Settings"
            passedStyle={styles.heading}
            fontType="semi-bold"
          />
          {/* Image Container  */}
          <View style={styles.boxContainer}>
            {UserReducer?.userData?.profile_image || userImage ? (
              <Image
                source={{
                  uri: userImage
                    ? `data:${userImage.type};base64,${userImage.base64}`
                    : `${imageUrl}${UserReducer?.userData?.profile_image}`,
                }}
                style={[StyleSheet.absoluteFill, {borderRadius: 100}]}
                // style={styles.imageStyle}
              />
            ) : (
              <Heading
                passedStyle={styles.usernameWordsStyle}
                title={fullName?.match(/\b(\w)/g).join('')}
                fontType="extra-bold"
              />
            )}
            <TouchableOpacity
              style={styles.iconTouchable}
              onPress={() => uploadPhoto()}>
              <IconComp
                name="camera-alt"
                type={'MaterialIcons'}
                iconStyle={styles.icon}
              />
            </TouchableOpacity>
          </View>

          {/* Firstname */}
          <Heading
            title={'First Name:'}
            passedStyle={styles.nameLabel}
            fontType="medium"
          />
          <View style={styles.usernameViewStyle}>
            <Heading
              title={
                firstName.length > 23
                  ? `${firstName.substring(0, 23)}...`
                  : firstName
              }
              passedStyle={styles.usernameStyle}
              fontType="medium"
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => _onPressEditFirstName()}>
              <IconComp
                name="pencil"
                type="MaterialCommunityIcons"
                iconStyle={styles.pencilIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Last Name */}
          <Heading
            title={'Last Name:'}
            passedStyle={styles.nameLabel}
            fontType="medium"
          />
          <View style={styles.usernameViewStyle}>
            <Heading
              title={
                lastName.length > 23
                  ? `${lastName.substring(0, 23)}...`
                  : lastName
              }
              passedStyle={styles.usernameStyle}
              fontType="medium"
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => _onPressEditLastName()}>
              <IconComp
                name="pencil"
                type="MaterialCommunityIcons"
                iconStyle={styles.pencilIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Save Button  */}
          <View style={styles.btnContainer}>
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
                title="SAVE"
                btnStyle={styles.btnStyle}
                onBtnPress={() => _onPressSave()}
                btnTextStyle={styles.btnTextColor}
                isBgColor={false}
              />
            )}
          </View>
        </ScrollView>
        {showFirstNameChangeModal && (
          <DisplayNameChangeModal
            value={firstName}
            setValue={setFirstName}
            isModalVisible={showFirstNameChangeModal}
            setIsModalVisible={setShowFirstNameChangeModal}
          />
        )}
        {showLastNameChangeModal && (
          <DisplayNameChangeModal
            value={lastName}
            setValue={setLastName}
            isModalVisible={showLastNameChangeModal}
            setIsModalVisible={setShowLastNameChangeModal}
          />
        )}

        {showAlert && (
          <AlertModal
            title="Saved!"
            message="Profile informations have been saved and updated successfully."
            isModalVisible={showAlert}
            setIsModalVisible={setShowAlert}
          />
        )}

        {showLanguageModal && (
          <CustomDropdownModal
            array={p_language}
            onPress={_onDropdownSelectionPress}
            isModalVisible={showLanguageModal}
            setIsModalVisible={setShowLanguageModal}
          />
        )}
        {showUpdateFailedModal && (
          <AlertModal
            title="Update Failed!"
            message={UserReducer?.errorModal?.msg}
            isModalVisible={showUpdateFailedModal}
            setIsModalVisible={setShowUpdateFailedModal}
            onPress={() => setErrorModal()}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
const styles = StyleSheet.create({
  loadingComponent: {
    borderRadius: width * 0.02,
    position: 'relative',
    backgroundColor: colors.themePurple1,
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
    top: height * -0.02,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pencilIcon: {
    color: 'black',
    fontSize: width * 0.045,
    paddingLeft: width * 0.02,
  },
  usernameWordsStyle: {
    fontSize: width * 0.12,
    marginBottom: -20,
    textTransform: 'uppercase',
    color: colors.themePurple1,
    // backgroundColor:'red'
  },
  btnStyle: {
    borderRadius: width * 0.02,
    backgroundColor: colors.themePurple1,
  },
  btnTextColor: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.045,
  },
  btnContainer: {
    alignItems: 'center',
    marginTop: height * 0.05,
    // paddingBottom: 100,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#707070',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLinePosition: {
    flexDirection: 'row',
    marginLeft: width * 0.1,
    marginRight: width * 0.1,
  },
  heading: {
    color: 'black',
    marginLeft: width * 0.08,
    fontSize: width * 0.08,
    marginTop: height * 0.04,
  },
  boxContainer: {
    borderRadius: width * 0.8,
    height: width * 0.48,
    width: width * 0.48,
    alignItems: 'center',
    marginHorizontal: width * 0.22,
    marginTop: width * 0.06,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'rgba(0,0,0,0.008)',
    // paddingHorizontal: width * 0.2,
    // paddingVertical: height * 0.005,
  },
  nameLabel: {
    fontSize: height * 0.031,
    color: 'black',
    textTransform: 'capitalize',
    marginHorizontal: width * 0.1,
  },
  usernameStyle: {
    fontSize: height * 0.031,
    marginRight: width * 0.01,
    color: colors.themePurple1,
    textTransform: 'capitalize',
  },
  icon: {
    backgroundColor: colors.themePurple1,
    color: '#ffffff',
    padding: height * 0.01,
    borderRadius: width,
  },
  iconTouchable: {
    position: 'absolute',
    top: height * 0.19,
    right: width * 0.025,
    // borderRadius: 30 / 0.2,
  },
  border_line: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.12)',
    width: width * 0.95,
    fontFamily: 'Poppins-Regular',
  },
  imageStyle: {
    width: width * 0.5,
    height: height * 0.28,
    borderRadius: width * 0.8,
  },
  usernameViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.themePurple1,
    marginHorizontal: width * 0.1,
    marginVertical: height * 0.03,
  },
});

export default connect(mapStateToProps, actions)(Profile);
