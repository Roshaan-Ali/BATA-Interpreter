import React, {useState} from 'react';
import {StyleSheet, View, Image, Dimensions, ScrollView} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';

import Heading from '../components/Heading';
import colors from '../assets/colors';
import Header from '../components/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';
import {MotiView} from 'moti';
import * as actions from '../store/actions/actions';
import {connect} from 'react-redux';
import IconComp from '../components/IconComp';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Home({navigation, UserReducer}) {
  const [mapRef, setMapRef] = useState(null);
  let job = {
    _id: 1,
    name: 'Jason Brown',
    type: 'mechanic',
  };
  const [coordinates, setCoordinates] = useState([
    {
      latitude: 48.8587741,
      longitude: 2.2069771,
    },
    {
      latitude: 48.8323785,
      longitude: 2.3361663,
    },
  ]);
  const [username, setUsername] = useState(
    UserReducer?.userData?.username?.split(' ')[0],
  );

  console.log(UserReducer?.userData);
  const _onPaymentCardPress = () => {
    console.log('Payment Card Selected');
  };

  return (
    <View style={styles.container}>
      {/* Header  */}
      <Header title="Menu" navigation={navigation} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        {/* Greeting Container  */}
        <View style={styles.greetingContainer}>
          <View style={{flexDirection: 'column', marginLeft: width * 0.05}}>
            <MotiView
              from={{
                opacity: 0.5,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                type: 'timing',
                loop: true,
                duration: 1000,
              }}>
              <Heading
                title="Welcome,"
                passedStyle={styles.heading}
                fontType="light"
              />
              <Heading
                title={username}
                passedStyle={[
                  styles.heading_username,
                  username?.length > 7 && {fontSize: width * 0.08},
                ]}
                fontType="bold"
              />
            </MotiView>
          </View>

          <Image
            source={require('../assets/Images/handeshake.png')}
            style={styles.imageStyle}
          />
        </View>

        {/* Home Options  */}
        <View style={styles.optionsWrapper}>
          {/* Ratings  */}
          <View style={styles.optionContainer}>
            <View style={styles.ratingsContainer}>
              <Image
                source={require('../assets/Images/star.png')}
                style={styles.reviewImageStyle}
              />
              <Heading
                passedStyle={styles.myRatings}
                title={'4.2/5.0'}
                fontType="medium"
              />
            </View>
            <Heading
              passedStyle={styles.textStyle}
              title={'My Ratings'}
              fontType="regular"
            />
          </View>

          {/* Reviews  */}
          <TouchableOpacity
            style={styles.optionContainer}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Reviews')}>
            <View style={styles.optionImageContainer}>
              <IconComp
                name="chat"
                type="Entypo"
                iconStyle={styles.iconStyle}
              />
            </View>
            <Heading
              passedStyle={styles.textStyle}
              title={'Reviews'}
              fontType="regular"
            />
          </TouchableOpacity>
        </View>

        {/* Map  */}
        <View style={styles.map}>
          <MapView
            ref={ref => {
              setMapRef(ref);
            }}
            style={{width: width * 0.8, height: height * 0.36}}
            showsMyLocationButton={true}
            zoomEnabled={true}
            onMapReady={() => {
              mapRef.fitToCoordinates([coordinates[0], coordinates[1]], {
                animated: true,
                edgePadding: {
                  top: 150,
                  right: 50,
                  bottom: 100,
                  left: 50,
                },
              });
            }}
            onLayout={() => {
              mapRef.animateCamera({
                center: {
                  latitude: coordinates[0].latitude,
                  longitude: coordinates[0].longitude,
                },
                heading: 0,
                pitch: 90,
              });
            }}
            scrollEnabled={true}
            initialRegion={{
              latitude: coordinates[0].latitude,
              longitude: coordinates[0].longitude,
              latitudeDelta: 0.0622,
              longitudeDelta: 0.0121,
            }}
            followsUserLocation
            onRegionChangeComplete={e => {
              // console.log(e);
            }}>
            <MapViewDirections
              origin={coordinates[0]}
              destination={coordinates[1]}
              apikey={
                'AIzaSyBTsC4XcbDQgH_tBwHdKAUUXyVtdOTL4l0'
                // 'AIzaSyCyY4IPLEvPRxEtaWFcRWHkWG6n0nFYzEE'
              } // insert your API Key here
              strokeWidth={4}
              strokeColor="#111111"
            />
            <Marker coordinate={coordinates[0]} />
            <Marker coordinate={coordinates[1]} />
          </MapView>
        </View>

        {/* OnGoing Job  */}
        <View style={styles.ongoingJobsView}>
          <Heading
            title="Ongoing Job"
            fontType="bold"
            passedStyle={styles.ongoingLabel}
          />

          {job ? (
            <TouchableOpacity
              style={styles.popUpBoxContainer}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Searching')}>
              <View style={styles.rowView}>
                <Image
                  resizeMode="contain"
                  source={require('../assets/Images/profile-image.jpeg')}
                  style={{width: width * 0.13, borderRadius: 70}}
                />
                <View>
                  <Heading
                    passedStyle={styles.popUpText}
                    title={'Jason Brown'}
                    fontType="bold"
                  />
                  <Heading
                    passedStyle={styles.textMechanic}
                    title={'Work Assigned'}
                    fontType="medium"
                  />
                </View>
              </View>

              <IconComp
                name="chevron-with-circle-right"
                type={'Entypo'}
                iconStyle={styles.leftIconStyle}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.noJobsView}>
              <Image
                resizeMode="contain"
                source={require('../assets/Images/warn.png')}
                style={styles.noJobImage}
              />
              <Heading
                title="No job assigned yet."
                passedStyle={styles.noJobTitle}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ongoingJobsView: {
    borderTopColor: 'rgba(0,0,0,0.08)',
    borderTopWidth: 1,
    marginTop: height * 0.03,
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.08,
  },
  ongoingLabel: {
    fontSize: width * 0.05,
    color: colors.themePurple1,
  },
  noJobsView: {
    marginTop: height * 0.02,
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  noJobTitle: {
    fontSize: width * 0.05,
    marginLeft: width * 0.02,
  },
  noJobImage: {
    width: width * 0.1,
    height: height * 0.05,
  },
  optionsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height * 0.025,
    // backgroundColor: 'red',
    width: width * 0.9,
    alignSelf: 'center',
    flexWrap: 'wrap',
  },
  iconStyle: {
    fontSize: width * 0.09,
    color: colors.themeYellow,
  },
  textStyle: {
    fontSize: width * 0.04,
    color: 'black',
    textTransform: 'capitalize',
  },
  myRatings: {
    fontSize: width * 0.04,
    color: 'white',
    marginTop: height * 0.01,
  },
  optionImageContainer: {
    paddingVertical: height * 0.032,
    paddingHorizontal: width * 0.12,
    marginBottom: height * 0.018,
    backgroundColor: colors?.themePurple1,
    borderRadius: width * 0.045,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingsContainer: {
    paddingVertical: height * 0.008,
    paddingHorizontal: width * 0.1,
    marginBottom: height * 0.018,
    backgroundColor: colors?.themePurple1,
    borderRadius: width * 0.045,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionImageStyle: {
    width: width * 0.1,
    height: height * 0.05,
  },
  reviewImageStyle: {
    width: width * 0.1,
    height: height * 0.05,
  },
  optionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.02,
    width: width * 0.4,
    // backgroundColor:'yellow'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    marginVertical: height * 0.04,
    width: width * 0.8,
    height: height * 0.36,
    alignSelf: 'center',
    borderRadius: width * 0.05,
    overflow: 'hidden',
  },
  img_wave: {
    marginTop: height * 0.15,
    marginLeft: width * 0.12,
  },
  heading: {
    color: 'black',
    // marginLeft: width * 0.12,
    fontSize: width * 0.11,
  },
  heading_username: {
    color: colors.themePurple1,
    fontSize: width * 0.11,
    marginTop: height * -0.03,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
    marginTop: height * 0.02,
    marginHorizontal: width * 0.05,
  },
  imageStyle: {
    width: width * 0.16,
    marginLeft: width * 0.05,
    height: height * 0.08,
  },
  flatListStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.045,
  },
  paymentOptionsContainer: {
    borderWidth: 1.2,
    paddingVertical: height * 0.02,
    width: width * 0.8,
    marginHorizontal: width * 0.1,
    borderRadius: width * 0.04,
    borderColor: colors.themePurple1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardTextView: {
    flexDirection: 'column',
    marginRight: width * 0.1,
  },
  cardPaymenLabelText: {
    color: 'black',
    fontSize: width * 0.045,
  },
  cardImage: {
    width: width * 0.2,
    height: height * 0.07,
  },

  popUpBoxContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: width * 0.04,
    justifyContent: 'space-between',
    borderRadius: width * 0.02,
    height: height * 0.13,
    width: width * 0.85,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      height: 9,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: '#fff',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textMechanic: {
    fontSize: height * 0.017,
    color: 'gray',
    marginLeft: width * 0.03,
  },
  popUpText: {
    fontSize: height * 0.025,
    color: 'black',
    marginLeft: width * 0.03,
  },
  leftIconStyle: {
    marginLeft: width * 0.14,
    color: colors.themePurple1,
    fontSize: 20,
  },
});

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(Home);

const options = [
  {
    _id: 1,
    image: require('../assets/Images/translate.png'),
    text: 'translator',
    routeName: 'Translator',
  },
  {
    _id: 2,
    image: require('../assets/Images/package.png'),
    text: 'packages',
    routeName: 'Packages',
  },
];
