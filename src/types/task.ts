export type TaskStatus = 'pending' | 'in-progress' | 'completed'

/** View-only filter for the task list; does not change stored tasks. */
export type CompletionFilter = 'all' | 'completed' | 'incomplete'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  createdAt: string
}
