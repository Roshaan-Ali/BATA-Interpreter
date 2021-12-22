import React, {useEffect, useState} from 'react';

import {
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Header from '../components/Header';
import HistoryModal from '../components/HistoryModal';
import Heading from '../components/Heading';
import IconComp from '../components/IconComp';
import colors from '../assets/colors';
import HistoryMapper from '../components/HistoryMapper';
const {width, height} = Dimensions.get('window');

const History = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  const onItemPress = (item, index) => {
    setModalData(item);
    setIsModalVisible(true);
  };

  return (
    <>
      <View style={styles.container}>
        {/* Header  */}
        <Header showBackBtn={true} navigation={props.navigation} />

        <FlatList
          data={dummyData}
          vertical
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={styles.flatListContentContainerStyle}
          renderItem={({item, index}) => (
            <HistoryMapper item={item} index={index} />
          )}
          ListHeaderComponent={() => (
            <Heading
              title="History"
              passedStyle={styles.heading}
              fontType="bold"
            />
          )}
        />
      </View>
      {isModalVisible && (
        <HistoryModal
          data={modalData}
          showModal={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    color: colors.themePurple1,
    fontSize: width * 0.1,
  },
  flatListContentContainerStyle: {
    marginHorizontal: width * 0.05,
  },
  textStyle: {
    color: 'rgba(0,0,0,0.7)',
    textTransform: 'capitalize',
    fontSize: width * 0.045,
  },
});

const dummyData = [
  {
    _id: 1,
    translationAddress: 'Shereton Complex St.14 Bredihs Street No.14 Opp Crtas',
    additionalInformation: 'Group requires extra attention.',
    startTime: new Date(),
    endTime: new Date(),
    name: 'Weiß Schmitz',
    nativeLanguage: 'English (ES)',
    translationInto: 'Spanish (ES)',
    occasion: 'National Arts Council',
  },
  {
    _id: 2,
    translationAddress: 'Shereton Complex St.14 Bredihs Street No.14 Opp Crtas',
    additionalInformation: 'Group requires extra attention.',
    startTime: new Date(),
    endTime: new Date(),
    name: 'Köhler König',
    nativeLanguage: 'English (ES)',
    translationInto: 'Spanish (ES)',
    occasion: 'Expo Dubai 2021 ',
  },
  {
    _id: 3,
    translationAddress: 'Shereton Complex St.14 Bredihs Street No.14 Opp Crtas',
    additionalInformation: 'Group requires extra attention.',
    startTime: new Date(),
    endTime: new Date(),
    name: 'Schulze Huber',
    nativeLanguage: 'English (ES)',
    translationInto: 'Spanish (ES)',
    occasion: 'Georgia JJ Museum',
  },
  {
    _id: 4,
    translationAddress: 'Shereton Complex St.14 Bredihs Street No.14 Opp Crtas',
    additionalInformation: 'Group requires extra attention.',
    startTime: new Date(),
    endTime: new Date(),
    name: 'Möller Thomas',
    nativeLanguage: 'English (ES)',
    translationInto: 'Spanish (ES)',
    occasion: 'Independence Day',
  },
  {
    _id: 5,
    translationAddress: 'Shereton Complex St.14 Bredihs Street No.14 Opp Crtas',
    additionalInformation: 'Group requires extra attention.',
    startTime: new Date(),
    endTime: new Date(),
    name: 'Günther Böhm',
    nativeLanguage: 'English (ES)',
    translationInto: 'Spanish (ES)',
    occasion: 'Geneva Motor Show 2021',
  },
];
