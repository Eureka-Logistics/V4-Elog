import axios from "axios";
import Baseurl, { BaseUrlRace } from "../../Api/BaseUrl";
import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_FACEBOOK_USER,
  SIGNIN_FACEBOOK_USER_SUCCESS,
  SIGNIN_GITHUB_USER,
  SIGNIN_GITHUB_USER_SUCCESS,
  SIGNIN_GOOGLE_USER,
  SIGNIN_GOOGLE_USER_SUCCESS,
  SIGNIN_TWITTER_USER,
  SIGNIN_TWITTER_USER_SUCCESS,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS
} from "constants/ActionTypes";
import mobil from "../../routes/redux toolkit/store/ZustandStore";
import { notification } from "antd";

export const userSignUp = (user) => {
  return {
    type: SIGNUP_USER,
    payload: user
  };
};

export const userSignIn = (user, selectLogin) => {
  return async dispatch => {
    dispatch(showAuthLoader());
    try {

      if (selectLogin === 1) {
        const response = await axios.post(`${Baseurl}auth/login`, user);

        // asumsikan response.data.data berisi token dan jobdesk
        const { token, jobdesk, cabang, fullname } = response.data.data;

        // simpan token ke dalam local storage
        localStorage.setItem('token', token);
        localStorage.setItem('jobdesk', jobdesk);
        localStorage.setItem('cabang', cabang);
        localStorage.setItem('fullname', fullname);
        dispatch(userSignInSuccess({ token, jobdesk }));

        // set token to axios header
        axios.defaults.headers.common['Authorization'] = token;

        const detail = await axios.get(`${Baseurl}auth/get-profile`);

      } else if (selectLogin === 0) {
        const response = await axios.post(`${BaseUrlRace}auth/login`, user);

        // asumsikan response.data.data berisi token dan jobdesk
        const { token, jobdesk, cabang, fullname } = response.data.data;

        // simpan token ke dalam local storage
        localStorage.setItem('token', token);
        localStorage.setItem('jobdesk', jobdesk);
        localStorage.setItem('cabang', cabang);
        localStorage.setItem('fullname', fullname);

        dispatch(userSignInSuccess({ token, jobdesk }));

        // set token to axios header
        axios.defaults.headers.common['Authorization'] = token;

        const detail = await axios.get(`${Baseurl}auth/get-profile`);
      } else if (selectLogin === 2) {
        const response = await axios.post(`${BaseUrlRace}auth/login-customer`, user);

        // asumsikan response.data.data berisi token dan jobdesk
        const { token, divisi, cabang, fullname, loginBu } = response.data.data;

        // simpan token ke dalam local storage
        localStorage.setItem('token', token);
        localStorage.setItem('jobdesk', divisi);
        localStorage.setItem('cabang', cabang);
        localStorage.setItem('fullname', fullname);
        localStorage.setItem('loginBu', loginBu);
        dispatch(userSignInSuccess({ token, divisi }));

        // set token to axios header
        axios.defaults.headers.common['Authorization'] = token;

        const detail = await axios.get(`${Baseurl}auth/get-profile`);
      }

    } catch (error) {
      // handle error, misalnya dengan menampilkan pesan kesalahan
      // notification.error({
      //   message : error?.response?.data?.errors[0]?.message
      // })
      dispatch(showAuthMessage(error?.response?.data?.errors[0]?.message.toString()));
    }
  };
};

export const userSignOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('loginBu');

  return {
    type: SIGNOUT_USER
  };
};
export const userSignUpSuccess = (authUser) => {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: authUser
  };
};

export const userSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: {
      token: authUser.token,
      jobdesk: authUser.jobdesk,
      // simpan data lain yang Anda butuhkan di sini
    }
  }
};


export const userSignOutSuccess = () => {
  return {
    type: SIGNOUT_USER_SUCCESS,
  }
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};


export const userGoogleSignIn = () => {
  return {
    type: SIGNIN_GOOGLE_USER
  };
};
export const userGoogleSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_GOOGLE_USER_SUCCESS,
    payload: authUser
  };
};
export const userFacebookSignIn = () => {
  return {
    type: SIGNIN_FACEBOOK_USER
  };
};
export const userFacebookSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_FACEBOOK_USER_SUCCESS,
    payload: authUser
  };
};
export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};
export const userTwitterSignIn = () => {
  return {
    type: SIGNIN_TWITTER_USER
  };
};
export const userTwitterSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_TWITTER_USER_SUCCESS,
    payload: authUser
  };
};
export const userGithubSignIn = () => {
  return {
    type: SIGNIN_GITHUB_USER
  };
};
export const userGithubSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_GITHUB_USER_SUCCESS,
    payload: authUser
  };
};
export const showAuthLoader = () => {
  return {
    type: ON_SHOW_LOADER,
  };
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE,
  };
};
export const hideAuthLoader = () => {
  return {
    type: ON_HIDE_LOADER,
  };
};
