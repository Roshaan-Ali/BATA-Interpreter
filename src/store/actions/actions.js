import * as types from './actionType';
import axios from 'axios';
import {apiUrl} from '../../config/config';

export const user_login = data => async dispatch => {
  console.log(data);
  try {
    const response = await axios.post(`${apiUrl}/users/signin`, {
      email: data.email,
      password: data.password,
    });

    if (response?.data?.success) {
      console.log(response?.data?.data);
      // alert("SAD")
      dispatch({
        type: types.USER_LOGIN,
        payload: {
          isUserLogin: true,
          userData: response?.data?.data,
          accessToken: response.data?.data.token,
        },
      });
    } else {
      dispatch({
        type: types.ERROR_MODAL,
        payload: {
          msg: response?.data?.msg,
          status: true,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: types.ERROR_MODAL,
      payload: {
        msg: 'Something went wrong.',
        status: true,
      },
    });
    console.log('Network Error: ', JSON.stringify(error, null, 2));
  }
};

export const user_signup = data => async dispatch => {
  try {
    // const response = await axios.post(
    //   `https://7f0e-110-93-244-255.ngrok.io/api/auth/register`,
    //   {
    //     first_name: data?.firstname,
    //     last_name: data?.lastname,
    //     user_password: data?.password,
    //     user_email: data?.email,
    //     language: data?.selectedPrimaryLang,
    //     business_category: data?.selectedPerson,
    //   },
    // );
    // console.log(JSON.stringify(response.data,null,2))

    // dispatch({
    //   type: types.USER_LOGIN,
    //   payload: {
    //     isUserLogin: true,
    //     userData: {
    //       email: data?.email,
    //       username: response?.data?.data?.user_name,
    //     },
    //     accessToken: response.data?.data?.token,
    //   },
    // });
    console.log({data});
    dispatch({
      type: types.USER_SIGNUP,
      payload: {
        isUserLogin: true,
        userData: {
          email: data?.email,
          username: `${data?.firstname} ${data?.lastname}`,
          business: data?.selectedPerson,
          language: data?.language,
        },
        accessToken:
          'IXHuiIUSoefe65Fjh3KJv89CFHH86KN63nt45cxP9SAbP52piU87NxZSal',
      },
    });
  } catch (error) {
    dispatch({
      type: types.ERROR_MODAL,
      payload: {
        msg: 'Something went wrong.',
        status: true,
      },
    });
    console.log('Network Error', error);
  }
};

export const user_logout = () => async dispatch => {
  console.log('logout');
  try {
    dispatch({
      type: types.USER_LOGOUT,
      payload: {isUserLogin: false},
    });
  } catch (error) {
    console.log('Network Error');
  }
};

export const get_data = () => async dispatch => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    dispatch({
      type: types.GET_DATA,
      payload: {
        userData: res.data,
      },
    });
  } catch (error) {
    console.log('Network Error: ' + error);
  }
};

export const updatePhoto = (photo, token) => async dispatch => {
  try {
    var bodyFormData = new FormData();

    bodyFormData.append('profile_image', {
      uri: photo.uri,
      name: photo.fileName,
      type: photo.type,
    });
    const response = await axios({
      method: 'post',
      url: `${apiUrl}/users/profileImage`,
      data: bodyFormData,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch({
      type: types.UPDATE_PHOTO,
      payload: response.data.data.image_name,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateUserData = (userData, token) => async dispatch => {
  console.log('UPDATE USER DATA FUNC', userData);
  try {
    const response = await axios({
      method: 'put',
      url: `${apiUrl}/users/update`,
      data: userData,
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
      },
    });
    // console.log(JSON.stringify(response.data.data, null, 2));
    dispatch({
      type: types.UPDATE_USER_DATA,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.ERROR_MODAL,
      payload: {
        msg: 'Something went wrong.',
        status: true,
      },
    });
    console.log(error, 'Failed to update data.');
  }
};

export const getAllLanguages = () => async dispatch => {
  try {
    const res = await axios.get(`${apiUrl}/admin/language/gets`);
    dispatch({
      type: types.GET_LANGUAGES,
      payload: {
        languages: res.data.data,
      },
    });
  } catch (error) {
    console.log('Network Error Cant Fetch Languages: ' + error);
  }
};

export const getReviewsAndRatingsCount = token => async dispatch => {
  try {
    const res = await axios.get(
      `${apiUrl}/interpreter/commentAndRating/reviewAndRate`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
        },
      },
    );
    dispatch({
      type: types.GET_REVIEWS_RATINGS_COUNT,
      payload: res.data.data,
    });
  } catch (error) {
    console.log('Network Error Cant Fetch Count Reviews: ' + error);
  }
};

export const setErrorModal = () => dispatch => {
  try {
    dispatch({
      type: types.ERROR_MODAL,
      payload: {
        msg: '',
        status: false,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllReviews = token => async dispatch => {
  try {
    const res = await axios.get(
      `${apiUrl}/interpreter/commentAndRating/reviewOfUser`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
        },
      },
    );
    console.log(res?.data?.data);
    dispatch({
      type: types.GET_ALL_REVIEWS,
      payload: {
        reviews: res?.data?.data,
      },
    });
  } catch (error) {
    console.log('Network Error Cant Fetch Reviews: ' + error);
  }
};

export const getCurrentBooking = token => async dispatch => {
  try {
    const response = await axios.get(
      `${apiUrl}/interpreter/bookingInterpreter/currentBooking`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
        },
      },
    );

    if (response?.data?.success) {
      dispatch({
        type: types.GET_CURRENT_BOOKING,
        payload: response.data.data,
      });
    }
  } catch (err) {
    console.log('Failed to fetch current booking!', err);
  }
};

export const getBookingHistory = token => async dispatch => {
  try {
    const response = await axios.get(
      `${apiUrl}/interpreter/bookingInterpreter/bookingHistory`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
        },
      },
    );

    if (response?.data?.success) {
      dispatch({
        type: types.BOOKING_HISTORY,
        payload: response.data.data,
      });
    }
  } catch (err) {
    console.log('Failed to fetch history booking!', err);
  }
};
