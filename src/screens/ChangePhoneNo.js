import React from 'react';
import {View, Text} from 'react-native';
import Header from '../components/Header';

const ChangePhoneNo = ({navigation}) => {
  return (
    <View style={{flex: 1,  alignItems: 'center'}}>
        <Header title="back" showBackBtn={true} navigation={navigation} />
    </View>
  );
};

export default ChangePhoneNo;
