import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import colors from '../assets/colors';
import Button from '../components/Button';
import Heading from '../components/Heading';
import LottieView from 'lottie-react-native';
import IconComp from '../components/IconComp';
import * as actions from '../store/actions/actions';
import AppStatusBar from '../components/AppStatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomDropdownModal from '../components/CustomDropdownModal';
import ConfirmTranslatorModal from '../components/ConfirmTranslatorModal';
import NoteToTranslatorModal from '../components/NoteToTranslatorModal';
import AlertModal from '../components/AlertModal';
import Header from '../components/Header';
import {useIsFocused} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const LanguageSelection = ({
  route,
  navigation,
  UserReducer,
  updateUserData,
  getAllLanguages,
  setErrorModal,
}) => {
  const [languages, setLangugaes] = useState(UserReducer?.languages);
  const LIMIT = UserReducer?.languages?.length;
  const accessToken = UserReducer?.accessToken;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLanguagesDropdown, setShowLanguagesDropdown] = useState(false);
  const [showIncompleteFormAlert, setShowIncompleteFormAlert] = useState(false);
  const isFocused = useIsFocused();
  const [showUpdateFailedModal, setShowUpdateFailedModal] = useState(
    UserReducer?.errorModal?.status,
  );
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const _onLanguageSelectionPress = item => {
    const oldArray = [...selectedLanguages];
    const index = oldArray.findIndex(x => x.id === selectedOption?.id);
    oldArray[index] = item;
    setSelectedLanguages(oldArray);
    setShowLanguagesDropdown(false);
  };

  const _onNextPress = async () => {
    setIsLoading(true);
    if (selectedLanguages.length > 0) {
      const userData = {
        first_name: UserReducer?.userData?.first_name,
        last_name: UserReducer?.userData?.last_name,
        language: selectedLanguages?.map(ele => ele.id),
        profile_image: UserReducer?.userData?.profile_image,
      };

      await updateUserData(userData, accessToken).then(() =>
        setShowSuccessModal(true),
      );
    } else {
      setShowIncompleteFormAlert(true);
    }
    setIsLoading(false);
  };

  const _onPressAddInterpreter = () => {
    const oldArray = [...selectedLanguages];
    if (selectedLanguages?.length <= LIMIT - 1) {
      setSelectedLanguages([...oldArray, languages[0]]);
    } else {
      return;
    }
  };

  const _onPressBin = item => {
    if (selectedLanguages?.length > 1 && selectedLanguages?.length <= LIMIT) {
      const index = selectedLanguages?.findIndex(x => x.id === item?.id);
      const oldArray = [...selectedLanguages];
      oldArray.splice(index, 1);
      setSelectedLanguages(oldArray);
    } else {
      return;
    }
  };

  useEffect(() => {
    if (UserReducer?.errorModal?.status === true) {
      setShowErrorModal(true);
    }
    if (UserReducer?.errorModal?.status === false) {
      setShowErrorModal(false);
    }
  }, [UserReducer?.errorModal]);

  useEffect(() => {
    if (isFocused) {
      console.log('Consolling from language screen');
      setErrorModal();
      getAllLanguages().then(() => {
        setSelectedLanguages(UserReducer?.userData?.language);
      });
    }
  }, [isFocused]);

  useEffect(() => {
    if (UserReducer?.errorModal?.status === true) {
      setShowUpdateFailedModal(true);
    }
    if (UserReducer?.errorModal?.status === false) {
      setShowUpdateFailedModal(false);
    }
  }, [UserReducer?.errorModal]);

  const checkAllElements = () => {
    var deSelectedRows = [...UserReducer?.languages],
      selectedRows = [...selectedLanguages],
      ids = new Set(selectedRows.map(({id}) => id));

    deSelectedRows = deSelectedRows.filter(({id}) => !ids?.has(id));

    setLangugaes(deSelectedRows);
  };
  useEffect(() => {
    checkAllElements();
  }, [selectedLanguages]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <AppStatusBar
          backgroundColor={colors.themePurple1}
          barStyle="light-content"
        />
        <Header title="Update Languages" navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Langugae Dropdown  */}
          {/* <Heading
            title="Update Languages"
            passedStyle={styles.heading}
            fontType="semi-bold"
          /> */}
          {selectedLanguages?.map((ele, index) => (
            <TouchableOpacity
              key={index}
              style={styles.languageInfoView}
              activeOpacity={0.7}
              onPress={() => {
                if (
                  selectedLanguages?.length < UserReducer?.languages?.length
                ) {
                  setSelectedOption(ele);
                  setShowLanguagesDropdown(true);
                }
              }}>
              <View style={styles.rowView}>
                <IconComp
                  type="FontAwesome"
                  name="language"
                  iconStyle={styles.menuStyle}
                />
                <Heading
                  title={ele?.language_name ? ele?.language_name : 'Language'}
                  passedStyle={styles.langInfoText}
                />
              </View>
              <IconComp
                type="AntDesign"
                name="caretdown"
                iconStyle={styles.caretdown}
              />
            </TouchableOpacity>
          ))}

          {/* Selected Languages Translation  */}
          {selectedLanguages?.map((ele, index) => (
            <View style={styles.transaltionView} key={index}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <IconComp
                  type="AntDesign"
                  name="caretright"
                  iconStyle={styles.caretRightLanguage}
                />
                <Heading
                  title={ele?.language_name}
                  passedStyle={styles.translationLanguage}
                />
              </View>
              {selectedLanguages?.length > 1 &&
                selectedLanguages?.length <= LIMIT && (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => _onPressBin(ele)}>
                    <IconComp
                      type="Feather"
                      name="trash-2"
                      iconStyle={styles.bin}
                    />
                  </TouchableOpacity>
                )}
            </View>
          ))}

          {selectedLanguages?.length <= LIMIT - 1 && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                _onPressAddInterpreter();
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: height * 0.01,
                marginLeft: width * 0.1,
              }}>
              <IconComp
                type="Ionicons"
                name="md-add-circle-sharp"
                iconStyle={{color: colors.themePurple1, fontSize: width * 0.1}}
              />
              <Heading
                title="Add Language"
                passedStyle={styles.addInterpreter}
              />
            </TouchableOpacity>
          )}

          {isLoading ? (
            <View style={styles.loadingComponent} activeOpacity={1}>
              <Heading
                title="Please Wait"
                passedStyle={styles.savingText}
                fontType="semi-bold"
              />
              <LottieView
                speed={1}
                style={styles.lottieStyles}
                autoPlay
                loop
                source={require('../assets/Lottie/purple-loading-2.json')}
              />
            </View>
          ) : (
            <Button
              title="Update"
              onBtnPress={() => _onNextPress()}
              btnStyle={styles.nextBtnStyle}
              isBgColor={false}
              btnTextStyle={{fontFamily: 'Poppins-SemiBold', color: 'white'}}
            />
          )}
        </ScrollView>

        {/* Langugaes Dropdown Modal  */}

        {showLanguagesDropdown && (
          <CustomDropdownModal
            array={languages}
            onPress={_onLanguageSelectionPress}
            isModalVisible={showLanguagesDropdown}
            setIsModalVisible={setShowLanguagesDropdown}
          />
        )}

        {showErrorModal && (
          <AlertModal
            title="Submission Error :("
            message={`Something went wrong.`}
            isModalVisible={showErrorModal}
            setIsModalVisible={setShowErrorModal}
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
        {showSuccessModal && (
          <AlertModal
            title="Success!"
            message={`Languages have been updated.`}
            isModalVisible={showSuccessModal}
            setIsModalVisible={setShowSuccessModal}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(LanguageSelection);

const styles = StyleSheet.create({
  heading: {
    color: colors.themePurple1,
    marginLeft: width * 0.08,
    fontSize: width * 0.08,
    // marginTop: height * 0.04,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
  },
  dropdown: {
    marginTop: height * 0.03,
    paddingLeft: width * 0.03,
    borderWidth: 1.2,
    borderColor: colors.themePurple1,
    borderRadius: width * 0.04,
    width: width * 0.8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    height: height * 0.085,
  },
  languageInfoView: {
    // marginTop: height * 0.05,
    marginVertical: height * 0.01,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width * 0.8,
    alignSelf: 'center',
    borderRadius: width * 0.04,
    borderWidth: 1.2,
    height: height * 0.084,
    borderColor: colors.themePurple1,
    position: 'relative',
  },
  transaltionView: {
    marginVertical: height * 0.02,
    width: width * 0.75,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  translationLanguage: {
    fontSize: width * 0.045,
    textTransform: 'capitalize',
    color: 'black',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuStyle: {
    color: '#5d5d5d',
    fontSize: width * 0.04,
    paddingHorizontal: width * 0.05,
  },
  addInterpreter: {
    color: colors.themePurple1,
    fontSize: width * 0.045,
    marginLeft: width * 0.02,
    marginTop: height * 0.001,
  },
  caretdown: {
    color: '#5d5d5d',
    fontSize: width * 0.03,
    position: 'absolute',
    bottom: height * 0.03,
    right: width * 0.045,
  },
  caretRight: {
    color: colors.themePurple1,
    fontSize: width * 0.03,
    position: 'absolute',
    bottom: height * 0.04,
    right: width * 0.045,
  },
  caretRightLanguage: {
    color: colors.themePurple1,
    fontSize: width * 0.03,
    marginRight: width * 0.03,
  },
  bin: {
    color: colors.themePurple1,
    fontSize: width * 0.06,
  },
  langInfoText: {
    color: '#5d5d5d',
    fontSize: width * 0.04,
  },
  btnStyle: {
    borderRadius: width * 0.04,
    alignSelf: 'center',
    width: width * 0.8,
    backgroundColor: colors.themeLightPurple,
    paddingVertical: height * 0.03,
    marginVertical: height * 0.01,
  },
  btnTextStyle: {
    fontSize: width * 0.043,
    color: colors.themePurple1,
    textAlign: 'center',
  },
  nextBtnStyle: {
    alignSelf: 'center',
    marginTop: height * 0.03,
    backgroundColor: colors.themePurple1,
    borderRadius: width * 0.07,
    width: width * 0.75,
  },
  approxBox: {
    marginVertical: height * 0.025,
    height: height * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: width * 0.8,
    borderRadius: width * 0.09,
    borderWidth: 1.2,
    borderColor: colors.themePurple1,
    position: 'relative',
  },
  approxLabel: {
    fontSize: width * 0.07,
    color: colors.themePurple1,
  },
  totalHours: {
    fontWeight: '400',
    fontSize: width * 0.043,
    color: 'black',
  },

  lottieStyles: {
    height: height * 0.13,
    position: 'absolute',
    left: width * 0.11,
    right: 0,
    top: height * -0.015,
  },
  loadingComponent: {
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.themePurple1,
    alignSelf: 'center',
    height: height * 0.08,
    marginTop: height * 0.03,
    backgroundColor: colors.themePurple1,
    borderRadius: width * 0.07,
    width: width * 0.75,
  },
  savingText: {
    color: 'white',
    position: 'absolute',
    left: width * 0.18,
    top: height * 0.022,
    fontSize: width * 0.045,
  },
});
