export interface PrivacySettings {
  enabled: boolean
  blurMessages: boolean
  blurNames: boolean
  blurAvatars: boolean
  blurMedia: boolean
  blurPreviews: boolean
  blurStatus: boolean
  hideReceipts: boolean
  hideTyping: boolean
  hideLastMsg: boolean
  blurIntensity: number
  revealMode: "hover" | "click" | "none"
  autoEnable: boolean
  panicMode: boolean
}

export const DEFAULT_SETTINGS: PrivacySettings = {
  enabled: false,
  blurMessages: true,
  blurNames: false,
  blurAvatars: false,
  blurMedia: true,
  blurPreviews: true,
  blurStatus: false,
  hideReceipts: false,
  hideTyping: false,
  hideLastMsg: false,
  blurIntensity: 6,
  revealMode: "hover",
  autoEnable: true,
  panicMode: false
}

export const STORAGE_KEY = "wa_privacy_settings"
