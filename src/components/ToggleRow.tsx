import { ToggleSwitch } from "./ToggleSwitch"

interface ToggleRowProps {
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function ToggleRow({
  label,
  description,
  checked,
  onChange
}: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-wa-border last:border-b-0">
      <div>
        <div className="text-[13px] text-wa-text">{label}</div>
        <div className="text-[10px] text-wa-muted mt-0.5">{description}</div>
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} />
    </div>
  )
}
