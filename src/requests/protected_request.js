import { saveRefreshToken, clearRefreshToken, sendRefresh, ERROR_AUTH } from './auth.js'
import axios from 'axios'

export function sendProtectedRequest(url, method, data, dataType) {
  return new Promise((resolve, reject) => {
    console.log("function called")
    axios({
      method: method,
      url: url,
      data: data ? data : undefined,
      headers: dataType ? { "Content-Type": dataType } : undefined
    }).then(response => {
      console.log("Response=", response)
      saveRefreshToken()
      resolve(response)
    }).catch(error => {
      if (error.response.status == ERROR_AUTH) {
        sendRefresh().then(response => {
          console.log("refresh success respose=", response)
          axios({
            method: method,
            url: url,
            data: data,
            headers: dataType ? { "Content-Type": dataType } : undefined
          }).then(response => {
            console.log("Response=", response)
            resolve(response)
            saveRefreshToken()
          }).catch(error => {
            reject(error)
          })
        }).catch(refresherr => {
          console.log("refresh return error=", refresherr)
          if (refresherr.response.status == ERROR_AUTH) {
            clearRefreshToken()
          }
          reject(error)
        })
      }
    });
  })
}