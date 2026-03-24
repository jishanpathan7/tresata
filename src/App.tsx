import { Route, Routes } from 'react-router-dom'
import { useTasks } from './hooks/useTasks'
import { AddTaskPage } from './pages/AddTaskPage'
import { EditTaskPage } from './pages/EditTaskPage'
import { TaskListPage } from './pages/TaskListPage'

export default function App() {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    persistError,
    clearPersistError,
  } = useTasks()

  return (
    <Routes>
      <Route
        path="/"
        element={
          <TaskListPage
            tasks={tasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
            persistError={persistError}
            clearPersistError={clearPersistError}
          />
        }
      />
      <Route path="/add" element={<AddTaskPage addTask={addTask} />} />
      <Route
        path="/edit/:id"
        element={<EditTaskPage tasks={tasks} updateTask={updateTask} />}
      />
    </Routes>
  )
}
