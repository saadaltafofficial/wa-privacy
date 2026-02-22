# WA Privacy Shield v3

A Chrome extension that protects your privacy on WhatsApp Web — built with **Plasmo**, **React**, **TypeScript**, and **Tailwind CSS v4**.

## Features

| Feature | Description |
|---|---|
| **Blur Messages** | Blur all chat message text |
| **Blur Contact Names** | Blur names in the chat list and conversation header |
| **Blur Profile Pictures** | Blur avatars everywhere |
| **Blur Media** | Blur photos, videos, stickers, and audio |
| **Blur Chat Previews** | Blur the last-message preview in the sidebar |
| **Blur Last Seen / Status** | Blur online, typing, and last-seen indicators |
| **Hide Read Receipts** | Visually hide blue double-tick marks |
| **Hide Typing Indicator** | Hide the "typing…" status |
| **Hide Last Message** | Completely remove message previews from the chat list |
| **Adjustable Blur Intensity** | Slider from 2px to 20px |
| **Reveal Mode** | Choose Hover, Click, or None to control how blurred content is revealed |
| **Auto-Enable** | Automatically activate privacy mode when WhatsApp Web loads |
| **Panic Mode** | Instantly max-blur everything with one click or `Alt+Shift+X` |

### Keyboard Shortcuts

- **`Alt+Shift+P`** — Toggle privacy mode on/off
- **`Alt+Shift+X`** — Activate/deactivate panic mode

## Tech Stack

| Technology | Purpose |
|---|---|
| [Plasmo](https://docs.plasmo.com/) | Chrome Extension framework (MV3) |
| [React 18](https://react.dev/) | Popup UI components |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe settings, messaging, and content scripts |
| [Tailwind CSS v3](https://tailwindcss.com/) | Utility-first styling for the popup |

## Development

```bash
# Install dependencies
pnpm install

# Start dev server with hot reload
pnpm dev

# Build for production
pnpm build

# Package as .zip for Chrome Web Store
pnpm package
```

Load the dev build from `build/chrome-mv3-dev` in `chrome://extensions` (Developer mode → Load unpacked).

## Project Structure

```
wa-privacy-v3/
├── popup.tsx                     # Main popup entry (React)
├── src/
│   ├── types.ts                  # PrivacySettings type + defaults
│   ├── style.css                 # Tailwind v4 entry (popup styles)
│   ├── hooks/
│   │   └── usePrivacySettings.ts # React hook for settings + messaging
│   ├── components/
│   │   ├── ToggleSwitch.tsx      # Reusable toggle switch
│   │   ├── ToggleRow.tsx         # Label + description + toggle
│   │   ├── Section.tsx           # Section header wrapper
│   │   ├── BlurSlider.tsx        # Blur intensity range slider
│   │   └── RevealModePicker.tsx  # Hover / Click / None radio group
│   └── contents/
│       ├── privacy.ts            # Content script (injected into WhatsApp Web)
│       └── privacy.css           # Content CSS (blur/hide rules)
├── assets/
│   └── icon.png                  # Extension icon
├── package.json                  # Plasmo config + manifest overrides
└── tsconfig.json
```

## Security & Privacy

- **100% client-side** — no data leaves your browser
- **Zero network calls** — no analytics, no telemetry, no external scripts
- **Minimal permissions** — only `storage`, `activeTab`, and `host_permissions` for `web.whatsapp.com`
- **Open source** — fully inspectable, no minified or obfuscated code
- **No third-party runtime deps** — only Plasmo, React, and Tailwind (build-time only)

### What this does NOT do

- Does not encrypt messages — blur is a visual CSS effect only
- Does not block WhatsApp's own read receipts server-side
- Does not protect against screen capture, DevTools, or malware

## License

MIT
