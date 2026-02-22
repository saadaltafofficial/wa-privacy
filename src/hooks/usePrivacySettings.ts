import { useEffect, useState } from "react"

import { DEFAULT_SETTINGS, STORAGE_KEY, type PrivacySettings } from "~src/types"

export function usePrivacySettings() {
  const [settings, setSettings] = useState<PrivacySettings>(DEFAULT_SETTINGS)
  const [loaded, setLoaded] = useState(false)

  // Load settings from chrome.storage on mount
  useEffect(() => {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      if (result[STORAGE_KEY]) {
        setSettings({ ...DEFAULT_SETTINGS, ...result[STORAGE_KEY] })
      }
      setLoaded(true)
    })
  }, [])

  // Push a partial update to both storage and the active tab's content script
  const updateSettings = (partial: Partial<PrivacySettings>) => {
    const next = { ...settings, ...partial }
    setSettings(next)
    chrome.storage.local.set({ [STORAGE_KEY]: next })

    // Send to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "updateSettings",
          settings: next
        })
      }
    })
  }

  const triggerPanic = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "panic" })
      }
    })
  }

  return { settings, loaded, updateSettings, triggerPanic }
}
