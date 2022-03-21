import {
  Dimensions,
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import MapView, {
  Circle,
  Geojson,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import colors from '../assets/colors';
import Heading from '../components/Heading';
import PROFILE_IMAGE from '../assets/Images/profile-image.jpeg';
import IconComp from '../components/IconComp';
import {Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapViewDirections from 'react-native-maps-directions';
import * as actions from './../store/actions/actions';
import {imageUrl, googleMapURL, googleKey} from '../config/config';
import {connect} from 'react-redux';
import axios from 'axios';
const {width, height} = Dimensions.get('window');

const SearchingScreen = ({navigation, UserReducer, firebaseDataRedux}) => {
  const [status, setStatus] = useState('work assigned');
  const [currentLocation, onChangeCurrentLocation] = useState('');
  const [mapRef, setMapRef] = useState(null);
  const [data, onChangeData] = useState(null);
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.05;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [userCoords, setUserCoords] = React.useState({
    latitude: null,
    longitude: null,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [interpreter, setInterpreterCoords] = React.useState({
    latitude: null,
    longitude: null,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const placename = async () =>{
    let placename;
    let state;
    let city;
    let country;
    if(interpreter?.latitude){
      await axios.get(`${googleMapURL}`, {
        params: {
            latlng: interpreter.latitude + "," + interpreter.longitude,
            key: googleKey
        }
      }).then((res)=>{
        if (res.data.status == "OK") {
          placename = res.data.results[1].formatted_address
          console.log(placename)
          onChangeCurrentLocation(placename)
          // let arrayLoc = res.data.results[0].address_components;
          // for (let i = 0; i < arrayLoc.length; i++) {
          //     if (arrayLoc[i].types.includes('country')) {
          //         country = arrayLoc[i].long_name;
          //         console.log(country);
          //     }
          //     if (arrayLoc[i].types.includes('administrative_area_level_2')) {

          //         state = arrayLoc[i].long_name;
          //         console.log(state);
          //     }
          //     if (arrayLoc[i].types.includes('administrative_area_level_1')) {

          //         city = arrayLoc[i].long_name;
          //         console.log(city);
          //     }
          // }
      } 

      }).catch((err)=>{
        console.log(err)
      })
    }
  }

  useEffect(()=>{
    console.log(firebaseDataRedux?.firebaseData?.data?.type, "REMOTE MESSAGE")
    if(firebaseDataRedux?.firebaseData){
      if(firebaseDataRedux?.firebaseData?.data?.type == "workDone"){
        navigation.goBack()
      }
    }
  },[UserReducer])

  useEffect(()=>{
    try{
      placename()
    }catch(err){
      console.log(err)
    }
  },[])

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

  useMemo(() => {
    if (UserReducer?.coords) {
      setInterpreterCoords({
        latitude: UserReducer?.coords?.lat,
        longitude: UserReducer?.coords?.lng,
      });
    }
  }, [UserReducer]);

  useEffect(() => {
    console.log(UserReducer?.currentBooking, 'API DATA');
    if (UserReducer?.currentBooking) {
      onChangeData(UserReducer?.currentBooking);
      setUserCoords({
        latitude: parseFloat(UserReducer?.currentBooking?.lat),
        longitude: parseFloat(UserReducer?.currentBooking?.longe),
      });
    }
  }, [UserReducer]);

  //   "additional_info": null,
  //   "client": {
  //     "first_name": "Ahsan",
  //     "id": 314,
  //     "phone": "+923488300016",
  //     "profile_image": "1643712194368rn_image_picker_lib_temp_29611e19-aeef-4fc1-a1a5-419c143f2967.jpg"
  //   },
  //   "clientLanguage":
  //   {"id": 524,
  //   "language": 29,
  //   "user": 314
  // },
  // "end_date": "Wed Feb 02 2022 16:03:37 GMT+0500 (PKT)",
  // "id": 158,
  // "lat": "24.79296628588004",
  // "longe": "67.06482080742717",
  // "note_to_translator": "",
  // "occasion": {"id": 18, "name": "Occation 2", "status": 1},
  // "requireLanguage": {"id": 28, "language_name": "Chinese", "status": 0},
  //  "start_date": "Tue Feb 01 2022 16:03:37 GMT+0500 (PKT)",
  //   "status": "accept",
  //   "translation_address": "Karachi"
  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (status === 'work assigned') {
  //       setStatus('arrived');
  //     } else {
  //       setStatus('work done');
  //     }
  //   }, 5000);
  // }, [status]);

  if(data){
    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <TouchableOpacity
          onPress={()=> navigation.goBack()}
          style={{
            height: 70,
            width: 70,
            zIndex: 1,
  
            position: 'absolute',
          }}>
          <View
            style={{
              height: 70,
              width: 70,
              zIndex: 1,
              backgroundColor: 'white',
              top: 40,
              position: 'absolute',
              left: 20,
              overflow: 'visible',
              borderRadius: 50,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              alignItems:'center',
              justifyContent:'center'
            }}>
             <Ionicons name='ios-arrow-back-outline' size={40} color={'black'}  />
          </View>
        </TouchableOpacity>
        {interpreter.latitude != null && userCoords.latitude != null ? (
          <MapView
            ref={ref => {
              setMapRef(ref);
            }}
            style={{height: height, width: width}}
            showsMyLocationButton={true}
            zoomEnabled={true}
            scrollEnabled={true}
            initialRegion={{
              latitude: interpreter.latitude,
              longitude: interpreter.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            zoomControlEnabled
            // onRegionChange={onRegionChange}
            showsCompass={true}
            // zoomEnabled={true}
            maxZoomLevel={18}
            provider={Platform.OS == 'android' ? PROVIDER_GOOGLE : null}
            // minZoomLevel={10}
            // followsUserLocation={true}
            scrollEnabled={true}
            mapPadding={{top: 100, left: 50, right: 50, bottom: 200}}
            mapType={Platform.OS == 'android' ? 'terrain' : 'standard'}
            onMapReady={() => {
              mapRef.fitToCoordinates([userCoords, interpreter], {
                animated: true,
                edgePadding: {
                  top: 150,
                  right: 50,
                  bottom: 100,
                  left: 50,
                },
              });
            }}
            // onLayout={() => {
            //   mapRef.animateCamera({
            //     center: {
            //       latitude: coordinates[0].latitude,
            //       longitude: coordinates[0].longitude,
            //     },
            //     heading: 0,
            //     pitch: 90,
            //   });
            // }}
            onRegionChangeComplete={e => {
              console.log(e);
            }}>
            {console.log(
              userCoords.latitude,
              userCoords.longitude,
              'userCoords==== in return',
            )}
            {console.log(interpreter, 'interpreter==== in return')}
            <MapViewDirections
              // origin={userCoords}
              // destination={interpreter}
              splitWaypoints={true}
              origin={{
                latitude: userCoords?.latitude,
                longitude: userCoords?.longitude,
              }}
              destination={{
                latitude: interpreter?.latitude,
                longitude: interpreter?.longitude,
              }}
              apikey={
                'AIzaSyBTsC4XcbDQgH_tBwHdKAUUXyVtdOTL4l0'
                // 'AIzaSyCyY4IPLEvPRxEtaWFcRWHkWG6n0nFYzEE'
              } // insert your API Key here
              strokeWidth={4}
              strokeColor="#111111"
            />
            <Marker
              title={'Client'}
              // coordinate={userCoords}
              coordinate={{
                latitude: userCoords?.latitude,
                longitude: userCoords?.longitude,
              }}
            />
            <Marker
              title={'You'}
              // coordinate={interpreter}
              coordinate={{
                latitude: interpreter?.latitude,
                longitude: interpreter?.longitude,
              }}
            />
          </MapView>
        ) : null}
        {/* Information View  */}
        <View style={styles.informationView}>
              {/* Interpreter Details  */}
              <View style={styles.interpreterView}>
              {
                    data?.client?.profile_image == null ?
                    <Avatar.Image
                      size={85}
                      source={require('./../assets/Images/user.png')} 
                    />:
                    <Avatar.Image
                    size={85}
                    source={{uri: `${imageUrl+data?.client?.profile_image}`}} 
                  />
                  }
                {/* <Image
                  resizeMode="contain"
                  source={PROFILE_IMAGE}
                  style={styles.imageStyle}
                /> */}
                <View style={styles.rowView}>
                  <Heading
                    title={data.client.first_name}
                    passedStyle={styles.usernameStyle}
                    fontType="semi-bold"
                  />
                  <Heading
                    title={data.occasion.name}
                    passedStyle={styles.userTypeStyle}
                  />
           
                </View>
              </View>
  
              {/* Location Pick Point Details  */}
              <View style={styles.detailView}>
          
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
  
         
                <View style={styles.textView}>
                  <View style={styles.pickpoint1}>
                    <Heading
                      title={"Current Location"}
                      passedStyle={styles.pickupLabel}
                      fontType="semi-bold"
                    />
                    <Heading
                      title={currentLocation}
                      passedStyle={styles.loctionLabel}
                      nol={2}
                    />
                  </View>
                  <View style={styles.pickpoint2}>
                    <Heading
                      title="Destination"
                      passedStyle={styles.pickupLabel}
                      fontType="semi-bold"
                    />
                    <Heading
                      title={data.translation_address}
                      passedStyle={styles.loctionLabel}
                      nol={2}
                    />
                  </View>
                  
                </View>
              </View>

              <View style={{
                            flexDirection:'row', 
                            justifyContent:'space-around', 
                            alignItems:'center',
                            borderTopWidth: 1,
                            borderTopColor: 'rgba(0,0,0,0.08)',
                          }}>
                    <TouchableOpacity
                      style={styles.buttonWrapper}
                      activeOpacity={0.8}
                      onPress={() => Linking.openURL(`tel:${data.client.phone}`)}>
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
                    <TouchableOpacity onPress={()=> {
                          // const num = `${parseInt(data.client.phone)}`
                          Linking.openURL(`sms:${data.client.phone}`)
                    }} style={styles.buttonWrapper} activeOpacity={0.8}>
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
              
        </View>
      </View>
    )
  }else{
    return null
  }
};

const mapStateToProps = ({UserReducer,firebaseDataRedux}) => {
  return {UserReducer,firebaseDataRedux};
};
export default connect(mapStateToProps, actions)(SearchingScreen);

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
    // paddingLeft: width * 0.1,
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
    // backgroundColor: 'red',
  },
  informationView: {
    // height: height * 0.4,
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
    // backgroundColor:'red',
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
    fontSize: width * 0.03,
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
