import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import colors from '../assets/colors';
import Heading from '../components/Heading';
import background_img from '../assets/background_img.png';
import IconComp from '../components/IconComp';
import Button from '../components/Button';
import StripeModal from '../components/StripeModal';
import {StripeProvider} from '@stripe/stripe-react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



const SignupPackage = ({navigation, route}) => {
    console.log(route.params)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stripeGeneratedKey, setStripeGeneratedKey] = useState('');
  const _onPressBuyNow = () => {
    if (stripeGeneratedKey === '') {
      alert('Card number is required');
    } else {
      console.log(stripeGeneratedKey);
      navigation.navigate('Otp', route.params);
    }
  };

  const PUB_KEY_STRIPE =
    'pk_test_51JVChuLcwRj59Ifbt31dML7GTICUq0WRuxkSvFr9cbrNEzJgLHt8GuDRpCldBdJ8uS8O4OFuXRbcfqEKNnTYHK5u007FIvTgKu';

  return (
    <StripeProvider publishableKey={PUB_KEY_STRIPE}>
      <View style={styles.container}>
        <ImageBackground source={background_img} style={styles.image}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.contentView}>
              <View style={styles.rowView}>
                <Heading
                  title="As,"
                  passedStyle={styles.ourLabel}
                  fontType="semi-bold"
                />
                <Heading
                  title={route.params.selectedPerson}
                  passedStyle={styles.packageLabel}
                  fontType="semi-bold"
                />
              </View>
              <View style={styles.flatListStyle}>
                {/* Package Header  */}
                <Heading
                  title={'Package Details'}
                  passedStyle={styles.packageName}
                  fontType="semi-bold"
                />

                {/* Packages Key Points */}
                {dummyPackage?.package?.features?.map((ele, idx) => {
                  return (
                    <View style={styles.packageKeyPointsView} key={idx}>
                      <IconComp
                        name="checkcircle"
                        type="AntDesign"
                        iconStyle={styles.iconStyle}
                      />
                      <Heading
                        title={ele?.name}
                        passedStyle={styles.featureStyle}
                        fontType="regular"
                      />
                    </View>
                  );
                })}

                {/* Get Started Button  */}
                <Button
                  onBtnPress={() => {
                    setIsModalVisible(true);
                  }}
                  title="Buy Now"
                  isBgColor={false}
                  btnStyle={styles.btnStyle}
                  btnTextStyle={styles.btnTextStyle}
                />
              </View>
            </View>
            {isModalVisible && (
              <StripeModal
                setId={setStripeGeneratedKey}
                onPress={_onPressBuyNow}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
              />
            )}
          </ScrollView>
        </ImageBackground>
      </View>
    </StripeProvider>
  );
};

export default SignupPackage;

const styles = StyleSheet.create({
  contentView: {
    marginHorizontal: width * 0.1,
    justifyContent: 'center',
    flex: 1,
    paddingBottom: height * 0.05,
  },
  btnStyle: {
    backgroundColor: 'white',
    margin: 0,
    marginTop: height * 0.03,
    width: width * 0.8,
    paddingVertical: height * 0.02,
    borderRadius: width * 0.08,
  },
  btnTextStyle: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
  image: {
    height: height,
  },
  featureStyle: {
    color: 'white',
    fontSize: width * 0.05,
    textTransform: 'capitalize',
    fontWeight: '600',
    paddingLeft: width * 0.025,
  },
  iconStyle: {
    fontSize: width * 0.05,
    marginTop: height * 0.005,
    color: colors.themeYellow,
  },
  packageKeyPointsView: {
    flexDirection: 'row',
    paddingVertical: height * 0.005,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: colors.themeYellow,
    marginBottom: height * 0.02,
  },
  ourLabel: {
    fontSize: width * 0.09,
    color: 'black',
    paddingRight: width * 0.02,
  },
  packageLabel: {
    fontSize: width * 0.09,
    color: colors.themeYellow,
  },
  flatListStyle: {
    // alignItems: 'center',
    justifyContent: 'center',
  },
  flatListHeaderStyles: {
    justifyContent: 'flex-start',
    width: width * 0.85,
    marginVertical: height * 0.02,
  },
  packageName: {
    color: 'white',
    fontSize: width * 0.09,
    textTransform: 'capitalize',
  },
});

const dummyPackage = {
  _id: 1,
  package: {
    name: 'package 1',
    features: [
      {
        _id: 1,
        name: 'lorem ipsum is a dummy text is a dummy text is a dummy text',
      },
      {
        _id: 2,
        name: 'lorem ipsum is a dummy text is a dummy text is a dummy text',
      },
      {
        _id: 3,
        name: 'lorem ipsum is a dummy text is a dummy text is a dummy text',
      },
      {
        _id: 4,
        name: 'lorem ipsum is a dummy text is a dummy text is a dummy text',
      },
      {
        _id: 5,
        name: 'lorem ipsum is a dummy text is a dummy text is a dummy text',
      },
    ],
  },
};
