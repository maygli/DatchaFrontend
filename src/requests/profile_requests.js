import { sendProtectedRequest } from "./protected_request.js"

const PROFILE_URL = "/profile"
const GET_PROFILE_METHOD = "GET"
const UPDATE_PROFILE_METHOD = "PUT"
const UPDATE_PROFILE_DATA_TYPE = "multipart/form-data"

export function getProfile() {
  return new Promise((resolve, reject) => {
    sendProtectedRequest(PROFILE_URL, GET_PROFILE_METHOD)
      .then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
  })
}

export function putProfile(profileData) {
  return new Promise((resolve, reject) => {
    sendProtectedRequest(PROFILE_URL, UPDATE_PROFILE_METHOD, profileData, UPDATE_PROFILE_DATA_TYPE)
      .then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
  })
}