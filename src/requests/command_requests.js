import { sendProtectedRequest } from "./protected_request.js"

const COMMAND_URL = "/command"
const COMMAND_METHOD = "PUT"
const COMMAND_DATA_TYPE = "application/json"

export function sendDeviceCommand(deviceId, channelId, key, value) {
  return new Promise((resolve, reject) => {
    let commandData = {
      key: key,
      value: value,
      device_id : deviceId ? deviceId : undefined,
      channel_id : channelId ? channelId : undefined
    }
    sendProtectedRequest(COMMAND_URL, COMMAND_METHOD, commandData, COMMAND_DATA_TYPE)
      .then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
  })
}