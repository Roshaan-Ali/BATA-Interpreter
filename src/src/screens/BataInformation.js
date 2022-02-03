import {View, Text} from 'react-native';
import Header from '../components/Header';
import React from 'react';
const BataInformation = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Header title="back" showBackBtn={true} navigation={navigation} />
    </View>
  );
};

export default BataInformation;
