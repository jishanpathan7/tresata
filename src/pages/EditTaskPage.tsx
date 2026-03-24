import { Navigate, useNavigate, useParams } from 'react-router-dom'
import type { UseTasksResult } from '../hooks/useTasks'
import { Header } from '../components/Header'
import { TaskForm } from '../components/TaskForm'
import './AddTaskPage.css'

type EditTaskPageProps = Pick<UseTasksResult, 'tasks' | 'updateTask'>

export function EditTaskPage({ tasks, updateTask }: EditTaskPageProps) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const task = id ? tasks.find((t) => t.id === id) : undefined

  if (!id || !task) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="form-page">
      <Header title="Edit Task" showBack />
      <TaskForm
        key={task.id}
        mode="edit"
        initialValues={{
          title: task.title,
          description: task.description,
          status: task.status,
        }}
        onSubmit={(values) => {
          updateTask(task.id, {
            title: values.title,
            description: values.description,
            status: values.status,
          })
          navigate('/')
        }}
        onCancel={() => navigate('/')}
        submitLabel="Update"
      />
    </div>
  )
}
