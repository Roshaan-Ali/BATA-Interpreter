import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import Heading from '../components/Heading';
import IconComp from '../components/IconComp';
import colors from '../assets/colors';
import Button from '../components/Button';
import * as actions from '../store/actions/actions';
import {launchImageLibrary} from 'react-native-image-picker';
import DisplayNameChangeModal from '../components/DisplayNameChangeModal';
import {connect} from 'react-redux';
import AlertModal from '../components/AlertModal';

const {width, height} = Dimensions.get('window');

const Profile = ({navigation, UserReducer, updateUserData}) => {
  // image state
  const [userImage, setUserImage] = useState(null);
  const [image, setImage] = useState(UserReducer?.userData?.photo);

  // display name state
  const [displayName, setDisplayName] = useState(
    UserReducer?.userData?.username,
  );
  // modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Change Display Name
  const _onPressEditName = () => {
    setIsModalVisible(true);
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
        setUserImage(response);
      }
    });
  };

  // Save Button Function
  const _onPressSave = () => {
    let userData = {
      username: displayName,
      photo: userImage
        ? `data:${userImage.assets[0].type};base64,${userImage.assets[0].base64}`
        : image,
    };
    updateUserData(userData);
    setShowAlert(true);
  };
  return (
    <View style={styles.container}>
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
          {image || userImage ? (
            <Image
              source={{
                uri: userImage
                  ? `data:${userImage.assets[0].type};base64,${userImage.assets[0].base64}`
                  : image,
              }}
              style={[StyleSheet.absoluteFill, {borderRadius: 100}]}
              // style={styles.imageStyle}
            />
          ) : (
            <Heading
              passedStyle={styles.usernameWordsStyle}
              title={displayName?.match(/\b(\w)/g).join('')}
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

        {/* Username Container  & Password */}
        <View style={styles.usernameViewStyle}>
          <Heading
            title={
              displayName.length > 23
                ? `${displayName.substring(0, 23)}...`
                : displayName
            }
            passedStyle={styles.usernameStyle}
            fontType="medium"
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => _onPressEditName()}>
            <IconComp
              name="pencil"
              type="MaterialCommunityIcons"
              iconStyle={styles.pencilIcon}
            />
          </TouchableOpacity>
        </View>
        {/* <Inputbox
          passedStyle={styles.border_line}
          placeholderTilte="Change Password"
          placeholderTextColor="rgba(0,0,0,0.7)"
        />
        <Inputbox
          passedStyle={styles.border_line}
          placeholderTilte="Confirm Password"
          placeholderTextColor="rgba(0,0,0,0.7)"
        /> */}
        {/* Save Button  */}
        <View style={styles.btnContainer}>
          <Button
            title="SAVE"
            btnStyle={styles.btnStyle}
            onBtnPress={() => _onPressSave()}
            btnTextStyle={styles.btnTextColor}
            isBgColor={false}
          />
        </View>
      </ScrollView>
      {isModalVisible && (
        <DisplayNameChangeModal
          value={displayName}
          setValue={setDisplayName}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
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
    </View>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
const styles = StyleSheet.create({
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
    color: colors.themePurple1,
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
  usernameStyle: {
    fontSize: height * 0.031,
    marginRight: width * 0.01,
    color: colors.themePurple1,
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
    backgroundColor: 'blue',
    borderRadius: width,
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
    justifyContent: 'center',
    // justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.themePurple1,
    marginHorizontal: width * 0.1,
    marginVertical: height * 0.03,
  },
});

export default connect(mapStateToProps, actions)(Profile);
