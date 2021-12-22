import Modal from 'react-native-modal';
import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import colors from '../assets/colors';
import Heading from '../components/Heading';
import Inputbox from '../components/Inputbox';
import Button from '../components/Button';
import {CardField, useStripe} from '@stripe/stripe-react-native';

const {width, height} = Dimensions.get('window');

const StripeModal = ({onPress, isModalVisible, setIsModalVisible, setId}) => {
    const {createToken} = useStripe();
  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.container}>
        <Heading
          fontType="semi-bold"
          passedStyle={[styles.label]}
          title="Enter Card Details"
        />
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: 'white',
            textColor: colors.themePurple1,
            borderWidth: 1,
            borderColor: colors.themePurple1,
            borderRadius: 5,
          }}
          style={{
            width: '95%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={cardDetails => {
            console.log(cardDetails);
            if (cardDetails.complete) {
              createToken(cardDetails).then(res => {
                console.log(res);
                setId(res.token.id)
              });
            }
          }}
          onFocus={focusedField => {
            console.log('focusField', focusedField);
          }}
        />
        {/* Buttons Container  */}
        <View style={styles.flexRow}>
          <Button
            title="BUY"
            onBtnPress={() => {
              onPress();
            }}
            isBgColor={false}
            btnStyle={styles.btnStyle}
            btnTextStyle={styles.btnTextStyle}
          />

          <Button
            title="CANCEL"
            onBtnPress={() => {
              setIsModalVisible(false);
            }}
            isBgColor={false}
            btnStyle={styles.cancelBtnStyle}
            btnTextStyle={styles.cancelBtnTextStyle}
          />
        </View>
      </View>
    </Modal>
  );
};

export default StripeModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.06,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
  label: {
    color: 'black',
    fontSize: width * 0.05,
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.themePurple1,
    width: width * 0.8,
    borderColor: 'white',
    fontSize: width * 0.04,
    marginLeft: 0,
    paddingLeft: 0,
    paddingVertical: 6,
    color: 'black',
    borderRadius: 0,
  },
  btnStyle: {
    backgroundColor: colors.themePurple1,
    borderRadius: width * 0.025,
    width: width * 0.35,
    margin: 0,
  },
  cancelBtnStyle: {
    borderRadius: width * 0.025,
    width: width * 0.35,
    borderWidth: 1,
    borderColor: colors.themePurple1,
    margin: 0,
  },
  btnTextStyle: {
    color: 'white',
    fontSize: width * 0.04,
  },
  cancelBtnTextStyle: {
    color: colors.themePurple1,
    fontSize: width * 0.04,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    // backgroundColor: 'red',
    width: width * 0.75,
  },
});
