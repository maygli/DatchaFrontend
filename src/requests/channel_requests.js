import { sendProtectedRequest } from "./protected_request.js"

const CHANNEL_DATA_URL = "/channel/data/"
const GET_CHANNEL_DATA_METHOD = "GET"

export function getChannelAllData(channelId) {
  return new Promise((resolve, reject) => {
    let url = CHANNEL_DATA_URL + channelId
    sendProtectedRequest(url, GET_CHANNEL_DATA_METHOD)
      .then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
  })
}