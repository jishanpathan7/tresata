import type { CompletionFilter } from '../types/task'
import './TaskFilterBar.css'

const OPTIONS: { value: CompletionFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'incomplete', label: 'Incomplete' },
  { value: 'completed', label: 'Completed' },
]

interface TaskFilterBarProps {
  value: CompletionFilter
  onChange: (value: CompletionFilter) => void
}

export function TaskFilterBar({ value, onChange }: TaskFilterBarProps) {
  return (
    <div
      className="task-filter-bar"
      role="group"
      aria-label="Filter tasks by completion"
    >
      {OPTIONS.map(({ value: v, label }) => (
        <button
          key={v}
          type="button"
          className={`task-filter-bar__chip ${value === v ? 'task-filter-bar__chip--active' : ''}`}
          aria-pressed={value === v}
          onClick={() => onChange(v)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
