import type { TaskStatus } from '../types/task'
import './StatusBadge.css'

const LABELS: Record<TaskStatus, string> = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  completed: 'Completed',
}

interface StatusBadgeProps {
  status: TaskStatus
  className?: string
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`status-badge ${className}`.trim()}
      data-status={status}
    >
      <span className="status-badge-dot" aria-hidden="true" />
      {LABELS[status]}
    </span>
  )
}
