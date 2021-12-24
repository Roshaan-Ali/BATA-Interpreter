import {
  Dimensions,
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Circle, Geojson, Marker, Polyline} from 'react-native-maps';
import colors from '../assets/colors';
import Heading from '../components/Heading';
import PROFILE_IMAGE from '../assets/Images/profile-image.jpeg';
import IconComp from '../components/IconComp';
import MapViewDirections from 'react-native-maps-directions';

const {width, height} = Dimensions.get('window');

const SearchingScreen = ({navigation}) => {
  const [status, setStatus] = useState('work assigned');
  const [mapRef, setMapRef] = useState(null);
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
  useEffect(() => {
    setTimeout(() => {
      if (status === 'work assigned') {
        setStatus('arrived');
      } else {
        setStatus('work done');
      }
    }, 5000);
  }, [status]);
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <MapView
        ref={ref => {
          setMapRef(ref);
        }}
        style={{height: height, width: width}}
        showsMyLocationButton={true}
        zoomEnabled={true}
        scrollEnabled={true}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
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
        onRegionChangeComplete={e => {
          console.log(e);
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

      {/* Information View  */}
      <View
        style={[
          styles.informationView,
          status === 'arrived' && {height: height * 0.35},
          status === 'work done' && {height: height * 0.2},
        ]}>
        {status == 'work assigned' ? (
          <>
            {/* Interpreter Details  */}
            <View style={styles.interpreterView}>
              <Image
                resizeMode="contain"
                source={PROFILE_IMAGE}
                style={styles.imageStyle}
              />
              <View style={styles.rowView}>
                <Heading
                  title="Interpreter John"
                  passedStyle={styles.usernameStyle}
                  fontType="semi-bold"
                />
                <Heading
                  title="Professional"
                  passedStyle={styles.userTypeStyle}
                />
              </View>
            </View>

            {/* Location Pick Point Details  */}
            <View style={styles.detailView}>
              {/* Timeline  */}
              <View style={styles.timelineView}>
                <IconComp
                  type="FontAwesome"
                  name="dot-circle-o"
                  iconStyle={styles.eventStyle}
                />
                <View style={styles.verticalLine} />
                <IconComp
                  type="Entypo"
                  name="location-pin"
                  iconStyle={styles.eventStyle}
                />
              </View>

              {/* Pick Points  */}
              <View style={styles.textView}>
                <View style={styles.pickpoint1}>
                  <Heading
                    title="Pickup Point"
                    passedStyle={styles.pickupLabel}
                    fontType="semi-bold"
                  />
                  <Heading
                    title="New York, USA"
                    passedStyle={styles.loctionLabel}
                  />
                </View>
                <View style={styles.pickpoint2}>
                  <Heading
                    title="Pickup Point"
                    passedStyle={styles.pickupLabel}
                    fontType="semi-bold"
                  />
                  <Heading
                    title="New York, USA"
                    passedStyle={styles.loctionLabel}
                  />
                </View>
              </View>
            </View>
          </>
        ) : status == 'arrived' ? (
          <View style={{width: width * 0.9}}>
            {/* Interpreter View  */}
            <View style={styles.interpreterView}>
              <Image
                resizeMode="contain"
                source={PROFILE_IMAGE}
                style={styles.imageStyle}
              />
              <View style={styles.rowView}>
                <Heading
                  title="Interpreter John"
                  passedStyle={styles.usernameStyle}
                  fontType="semi-bold"
                />
                <Heading
                  title="Professional"
                  passedStyle={styles.userTypeStyle}
                />
              </View>
            </View>
            {/* Call Now  */}
            <TouchableOpacity
              style={styles.buttonWrapper}
              activeOpacity={0.8}
              onPress={() => Linking.openURL(`tel:${'030322112121'}`)}>
              <IconComp
                type="FontAwesome"
                name="phone"
                iconStyle={styles.buttonIconStyle}
              />

              <Heading
                title="Call Now"
                passedStyle={styles.buttonLabel}
                fontType="medium"
              />
            </TouchableOpacity>

            {/* Message  */}
            <TouchableOpacity style={styles.buttonWrapper} activeOpacity={0.8}>
              <IconComp
                type="FontAwesome"
                name="envelope"
                iconStyle={styles.buttonIconStyle}
              />

              <Heading
                title="Message"
                passedStyle={styles.buttonLabel}
                fontType="medium"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Payment View 💵 */}
            <View style={styles.paymentView}>
              <Heading
                title="Payment Type"
                passedStyle={styles.payment}
                fontType="semi-bold"
              />
              <Heading
                title="Stripe"
                passedStyle={styles.payment}
                fontType="semi-bold"
              />
            </View>

            {/* Work Done ✔ */}
            <TouchableOpacity
              style={styles.workDoneView}
              activeOpacity={0.9}
              onPress={() => {
                console.log('test');
                navigation.navigate('Home');
              }}>
              <Heading title="Work Done" passedStyle={styles.workDone} />
              <IconComp
                type="AntDesign"
                name="checkcircleo"
                iconStyle={[
                  styles.workDoneIconStyle,
                  {marginLeft: width * 0.04},
                ]}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default SearchingScreen;

const styles = StyleSheet.create({
  workDoneView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.015,
    justifyContent: 'center',
    borderRadius: width * 0.07,
    width: width * 0.5,
    alignSelf: 'center',
    backgroundColor: colors.themePurple1,
  },
  paymentView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.07,
    paddingVertical: height * 0.025,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.03,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
    paddingLeft: width * 0.1,
  },
  pickpoint2: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: width * 0.6,
    paddingVertical: height * 0.01,
  },
  pickpoint1: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    width: width * 0.6,
    paddingVertical: height * 0.01,
  },
  verticalLine: {
    width: 2,
    height: height * 0.1,
    backgroundColor: colors.themePurple1,
    position: 'absolute',
    top: height * 0.044,
  },
  container: {
    height: '100%',
    width: '100%',
  },
  mapVieww: {
    backgroundColor: 'red',
  },
  informationView: {
    height: height * 0.4,
    width: width * 0.9,
    position: 'absolute',
    // borderWidth:2,
    // borderColor: colors.themePurple1,
    bottom: 15,
    backgroundColor: 'white',
    elevation: 8,
    borderRadius: 30,
    alignSelf: 'center',
    zIndex: 9999,
  },
  interpreterView: {
    flexDirection: 'row',
    height: height * 0.16,
    // backgroundColor:'rgba(0,0,0,0.07)',
    width: width * 0.9,
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  imageStyle: {
    width: width * 0.18,
    borderRadius: width * 0.5,
  },
  usernameStyle: {
    fontSize: width * 0.05,
    color: 'black',
  },
  userTypeStyle: {
    fontSize: width * 0.04,
    color: 'grey',
  },
  rowView: {
    marginLeft: width * 0.03,
    justifyContent: 'center',
  },
  detailView: {
    flexDirection: 'row',
    width: width * 0.9,
  },
  pickupLabel: {
    fontSize: width * 0.04,
    color: 'black',
    fontWeight: '500',
  },
  loctionLabel: {
    fontSize: width * 0.04,
    marginTop: height * 0.007,
    color: 'black',
  },
  timelineView: {
    justifyContent: 'space-between',
    paddingVertical: height * 0.02,
    paddingRight: width * 0.06,
    paddingLeft: width * 0.06,
    alignItems: 'center',
    height: height * 0.2,
  },
  textView: {
    flexDirection: 'column',
  },
  eventStyle: {
    color: colors.themePurple1,
    fontSize: width * 0.07,
    alignSelf: 'center',
    margin: 0,
    padding: 0,
  },
  buttonLabel: {
    fontSize: width * 0.04,
    marginLeft: width * 0.04,
    color: 'black',
  },
  buttonIconStyle: {
    color: colors.themePurple1,
    fontSize: width * 0.05,
    // alignSelf: 'center',
    marginTop: height * -0.007,
  },
  payment: {
    fontSize: width * 0.05,
    color: 'black',
    fontWeight: '500',
  },
  workDone: {
    fontSize: width * 0.05,
    color: '#fff',
    fontWeight: '500',
  },
  workDoneIconStyle: {
    color: '#fff',
    fontSize: width * 0.07,
    alignSelf: 'center',
  },
});
