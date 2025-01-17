import { getAccountStatus } from '@/requests/auth.js'

export class Notifier {
  eventSource = null
  path = '/notify'
  isEnabled = false
  onVisisbleCallback = []

  constructor(notPath) {
    this.path = notPath
    document.addEventListener("visibilitychange", this.reconnect.bind(this))
    Notifier.instance = this
  }

  static getInstance() {
    if (!Notifier.instance) {
      Notifier.instance = new Notifier()
    }
    return Notifier.instance
  }

  addVisibleChangeCallback(visibleChangeCB) {
    this.onVisisbleCallback.push(visibleChangeCB)
  }

  enable(isEnable) {
    this.isEnabled = isEnable
    this.reconnect()
  }

  callCallbacks() {
    for (let callback of this.onVisisbleCallback) {
      callback()
    }
  }

  reconnect() {
    if (!this.isEnabled) {
      if (this.eventSource) {
        this.eventSource.close()
        this.eventSource = null
      }
      this.visibleChangeCB = null
    }
    if (document.hidden) {
      if (this.eventSource) {
        this.eventSource.close()
        this.eventSource = null
      }
    } else {
      this.eventSource = new EventSource(this.path)
      this.eventSource.onmessage = function (msg) {
        console.log("Get meassage=", msg)
        if (this.onVisisbleCallback) {
          console.log("Called callback")
          this.callCallbacks()
        }
      }.bind(this)
      this.eventSource.onerror = function (err) {
        console.log("Error occured=", err)
        getAccountStatus().then(response => {
          console.log("Account status returns successr=", response)
        }).catch(error => {
          console.log("Account status returns error=", error)
        })
      }
      this.callCallbacks()
    }
  }
}