import type { CompletionFilter, Task } from '../types/task'

export function filterTasksBySearch(tasks: Task[], search: string): Task[] {
  const q = search.trim().toLowerCase()
  if (!q) return tasks
  return tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q),
  )
}

export function filterTasksByCompletion(
  tasks: Task[],
  filter: CompletionFilter,
): Task[] {
  switch (filter) {
    case 'all':
      return tasks
    case 'completed':
      return tasks.filter((t) => t.status === 'completed')
    case 'incomplete':
      return tasks.filter((t) => t.status !== 'completed')
    default:
      return tasks
  }
}

/** Search first, then completion — view-only; does not mutate `tasks`. */
export function applyTaskListFilters(
  tasks: Task[],
  search: string,
  completion: CompletionFilter,
): Task[] {
  return filterTasksByCompletion(filterTasksBySearch(tasks, search), completion)
}
