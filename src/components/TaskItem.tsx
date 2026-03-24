import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Task } from '../types/task'
import { formatTaskDate } from '../utils/formatDate'
import { StatusBadge } from './StatusBadge'
import './TaskItem.css'

const itemTransition = {
  duration: 0.2,
  layout: { duration: 0.26, ease: [0.25, 0.1, 0.25, 1] as const },
}

interface TaskItemProps {
  task: Task
  onDeleteRequest: (id: string) => void
  onToggleComplete: (id: string) => void
}

export function TaskItem({
  task,
  onDeleteRequest,
  onToggleComplete,
}: TaskItemProps) {
  const letter = task.title.trim().charAt(0).toUpperCase() || '?'
  const isCompleted = task.status === 'completed'

  return (
    <motion.article
      layout
      layoutId={task.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10, transition: { duration: 0.18 } }}
      transition={itemTransition}
      className={`task-item ${isCompleted ? 'task-item--completed' : ''}`}
    >
      <div className="task-item__top">
        <button
          type="button"
          className="task-item__avatar"
          aria-pressed={isCompleted}
          aria-label={
            isCompleted ? 'Mark as not completed' : 'Mark as completed'
          }
          onClick={() => onToggleComplete(task.id)}
        >
          {letter}
        </button>
        <div className="task-item__body">
          <div className="task-item__row">
            <h3 className="task-item__title">{task.title}</h3>
            <StatusBadge status={task.status} />
          </div>
          {task.description ? (
            <p className="task-item__desc">{task.description}</p>
          ) : null}
          <p className="task-item__date">{formatTaskDate(task.createdAt)}</p>
        </div>
      </div>
      <div className="task-item__actions" aria-label="Task actions">
        <Link to={`/edit/${task.id}`} aria-label={`Edit ${task.title}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.41l-2.34-2.34a1.003 1.003 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
            />
          </svg>
        </Link>
        <button
          type="button"
          aria-label={`Delete ${task.title}`}
          onClick={() => onDeleteRequest(task.id)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
            />
          </svg>
        </button>
      </div>
    </motion.article>
  )
}
