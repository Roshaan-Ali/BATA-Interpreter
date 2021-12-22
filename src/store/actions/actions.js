import * as types from './actionType';
import axios from 'axios';

export const user_login = data => async dispatch => {
  try {
    // const response = await axios.post(
    //   `https://2498-110-93-244-255.ngrok.io/api/auth/login`,
    //   {
    //     email: data?.email,
    //     password: data?.password,
    //   },
    // );

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
    dispatch({
      type: types.USER_LOGIN,
      payload: {
        isUserLogin: true,
        userData: {
          email: data?.email,
          username: 'Christopher Nolan',
        },
        accessToken: 'Test token',
      },
    });
  } catch (error) {
    console.log('Network Error', error);
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
    console.log({data})
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

export const updateUserData = userData => async dispatch => {
  try {
    dispatch({
      type: types.UPDATE_USER_DATA,
      payload: {
        userData: userData,
      },
    });
  } catch (error) {
    console.log('Failed to update data.');
  }
};
