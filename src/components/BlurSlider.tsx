interface BlurSliderProps {
  value: number
  onChange: (value: number) => void
}

export function BlurSlider({ value, onChange }: BlurSliderProps) {
  return (
    <div className="py-2 border-b border-wa-border">
      <div className="flex items-center justify-between mb-1.5">
        <div className="text-[13px] text-wa-text">Blur Intensity</div>
        <span className="text-[11px] text-wa-green font-semibold min-w-[32px] text-right">
          {value}px
        </span>
      </div>
      <input
        type="range"
        min={2}
        max={20}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 rounded-sm bg-wa-border appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-3.5
          [&::-webkit-slider-thumb]:h-3.5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-wa-green
          [&::-webkit-slider-thumb]:cursor-pointer"
      />
    </div>
  )
}
