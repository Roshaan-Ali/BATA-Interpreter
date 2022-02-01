import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Heading from '../components/Heading';
import ReviewsMapper from '../components/ReviewsMapper';
import {color} from 'react-native-reanimated';
import colors from '../assets/colors';
import Header from '../components/Header';
import * as actions from '../store/actions/actions';
import { useIsFocused } from '@react-navigation/native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Reviews = ({navigation, UserReducer, getAllReviews}) => {
  const reviews = UserReducer?.reviews;
  const accessToken = UserReducer?.accessToken;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused == true) {
      getAllReviews(accessToken);
    }
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <Header title="Back" navigation={navigation} showBackBtn={true} />

      <FlatList
        nestedScrollEnabled={true}
        data={reviews}
        contentContainerStyle={styles.flatListStyle}
        vertical
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => {
          return <ReviewsMapper item={item} index={index} />;
        }}
        ListHeaderComponent={() => (
          <Heading
            passedStyle={styles.reviewHeading}
            fontType={'semi-bold'}
            title="Reviews & Ratings"
          />
        )}
        ListFooterComponent={() =>
          reviews?.length === 0 && (
            <Heading
              title="No reviews given yet."
              fontType={'semi-bold'}
              passedStyle={{
                fontSize: width * 0.045,
                color: 'black',
                marginLeft: width * 0.05,
              }}
            />
          )
        }
      />
    </View>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(Reviews);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  reviewHeading: {
    fontSize: width * 0.07,
    marginHorizontal: width * 0.05,
    color: colors.themePurple1,
  },
});

const dummyReviews = [
  {
    _id: 1,
    name: 'Joseph Uryae',
    photo: require('../assets/Images/profile-image.jpeg'),
    ratings: 4.2,
    createdAt: new Date(),
    reviewMessage:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    _id: 2,
    name: 'Tyler Kenns',
    photo: require('../assets/Images/profile-image.jpeg'),
    ratings: 3.7,
    createdAt: new Date(),
    reviewMessage:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    _id: 3,
    name: 'Zac Shawn',
    photo: require('../assets/Images/profile-image.jpeg'),
    ratings: 2.6,
    createdAt: new Date(),
    reviewMessage:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    _id: 4,
    name: 'Ronny Chris',
    photo: require('../assets/Images/profile-image.jpeg'),
    ratings: 4.4,
    createdAt: new Date(),
    reviewMessage:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
];
