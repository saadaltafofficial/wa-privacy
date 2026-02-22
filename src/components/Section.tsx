interface SectionProps {
  title: string
  children: React.ReactNode
}

export function Section({ title, children }: SectionProps) {
  return (
    <div className="px-4 pt-2.5 pb-1.5">
      <div className="text-[11px] uppercase tracking-wider text-wa-green font-semibold mb-2">
        {title}
      </div>
      {children}
    </div>
  )
}
