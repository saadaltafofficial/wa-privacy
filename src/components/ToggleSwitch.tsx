interface ToggleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
        checked ? "bg-wa-green" : "bg-[#4a5568]"
      }`}>
      <span
        className={`pointer-events-none inline-block h-[16px] w-[16px] translate-y-[3px] rounded-full bg-white transition-transform duration-200 ${
          checked ? "translate-x-[21px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  )
}
