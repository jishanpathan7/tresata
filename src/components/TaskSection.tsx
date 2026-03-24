import { type ReactNode, useState } from 'react'
import './TaskSection.css'

interface TaskSectionProps {
  title: string
  count: number
  defaultOpen?: boolean
  children: ReactNode
}

export function TaskSection({
  title,
  count,
  defaultOpen = true,
  children,
}: TaskSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <details
      className="task-section"
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <summary>
        <span className="section-title">
          {title} ({count})
        </span>
        <span className="chevron" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7 10l5 5 5-5z" />
          </svg>
        </span>
      </summary>
      <div className="section-body">{children}</div>
    </details>
  )
}
