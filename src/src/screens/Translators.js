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
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import colors from '../assets/colors';
import Button from '../components/Button';
import CustomDropdownModal from '../components/CustomDropdownModal';
// import DatePicker from '../components/DatePicker';
import Heading from '../components/Heading';
import IconComp from '../components/IconComp';
import DatePicker from 'react-native-date-picker';
import MapView from 'react-native-maps';
const {width, height} = Dimensions.get('window');

const Translator = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  );
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const languages = [
    {_id: 1, label: 'Information 1'},
    {_id: 2, label: 'Information 2'},
    {_id: 3, label: 'Information 3'},
    {_id: 4, label: 'Information 4'},
    {_id: 5, label: 'Information 5'},
  ];

  //   Submit Button Handler
  const _onNextPress = () => {
    navigation.navigate('Language');
  };

  // My Location Handler
  const _onMicPress = () => {
    console.log('My location searching');
  };

  // on Press Dropdown item
  const _onAddtionalInfoPress = item => {
    setSelectedValue(item.label);
    setShowAdditionalInfo(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={false}>
        {/* Map View  */}
        <View style={styles.mapView}>
          <MapView
            // ref={mapRef}
            style={{height: height * 0.3, width: width}}
            showsMyLocationButton={true}
            zoomEnabled={true}
            scrollEnabled={true}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onRegionChangeComplete={e => {
              console.log(e);
            }}></MapView>
        </View>

        {/* Filters View  */}
        <View style={styles.filterView}>
          {/* Location Search  */}
          <GooglePlacesAutocomplete
            placeholder="Translation Address"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: 'AIzaSyDGCEsILkoCpmz1Gn63Kf754Jmb2YmOMJo',
              language: 'en',
            }}
            renderLeftButton={() => (
              <IconComp
                name="search"
                type="MaterialIcons"
                iconStyle={styles.iconStyle}
              />
            )}
            // renderRightButton={() => (
            //   <TouchableOpacity onPress={() => _onMicPress()}>
            //     <IconComp
            //       name="mic"
            //       type="Ionicons"
            //       iconStyle={styles.myLocationIconStyle}
            //     />
            //   </TouchableOpacity>
            // )}
            styles={{
              textInputContainer: {
                width: width * 0.9,
                borderRadius: width * 0.04,
                borderWidth: 1.2,
                height: height * 0.084,
                borderColor: colors.themePurple1,
              },
              textInput: {
                height: height * 0.084,
                fontFamily: 'Poppins-Regular',
                color: '#5d5d5d',
                backgroundColor: 'rgba(0,0,0,0.006)',
                fontSize: width * 0.04,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
          />

          {/* Additional Info  */}
          <TouchableOpacity
            style={styles.additonalInfoView}
            activeOpacity={0.7}
            onPress={() => setShowAdditionalInfo(true)}>
            <View style={styles.rowView}>
              <IconComp
                type="Feather"
                name="menu"
                iconStyle={styles.menuStyle}
              />
              <Heading
                title={selectedValue ? selectedValue : 'Additional Information'}
                passedStyle={styles.additionalInfoText}
                fontType="regular"
              />
            </View>
            <IconComp
              type="AntDesign"
              name="caretdown"
              iconStyle={styles.caretdown}
            />
          </TouchableOpacity>

          {/* Date Pickers  */}
          <View style={styles.rowView}>
            {/* start date  */}
            <View style={styles.rowView}>
              <TouchableOpacity
                style={styles.datePickerView}
                activeOpacity={0.7}
                onPress={() => {
                  setShowStartDatePicker(true);
                }}>
                <Heading
                  title={moment(startDate).format('DD-MMM-YYYY')}
                  passedStyle={styles.additionalInfoText}
                />
                <Heading
                  title={moment(startDate).format('hh:mm A')}
                  passedStyle={styles.additionalInfoText}
                />
              </TouchableOpacity>
              <IconComp
                type="Ionicons"
                name="calendar"
                iconStyle={styles.eventStyle}
              />
            </View>

            {/* end date  */}
            <View style={styles.rowView}>
              <TouchableOpacity
                style={styles.datePickerView}
                activeOpacity={0.7}
                onPress={() => {
                  setShowEndDatePicker(true);
                }}>
                <Heading
                  title={moment(endDate).format('DD-MMM-YYYY')}
                  passedStyle={styles.additionalInfoText}
                />
                <Heading
                  title={moment(endDate).format('hh:mm A')}
                  passedStyle={styles.additionalInfoText}
                />
              </TouchableOpacity>
              <IconComp
                type="Ionicons"
                name="calendar"
                iconStyle={styles.eventStyle}
              />
            </View>
          </View>

          {/* Next Button  */}
          <Button
            title="Next"
            onBtnPress={() => _onNextPress()}
            btnStyle={styles.btnStyle}
            isBgColor={false}
            btnTextStyle={{fontFamily: 'Poppins-SemiBold', color: 'white'}}
          />
        </View>
      </ScrollView>

      {showAdditionalInfo && (
        <CustomDropdownModal
          array={languages}
          onPress={_onAddtionalInfoPress}
          isModalVisible={showAdditionalInfo}
          setIsModalVisible={setShowAdditionalInfo}
        />
      )}

      {/* Start Date Picker  */}
      <DatePicker
        modal
        // mode="date"
        open={showStartDatePicker}
        minimumDate={startDate}
        date={startDate}
        onConfirm={date => {
          setShowStartDatePicker(false);
          setStartDate(date);
        }}
        onCancel={() => {
          setShowStartDatePicker(false);
        }}
      />
      {/* End Date Picker  */}
      <DatePicker
        modal
        // mode="date"
        minimumDate={endDate}
        open={showEndDatePicker}
        date={endDate}
        onConfirm={date => {
          setShowEndDatePicker(false);
          setEndDate(date);
        }}
        onCancel={() => {
          setShowEndDatePicker(false);
        }}
      />
    </View>
  );
};

export default Translator;

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
    width: width * 0.9,
    backgroundColor: 'rgba(0,0,0,0.05)',
    height: height * 0.085,
  },
  inputField: {
    marginTop: height * 0.03,
    height: height * 0.23,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderWidth: 1.2,
    borderColor: colors.themePurple1,
    borderRadius: width * 0.05,
    width: width * 0.9,
    fontSize: width * 0.04,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.025,
    textAlignVertical: 'top',
  },
  mapView: {
    height: height * 0.3,
    width: width,
  },
  map: {
    width: '120%',
    marginLeft: -30,
    height: '100%',
  },
  filterView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: height * 0.02,
  },
  btnStyle: {
    marginTop: height * 0.03,
    backgroundColor: colors.themePurple1,
    borderRadius: width * 0.07,
    width: width * 0.9,
  },
  iconStyle: {
    color: 'grey',
    fontSize: width * 0.06,
    alignSelf: 'center',
    paddingLeft: width * 0.05,
    paddingVertical: height * 0.02,
    // backgroundColor: 'rgba(0,0,0,0.03)',
  },
  eventStyle: {
    color: colors.themePurple1,
    fontSize: width * 0.07,
    alignSelf: 'center',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.02,
    // backgroundColor: 'rgba(0,0,0,0.03)',
  },
  languageStyle: {
    color: 'grey',
    fontSize: width * 0.06,
    alignSelf: 'center',
    paddingLeft: width * 0.05,
    paddingVertical: height * 0.02,
  },
  myLocationIconStyle: {
    color: 'grey',
    fontSize: width * 0.05,
    marginTop: height * 0.005,
    paddingRight: width * 0.04,
    paddingVertical: height * 0.02,
    // backgroundColor: 'rgba(0,0,0,0.03)',
  },
  additonalInfoView: {
    marginVertical: height * 0.03,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width * 0.9,
    borderRadius: width * 0.04,
    borderWidth: 1.2,
    height: height * 0.084,
    borderColor: colors.themePurple1,
    position: 'relative',
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
  additionalInfoText: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: width * 0.04,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePickerView: {
    // marginVertical: height * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.32,
    borderRadius: width * 0.04,
    borderWidth: 1.2,
    height: height * 0.084,
    borderColor: colors.themePurple1,
  },
});
