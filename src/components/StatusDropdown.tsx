import { useEffect, useId, useRef, useState } from 'react'
import type { TaskStatus } from '../types/task'
import './StatusDropdown.css'

const OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
]

interface StatusDropdownProps {
  value: TaskStatus
  onChange: (status: TaskStatus) => void
  id?: string
}

export function StatusDropdown({ value, onChange, id }: StatusDropdownProps) {
  const uid = useId()
  const listId = id ?? `status-dropdown-${uid}`
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)

  const selected = OPTIONS.find((o) => o.value === value) ?? OPTIONS[0]

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className="status-dropdown" ref={wrap}>
      <label htmlFor={`${listId}-trigger`}>Status</label>
      <button
        type="button"
        id={`${listId}-trigger`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${listId}-listbox`}
        onClick={() => setOpen((o) => !o)}
      >
        <span
          className={`dot ${selected.value}`}
          aria-hidden="true"
        />
        <span className="trigger-label">{selected.label}</span>
        <svg
          className="chevron"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path fill="currentColor" d="M7 10l5 5 5-5z" />
        </svg>
      </button>
      {open && (
        <ul
          id={`${listId}-listbox`}
          role="listbox"
          aria-label="Task status"
        >
          {OPTIONS.map((opt) => (
            <li key={opt.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={opt.value === value}
                onClick={() => {
                  onChange(opt.value)
                  setOpen(false)
                }}
              >
                <span className={`dot ${opt.value}`} aria-hidden="true" />
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
