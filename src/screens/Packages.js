import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import colors from '../assets/colors';
import Header from '../components/Header';
import Heading from '../components/Heading';
import PackagesMapper from '../components/PackagesMapper';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// on Packages Press
const _onPackagePress = ({item, index}) => {
  console.log('Pressed Pacakages');
};

const Packages = ({navigation}) => {
  const [packages, setPackages] = useState(dummyPackages);
  return (
    <View style={styles.container}>
      {/* Header  */}
      <Header title="Menu" navigation={navigation} />

      {/* Packages Rendering  */}
      <FlatList
        data={packages}
        nestedScrollEnabled={true}
        keyExtractor={item => item._id.toString()}
        contentContainerStyle={styles.flatListStyle}
        renderItem={({item, index}) => (
          <PackagesMapper item={item} index={index} onPress={_onPackagePress} />
        )}
        ListHeaderComponentStyle={styles.flatListHeaderStyles}
        ListHeaderComponent={() => {
          return (
            <View style={styles.rowView}>
              <Heading
                title="Our"
                passedStyle={styles.ourLabel}
                fontType="light"
              />
              <Heading
                title="Packages"
                passedStyle={styles.packageLabel}
                fontType="semi-bold"
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Packages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ourLabel: {
    fontSize: width * 0.09,
    color: 'black',
    paddingRight: width * 0.02,
  },
  packageLabel: {
    fontSize: width * 0.09,
    color: colors.themePurple1,
  },
  flatListStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  flatListHeaderStyles: {
    justifyContent: 'flex-start',
    width: width * 0.85,
    marginVertical: height * 0.02,
  },
});

const dummyPackages = [
  {
    _id: 1,
    package: {
      name: 'package 1',
      features: [
        {
          _id: 1,
          name: 'lorem ipsum',
        },
        {
          _id: 2,
          name: 'lorem ipsum',
        },
        {
          _id: 3,
          name: 'lorem ipsum',
        },
        {
          _id: 4,
          name: 'lorem ipsum',
        },
        {
          _id: 5,
          name: 'lorem ipsum',
        },
      ],
    },
  },

  {
    _id: 2,
    package: {
      name: 'package 2',
      features: [
        {
          _id: 1,
          name: 'lorem ipsum',
        },
        {
          _id: 2,
          name: 'lorem ipsum',
        },
        {
          _id: 3,
          name: 'lorem ipsum',
        },
        {
          _id: 4,
          name: 'lorem ipsum',
        },
        {
          _id: 5,
          name: 'lorem ipsum',
        },
      ],
    },
  },

  {
    _id: 3,
    package: {
      name: 'package 3',
      features: [
        {
          _id: 1,
          name: 'lorem ipsum',
        },
        {
          _id: 2,
          name: 'lorem ipsum',
        },
        {
          _id: 3,
          name: 'lorem ipsum',
        },
        {
          _id: 4,
          name: 'lorem ipsum',
        },
        {
          _id: 5,
          name: 'lorem ipsum',
        },
      ],
    },
  },
];
