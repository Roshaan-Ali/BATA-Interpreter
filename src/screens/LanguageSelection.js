import React, {useState} from 'react';
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
import colors from '../assets/colors';
import Heading from '../components/Heading';
import IconComp from '../components/IconComp';
import CustomDropdownModal from '../components/CustomDropdownModal';
import NoteToTranslatorModal from '../components/NoteToTranslatorModal';
import Button from '../components/Button';
import ConfirmTranslatorModal from '../components/ConfirmTranslatorModal';
import Modal from 'react-native-modal';

const {width, height} = Dimensions.get('window');

const LanguageSelection = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('Spanish (ES)');
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [showLanguagesDropdown, setShowLanguagesDropdown] = useState(false);
  const [showOccasionsDropdown, setShowOccasionsDropdown] = useState(false);
  const [noteToTranslator, setNoteToTranslator] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showNoteToTranslatorModal, setShowNoteToTranslatorModal] =
    useState(false);

  const languages = [
    {_id: 1, label: 'Chinese (ES)', value: 'Langugae 1'},
    {_id: 2, label: 'Porteguese (ES)', value: 'Langugae 2'},
    {_id: 3, label: 'Russian (ES)', value: 'Langugae 3'},
    {_id: 4, label: 'Romanian (ES)', value: 'Langugae 5'},
    {_id: 5, label: 'Spanish (ES)', value: 'Langugae 4'},
  ];

  const occasions = [
    {_id: 1, label: 'Christmas Party', value: 'Occasions 1'},
    {_id: 2, label: 'Halloween Day', value: 'Occasions 2'},
    {_id: 3, label: 'Thanksgiving', value: 'Occasions 3'},
    {_id: 4, label: 'Black Friday', value: 'Occasions 4'},
    {_id: 5, label: 'Independence Day', value: 'Occasions 5'},
  ];

  const _onLanguageSelectionPress = item => {
    setSelectedLanguage(item.label);
    setShowLanguagesDropdown(false);
  };

  const _onOccasionsSelectionPress = item => {
    setSelectedOccasion(item.label);
    setShowOccasionsDropdown(false);
  };

  const _onNextPress = () => {
    navigation.navigate('Searching');
  };
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Langugae Dropdown  */}
        <TouchableOpacity
          style={styles.languageInfoView}
          activeOpacity={0.7}
          onPress={() => setShowLanguagesDropdown(true)}>
          <View style={styles.rowView}>
            <IconComp
              type="FontAwesome"
              name="language"
              iconStyle={styles.menuStyle}
            />
            <Heading
              title={selectedLanguage ? selectedLanguage : 'Language'}
              passedStyle={styles.langInfoText}
            />
          </View>
          <IconComp
            type="AntDesign"
            name="caretdown"
            iconStyle={styles.caretdown}
          />
        </TouchableOpacity>

        {/* Selected Languages Translation  */}
        <View style={styles.transaltionView}>
          <Heading
            title={'English (ES)'}
            passedStyle={styles.translationLanguage}
          />
          <IconComp
            type="AntDesign"
            name="caretright"
            iconStyle={styles.caretRightLanguage}
          />
          <Heading
            title={selectedLanguage}
            passedStyle={styles.translationLanguage}
          />
        </View>

        {/* Occasions Button  */}
        <TouchableOpacity
          style={styles.btnStyle}
          activeOpacity={0.8}
          onPress={() => setShowOccasionsDropdown(true)}>
          {/* // onPress={() => navigation.navigate('Booking')}> */}
          <Heading
            title={selectedOccasion ? selectedOccasion : 'Occasions'}
            fontType="medium"
            passedStyle={styles.btnTextStyle}
          />
          <IconComp
            type="AntDesign"
            name="caretright"
            iconStyle={styles.caretRight}
          />
        </TouchableOpacity>

        {/* Note to translator Button  */}
        <TouchableOpacity
          style={styles.btnStyle}
          activeOpacity={0.8}
          onPress={() => setShowNoteToTranslatorModal(true)}>
          <Heading
            title={'Note to translator'}
            fontType="medium"
            passedStyle={styles.btnTextStyle}
          />
          <IconComp
            type="AntDesign"
            name="caretright"
            iconStyle={styles.caretRight}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.approxBox}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('ConfirmModal', dummyTranslator)}
          // onPress={() => setShowConfirmModal(true)}
        >
          <Heading title="$800.00 approx." passedStyle={styles.approxLabel} fontType="bold"/>
          <Heading title="Total time 4 Hours" passedStyle={styles.totalHours} />
        </TouchableOpacity>

        <Button
          title="Next"
          onBtnPress={() => _onNextPress()}
          btnStyle={styles.nextBtnStyle}
          isBgColor={false}
          btnTextStyle={{fontFamily: 'Poppins-SemiBold', color: 'white'}}
        />
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

      {/*Ocassions Dropdown Modal  */}
      {showOccasionsDropdown && (
        <CustomDropdownModal
          array={occasions}
          onPress={_onOccasionsSelectionPress}
          isModalVisible={showOccasionsDropdown}
          setIsModalVisible={setShowOccasionsDropdown}
        />
      )}

      {/* Message To Translator Modal  */}
      {showNoteToTranslatorModal && (
        <NoteToTranslatorModal
          value={noteToTranslator}
          setValue={setNoteToTranslator}
          isModalVisible={showNoteToTranslatorModal}
          setIsModalVisible={setShowNoteToTranslatorModal}
        />
      )}
      {/* <Modal
        statusBarTranslucent
        isVisible={showConfirmModal}
        onBackdropPress={() => setShowConfirmModal(false)}></Modal> */}
      {/* Confirmation Modal  */}
      {showConfirmModal && (
        <ConfirmTranslatorModal
          data={dummyTranslator}
          onPress={() => {}}
          isModalVisible={showConfirmModal}
          setIsModalVisible={setShowConfirmModal}
        />
      )}
    </View>
  );
};

export default LanguageSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
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
    marginTop: height * 0.05,
    marginVertical: height * 0.02,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width * 0.8,
    borderRadius: width * 0.04,
    borderWidth: 1.2,
    height: height * 0.084,
    borderColor: colors.themePurple1,
    position: 'relative',
  },
  transaltionView: {
    marginVertical: height * 0.02,
    marginHorizontal: width * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  translationLanguage: {
    fontSize: width * 0.045,
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
  },
  langInfoText: {
    color: '#5d5d5d',
    fontSize: width * 0.04,
  },
  btnStyle: {
    borderRadius: width * 0.04,
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
});

const dummyTranslator = {
  _id: 1,
  name: 'michael reimer',
  type: 'translator',
  native: 'english',
  phone: '0800 1234 567',
};
