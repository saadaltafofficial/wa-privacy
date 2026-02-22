type RevealMode = "hover" | "click" | "none"

interface RevealModePickerProps {
  value: RevealMode
  onChange: (mode: RevealMode) => void
}

const OPTIONS: { mode: RevealMode; label: string }[] = [
  { mode: "hover", label: "Hover" },
  { mode: "click", label: "Click" },
  { mode: "none", label: "None" }
]

export function RevealModePicker({ value, onChange }: RevealModePickerProps) {
  return (
    <div className="py-2 border-b border-wa-border">
      <div className="text-[13px] text-wa-text mb-1.5">Reveal Mode</div>
      <div className="flex gap-2">
        {OPTIONS.map(({ mode, label }) => (
          <button
            key={mode}
            type="button"
            onClick={() => onChange(mode)}
            className={`flex-1 py-[7px] text-center border rounded-lg text-[11px] cursor-pointer transition-colors duration-200 ${
              value === mode
                ? "border-wa-green text-wa-green bg-[rgba(37,211,102,0.08)]"
                : "border-wa-border text-wa-muted hover:border-wa-green bg-transparent"
            }`}>
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
