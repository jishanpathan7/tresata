import { useCallback, useEffect, useState } from 'react'
import type { Task, TaskStatus } from '../types/task'

const STORAGE_KEY = 'tresata-tasks'

function getStorageErrorMessage(error: unknown): string {
  if (error instanceof DOMException && error.name === 'QuotaExceededError') {
    return 'Storage is full. Free browser space or clear site data for this app, then try again.'
  }
  if (error instanceof Error && error.message) return error.message
  return 'Could not save tasks to your browser.'
}

/** loose check — old data or hand-edited localStorage won't crash the app */
function okShape(value: unknown): value is Task {
  if (value === null || typeof value !== 'object') return false
  const o = value as Record<string, unknown>
  return (
    typeof o.id === 'string' &&
    typeof o.title === 'string' &&
    typeof o.description === 'string' &&
    (o.status === 'pending' ||
      o.status === 'in-progress' ||
      o.status === 'completed') &&
    typeof o.createdAt === 'string'
  )
}

function loadFromStorage(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null || raw === '') return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) {
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {
        /* ignore */
      }
      return []
    }
    const valid = parsed.filter(okShape)
    if (valid.length < parsed.length) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(valid))
      } catch {
        /* repaired list could not be written — state still valid */
      }
    }
    return valid
  } catch {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    return []
  }
}

type NewTask = { title: string; description: string; status?: TaskStatus }

export interface UseTasksResult {
  tasks: Task[]
  addTask: (input: NewTask) => Task
  updateTask: (
    id: string,
    updates: Partial<Pick<Task, 'title' | 'description' | 'status'>>,
  ) => void
  deleteTask: (id: string) => void
  persistError: string | null
  clearPersistError: () => void
}

export function useTasks(): UseTasksResult {
  const [tasks, setTasks] = useState<Task[]>(() => loadFromStorage())
  const [persistError, setPersistError] = useState<string | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
      queueMicrotask(() => {
        setPersistError(null)
      })
    } catch (e) {
      queueMicrotask(() => {
        setPersistError(getStorageErrorMessage(e))
      })
    }
  }, [tasks])

  const clearPersistError = useCallback(() => {
    setPersistError(null)
  }, [])

  const addTask = useCallback((input: NewTask) => {
    const trimmed = input.title.trim()
    if (!trimmed) throw new Error('Title is required')
    const task: Task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      title: trimmed,
      description: input.description.trim(),
      status: input.status ?? 'pending',
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [...prev, task])
    return task
  }, [])

  const updateTask = useCallback(
    (
      id: string,
      updates: Partial<Pick<Task, 'title' | 'description' | 'status'>>,
    ) => {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id !== id) return t
          const next = { ...t, ...updates }
          if (updates.title !== undefined) next.title = updates.title.trim()
          if (updates.description !== undefined)
            next.description = updates.description.trim()
          return next
        }),
      )
    },
    [],
  )

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    persistError,
    clearPersistError,
  }
}
