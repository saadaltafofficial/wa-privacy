import "~src/style.css"

import { BlurSlider } from "~src/components/BlurSlider"
import { RevealModePicker } from "~src/components/RevealModePicker"
import { Section } from "~src/components/Section"
import { ToggleRow } from "~src/components/ToggleRow"
import { ToggleSwitch } from "~src/components/ToggleSwitch"
import { usePrivacySettings } from "~src/hooks/usePrivacySettings"

function IndexPopup() {
  const { settings, loaded, updateSettings, triggerPanic } =
    usePrivacySettings()

  if (!loaded) {
    return (
      <div className="w-[320px] bg-wa-dark text-wa-muted p-8 text-center text-sm">
        Loading...
      </div>
    )
  }

  return (
    <div className="w-[320px] bg-wa-dark text-wa-text" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div className="bg-wa-panel px-4 py-3.5 flex items-center justify-between border-b border-wa-border">
        <h2 className="text-[15px] font-semibold">WA Privacy Shield</h2>
        <span className="text-[10px] text-wa-muted bg-wa-border px-1.5 py-0.5 rounded-lg">
          v3.0
        </span>
      </div>

      {/* Master Toggle */}
      <div className="bg-wa-panel px-4 py-3 flex items-center justify-between border-b border-wa-border">
        <span className="text-[13px] font-semibold text-wa-green">
          Privacy Mode
        </span>
        <ToggleSwitch
          checked={settings.enabled}
          onChange={(v) => updateSettings({ enabled: v, panicMode: false })}
        />
      </div>

      {/* Blur Targets */}
      <Section title="Blur Targets">
        <ToggleRow
          label="Messages"
          description="Chat message text content"
          checked={settings.blurMessages}
          onChange={(v) => updateSettings({ blurMessages: v })}
        />
        <ToggleRow
          label="Contact Names"
          description="Names in chat list & header"
          checked={settings.blurNames}
          onChange={(v) => updateSettings({ blurNames: v })}
        />
        <ToggleRow
          label="Profile Pictures"
          description="Avatars in chat list & header"
          checked={settings.blurAvatars}
          onChange={(v) => updateSettings({ blurAvatars: v })}
        />
        <ToggleRow
          label="Media"
          description="Photos, videos, stickers"
          checked={settings.blurMedia}
          onChange={(v) => updateSettings({ blurMedia: v })}
        />
        <ToggleRow
          label="Chat Previews"
          description="Blur last message in chat list"
          checked={settings.blurPreviews}
          onChange={(v) => updateSettings({ blurPreviews: v })}
        />
        <ToggleRow
          label="Last Seen / Status"
          description="Online, typing, last seen text"
          checked={settings.blurStatus}
          onChange={(v) => updateSettings({ blurStatus: v })}
        />
      </Section>

      <div className="h-px bg-wa-border" />

      {/* Visual Privacy */}
      <Section title="Visual Privacy">
        <ToggleRow
          label="Hide Read Receipts"
          description="Hide blue double-tick visually"
          checked={settings.hideReceipts}
          onChange={(v) => updateSettings({ hideReceipts: v })}
        />
        <ToggleRow
          label="Hide Typing Indicator"
          description='Hide "typing…" status display'
          checked={settings.hideTyping}
          onChange={(v) => updateSettings({ hideTyping: v })}
        />
        <ToggleRow
          label="Hide Last Message"
          description="Remove message preview from chat list"
          checked={settings.hideLastMsg}
          onChange={(v) => updateSettings({ hideLastMsg: v })}
        />
      </Section>

      <div className="h-px bg-wa-border" />

      {/* Settings */}
      <Section title="Settings">
        <BlurSlider
          value={settings.blurIntensity}
          onChange={(v) => updateSettings({ blurIntensity: v })}
        />
        <RevealModePicker
          value={settings.revealMode}
          onChange={(v) => updateSettings({ revealMode: v })}
        />
        <ToggleRow
          label="Auto-Enable"
          description="Enable on WhatsApp load"
          checked={settings.autoEnable}
          onChange={(v) => updateSettings({ autoEnable: v })}
        />
      </Section>

      {/* Panic Button */}
      <button
        type="button"
        onClick={triggerPanic}
        className="flex items-center justify-center gap-1.5 w-[calc(100%-32px)] mx-4 mt-2 mb-1 py-2.5 bg-wa-red text-white border-none rounded-lg text-xs font-semibold cursor-pointer transition-colors hover:bg-wa-red-hover">
        PANIC MODE — Blur Everything
        <span className="text-[9px] opacity-70 ml-1">Alt+Shift+X</span>
      </button>

      {/* Footer */}
      <div className="px-4 py-2 pb-3 text-center">
        <span className="text-[10px] text-wa-muted">
          Toggle:{" "}
          <kbd className="bg-wa-border px-1 py-px rounded text-[9px] text-wa-muted">
            Alt+Shift+P
          </kbd>{" "}
          | Panic:{" "}
          <kbd className="bg-wa-border px-1 py-px rounded text-[9px] text-wa-muted">
            Alt+Shift+X
          </kbd>
        </span>
      </div>
    </div>
  )
}

export default IndexPopup
