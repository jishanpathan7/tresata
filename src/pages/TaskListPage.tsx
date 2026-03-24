import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { useMemo, useState } from 'react'
import type { UseTasksResult } from '../hooks/useTasks'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { FloatingAddButton } from '../components/FloatingAddButton'
import { Header } from '../components/Header'
import { PersistBanner } from '../components/PersistBanner'
import { SearchBar } from '../components/SearchBar'
import { TaskFilterBar } from '../components/TaskFilterBar'
import { TaskItem } from '../components/TaskItem'
import { TaskSection } from '../components/TaskSection'
import type { CompletionFilter, Task, TaskStatus } from '../types/task'
import {
  filterTasksByCompletion,
  filterTasksBySearch,
} from '../utils/taskFilters'
import './TaskListPage.css'

type Props = Pick<
  UseTasksResult,
  'tasks' | 'updateTask' | 'deleteTask' | 'persistError' | 'clearPersistError'
>

const order: TaskStatus[] = ['in-progress', 'pending', 'completed']

const labels: Record<TaskStatus, string> = {
  'in-progress': 'In Progress',
  pending: 'Pending',
  completed: 'Completed',
}

function emptyListMessage(
  totalCount: number,
  afterSearchCount: number,
  visibleCount: number,
  search: string,
  completion: CompletionFilter,
): string {
  if (totalCount === 0) {
    return 'No tasks yet. Tap + to add your first task.'
  }
  if (visibleCount > 0) return ''

  const hasSearch = search.trim().length > 0
  if (afterSearchCount === 0 && hasSearch) {
    return 'No tasks match your search.'
  }
  if (completion === 'completed') {
    return hasSearch
      ? 'No completed tasks match your search.'
      : 'No completed tasks.'
  }
  if (completion === 'incomplete') {
    return hasSearch
      ? 'No incomplete tasks match your search.'
      : 'No incomplete tasks.'
  }
  return 'No tasks match your filters.'
}

export function TaskListPage({
  tasks,
  updateTask,
  deleteTask,
  persistError,
  clearPersistError,
}: Props) {
  const [search, setSearch] = useState('')
  const [completionFilter, setCompletionFilter] =
    useState<CompletionFilter>('all')
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)

  const { filtered, afterSearch, byStatus } = useMemo(() => {
    const afterSearch = filterTasksBySearch(tasks, search)
    const filtered = filterTasksByCompletion(afterSearch, completionFilter)
    const byStatus: Record<TaskStatus, Task[]> = {
      pending: [],
      'in-progress': [],
      completed: [],
    }
    for (const t of filtered) byStatus[t.status].push(t)
    return { filtered, afterSearch, byStatus }
  }, [tasks, search, completionFilter])

  const toggleComplete = (id: string) => {
    const row = tasks.find((x) => x.id === id)
    if (!row) return
    updateTask(id, {
      status: row.status === 'completed' ? 'pending' : 'completed',
    })
  }

  const confirmDelete = () => {
    if (pendingDeleteId) deleteTask(pendingDeleteId)
    setPendingDeleteId(null)
  }

  const deleteConfirmName = pendingDeleteId
    ? tasks.find((t) => t.id === pendingDeleteId)?.title
    : undefined

  const emptyText = emptyListMessage(
    tasks.length,
    afterSearch.length,
    filtered.length,
    search,
    completionFilter,
  )

  return (
    <div className="task-list-page">
      <Header title="TODO APP" />
      {persistError ? (
        <PersistBanner message={persistError} onDismiss={clearPersistError} />
      ) : null}
      <SearchBar value={search} onChange={setSearch} />
      <TaskFilterBar value={completionFilter} onChange={setCompletionFilter} />

      <div className="task-list-page__scroll">
        {filtered.length === 0 ? (
          <p className="task-list-page__empty">{emptyText}</p>
        ) : (
          <LayoutGroup>
            {order.map((status) => {
              const list = byStatus[status]
              if (list.length === 0) return null
              return (
                <TaskSection
                  key={status}
                  title={labels[status]}
                  count={list.length}
                  defaultOpen={status === 'in-progress'}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    {list.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onDeleteRequest={setPendingDeleteId}
                        onToggleComplete={toggleComplete}
                      />
                    ))}
                  </AnimatePresence>
                </TaskSection>
              )
            })}
          </LayoutGroup>
        )}
      </div>

      <FloatingAddButton />

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Delete task?"
        message={
          deleteConfirmName
            ? `Are you sure you want to delete "${deleteConfirmName}"? This cannot be undone.`
            : 'Are you sure you want to delete this task?'
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  )
}
