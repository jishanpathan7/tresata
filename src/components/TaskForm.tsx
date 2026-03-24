import { type FormEvent, useState } from 'react'
import type { TaskStatus } from '../types/task'
import { StatusDropdown } from './StatusDropdown'
import './TaskForm.css'

export interface FormValues {
  title: string
  description: string
  status: TaskStatus
}

interface TaskFormProps {
  mode: 'add' | 'edit'
  initialValues: FormValues
  onSubmit: (values: FormValues) => void
  onCancel: () => void
  submitLabel?: string
}

export function TaskForm({
  mode,
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialValues.title)
  const [description, setDescription] = useState(initialValues.description)
  const [status, setStatus] = useState<TaskStatus>(initialValues.status)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) {
      setError('Please enter a title.')
      return
    }
    setError(null)
    onSubmit({
      title: trimmed,
      description: description.trim(),
      status: mode === 'edit' ? status : 'pending',
    })
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="task-title">Title</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter the description"
          rows={5}
        />
      </div>

      {mode === 'edit' && (
        <StatusDropdown value={status} onChange={setStatus} />
      )}

      {error && (
        <p className="task-form-error" role="alert">
          {error}
        </p>
      )}

      <div className="task-form-buttons">
        <button type="button" className="btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {submitLabel ?? (mode === 'add' ? 'ADD' : 'Update')}
        </button>
      </div>
    </form>
  )
}
