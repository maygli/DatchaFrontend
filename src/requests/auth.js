import axios from 'axios'
import { sendProtectedRequest } from './protected_request'

const REFRESH_LS_ITEM = "refresh"
const REFRESH_METHOD = "put"
const REFRESH_URL = "/refresh"
const LOGOUT_URL = "/logout"
const LOGOUT_METHOD = "post"
const ACC_STATUS_URL = "/auth_status"
const ACC_STATUS_METHOD = "get"
const EMAIL_REQ_DATA_TYPE = "application/json"
const CONFIRM_EMAIL_URL = "/confirm"
const CONFIRM_EMAIL_METHOD = "put"
const AUTH_REQUEST_METHOD = "get"
const AUTH_URL_START = "/auth/"
const AUTH_URL_END = "/login"
const GET_REFRESH_METHOD = "get"
const GET_REFRESH_URL = "/refresh"

export const ERROR_AUTH = 401

export function getAccountStatus() {
  return sendProtectedRequest(ACC_STATUS_URL, ACC_STATUS_METHOD, null, null)
}

export function sendLoginRequest(url, method, data) {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: data
    }).then(response => {
      saveRefreshToken(response)
      console.log("Response=", response)
      resolve(response)
    }).catch(error => {
      console.log("Error=", error)
      reject(error)
    });
  })
}

export function sendConfirmEmail(locale) {
  let localeData = {
    locale: locale
  }
  return sendProtectedRequest(CONFIRM_EMAIL_URL, CONFIRM_EMAIL_METHOD, localeData, EMAIL_REQ_DATA_TYPE)
}

export function saveRefreshToken(response) {
  if (response && response.headers && response.headers.authorization) {
    console.log("Set local storage")
    localStorage.setItem(REFRESH_LS_ITEM, response.headers.authorization)
  }
}

export function clearRefreshToken() {
  localStorage.removeItem(REFRESH_LS_ITEM)
}

export function logout() {
  clearRefreshToken()
  axios({
    method: LOGOUT_METHOD,
    url: LOGOUT_URL,
  }).catch(error => {
    console.log("Error=", error)
  });
}


export function sendRefresh() {
  return new Promise((resolve, reject) => {
    let refreshToken = localStorage.getItem(REFRESH_LS_ITEM)
    if (!refreshToken) {
      var error = new axios.AxiosError("", "", null, null, {
        status: ERROR_AUTH,
      });
      throw error
    }
    axios({
      method: REFRESH_METHOD,
      url: REFRESH_URL,
      headers: {
        Authorization: refreshToken
      }
    }).then(response => {
      saveRefreshToken(response)
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function getRefreshRequest() {
  axios({
    method: GET_REFRESH_METHOD,
    url: GET_REFRESH_URL
  }).then(response => {
    saveRefreshToken(response)
  }).catch(error => {
    console.log("Error=", error)
  })
}

export function authRequest(provider) {
  const testURL = AUTH_URL_START + provider + AUTH_URL_END
  window.location.replace(testURL)
  /*	const myInit = {
      method: AUTH_REQUEST_METHOD,
      mode: 'no-cors',
    };
  
    const myRequest = new Request(testURL, myInit);
  
    fetch(myRequest).then(function(response) {
      console.log(response);
    }).catch(function(e){
      console.log(e);
    });*/
  /*  return new Promise((resolve, reject) => {
      axios({
        method: AUTH_REQUEST_METHOD,
        url: AUTH_URL_START + provider + AUTH_URL_END,
      }).then(response => {
        saveRefreshToken(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })*/
}