import React from 'react';
import {FlatList, StyleSheet, Text, View, Dimensions} from 'react-native';
import colors from '../assets/colors';
import Button from './Button';
import Heading from './Heading';
import PackageFeaturesMapper from './PackageFeaturesMapper';

const {width, height} = Dimensions.get('window');

const _onGetStartedPress = () => {
  console.log('Get Started');
};

const PackagesMapper = ({item, index, onPress}) => {
  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled={true}
        data={item?.package?.features}
        keyExtractor={item => item?._id.toString()}
        ListHeaderComponentStyle={styles.flatListHeaderStyle}
        ListFooterComponentStyle={styles.flatListFooterStyle}
        renderItem={({item, index}) => (
          <PackageFeaturesMapper item={item} index={index} />
        )}
        ListHeaderComponent={() => (
          <Heading
            title={item.package.name}
            passedStyle={styles.packageName}
            fontType="semi-bold"
          />
        )}
        ListFooterComponent={() => (
          <Button
            onBtnPress={_onGetStartedPress}
            title="Get Started"
            isBgColor={false}
            btnStyle={styles.btnStyle}
            btnTextStyle={styles.btnTextStyle}
          />
        )}
      />
    </View>
  );
};

export default PackagesMapper;

const styles = StyleSheet.create({
  container: {
    width: width * 0.85,
    marginBottom: height * 0.05,
    borderRadius: width * 0.05,
    backgroundColor: colors.themePurple1,
    paddingVertical: height * 0.07,
    paddingHorizontal: width * 0.1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 21,
  },
  packageName: {
    color: 'white',
    fontSize: width * 0.09,
    textTransform: 'capitalize',
  },
  flatListHeaderStyle: {
    paddingBottom: height * 0.025,
  },
  flatListFooterStyle: {
    marginTop: height * 0.045,
  },
  btnStyle: {
    backgroundColor: 'white',
    margin: 0,
    width: width * 0.65,
    paddingVertical: height * 0.02,
    borderRadius: width * 0.08,
  },
  btnTextStyle: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
});
