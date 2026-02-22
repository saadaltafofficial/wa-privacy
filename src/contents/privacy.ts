import type { PlasmoCSConfig } from "plasmo"

import { DEFAULT_SETTINGS, STORAGE_KEY, type PrivacySettings } from "~src/types"

export const config: PlasmoCSConfig = {
  matches: ["https://web.whatsapp.com/*"],
  run_at: "document_idle"
}

// Import content CSS — Plasmo bundles same-directory CSS automatically
import "./privacy.css"

// ─── State ──────────────────────────────────────────────
let settings: PrivacySettings = { ...DEFAULT_SETTINGS }

// ─── Bootstrap ──────────────────────────────────────────
chrome.storage.local.get([STORAGE_KEY], (result) => {
  if (result[STORAGE_KEY]) {
    settings = { ...DEFAULT_SETTINGS, ...result[STORAGE_KEY] }
  }
  if (settings.autoEnable && !result[STORAGE_KEY]) {
    settings.enabled = true
  }
  applyAll()
})

// ─── Apply classes to body ──────────────────────────────
function applyAll() {
  const cl = document.body.classList

  cl.toggle("wa-privacy-on", settings.enabled)

  cl.toggle("blur-messages", settings.blurMessages)
  cl.toggle("blur-names", settings.blurNames)
  cl.toggle("blur-avatars", settings.blurAvatars)
  cl.toggle("blur-media", settings.blurMedia)
  cl.toggle("blur-previews", settings.blurPreviews)
  cl.toggle("blur-status", settings.blurStatus)

  cl.toggle("hide-receipts", settings.hideReceipts)
  cl.toggle("hide-typing", settings.hideTyping)
  cl.toggle("hide-last-msg", settings.hideLastMsg)

  cl.remove("reveal-hover", "reveal-click", "reveal-none")
  cl.add(`reveal-${settings.revealMode}`)

  cl.toggle("wa-panic-mode", settings.panicMode)

  document.body.style.setProperty("--wa-blur", `${settings.blurIntensity}px`)

  applyHideLastMsg()
}

function saveSettings() {
  chrome.storage.local.set({ [STORAGE_KEY]: settings })
}

// ─── Hide Last Message (MutationObserver) ───────────────
let lastMsgObserver: MutationObserver | null = null

function getLastMsgRows(): Element[] {
  const rows: Element[] = []

  document
    .querySelectorAll(
      'div[data-testid="cell-frame-secondary"], div[data-testid="last-msg-status"]'
    )
    .forEach((el) => rows.push(el))

  document
    .querySelectorAll('#pane-side span[dir="ltr"], #pane-side span[dir="auto"]')
    .forEach((el) => {
      const parent = el.closest(
        'div[role="row"], div[role="listitem"], div[data-testid="cell-frame-container"]'
      )
      if (!parent) return
      const nameSpan = parent.querySelector('span[dir="auto"][title]')
      if (el === nameSpan) return
      if (nameSpan && el !== nameSpan && !el.contains(nameSpan)) {
        const nameRect = nameSpan.getBoundingClientRect()
        const elRect = el.getBoundingClientRect()
        if (elRect.top >= nameRect.bottom - 4) {
          rows.push(el)
        }
      }
    })

  return rows
}

function applyHideLastMsg() {
  const shouldHide = settings.enabled && settings.hideLastMsg

  document.querySelectorAll(".wa-hide-last-msg-row").forEach((el) => {
    el.classList.remove("wa-hide-last-msg-row")
  })

  if (shouldHide) {
    getLastMsgRows().forEach((el) => el.classList.add("wa-hide-last-msg-row"))
    startLastMsgObserver()
  } else {
    stopLastMsgObserver()
  }
}

function startLastMsgObserver() {
  if (lastMsgObserver) return
  const pane = document.getElementById("pane-side")
  if (!pane) return
  lastMsgObserver = new MutationObserver(() => {
    if (settings.enabled && settings.hideLastMsg) {
      getLastMsgRows().forEach((el) => {
        if (!el.classList.contains("wa-hide-last-msg-row")) {
          el.classList.add("wa-hide-last-msg-row")
        }
      })
    }
  })
  lastMsgObserver.observe(pane, { childList: true, subtree: true })
}

function stopLastMsgObserver() {
  if (lastMsgObserver) {
    lastMsgObserver.disconnect()
    lastMsgObserver = null
  }
}

// ─── Click-to-reveal handler ────────────────────────────
document.addEventListener("click", (e) => {
  if (!settings.enabled || settings.revealMode !== "click") return

  const target = (e.target as Element).closest(
    '.copyable-text, ._ao3e, .quoted-mention, span.selectable-text, ' +
    'img.x193iq5w, img[src*="blob:"], img[src*="pps.whatsapp.net"], ' +
    'video, audio, span[dir="auto"][title], ' +
    'div[data-testid="cell-frame-secondary"] span'
  )
  if (target) {
    target.classList.toggle("wa-revealed")
  }
})

// ─── Keyboard shortcuts ─────────────────────────────────
document.addEventListener("keydown", (e) => {
  if (e.altKey && e.shiftKey && e.key === "P") {
    e.preventDefault()
    settings.enabled = !settings.enabled
    settings.panicMode = false
    applyAll()
    saveSettings()
  }
  if (e.altKey && e.shiftKey && e.key === "X") {
    e.preventDefault()
    settings.panicMode = !settings.panicMode
    if (settings.panicMode) settings.enabled = true
    applyAll()
    saveSettings()
  }
})

// ─── Message listener (from popup) ──────────────────────
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.action === "getSettings") {
    sendResponse({ settings })
    return true
  }

  if (msg.action === "updateSettings") {
    settings = { ...settings, ...msg.settings }
    applyAll()
    saveSettings()
    sendResponse({ ok: true })
    return true
  }

  if (msg.action === "panic") {
    settings.panicMode = !settings.panicMode
    if (settings.panicMode) settings.enabled = true
    applyAll()
    saveSettings()
    sendResponse({ panicMode: settings.panicMode })
    return true
  }
})
