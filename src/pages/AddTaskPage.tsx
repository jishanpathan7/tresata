import { useNavigate } from 'react-router-dom'
import type { UseTasksResult } from '../hooks/useTasks'
import { Header } from '../components/Header'
import { TaskForm } from '../components/TaskForm'
import './AddTaskPage.css'

type AddTaskPageProps = Pick<UseTasksResult, 'addTask'>

export function AddTaskPage({ addTask }: AddTaskPageProps) {
  const navigate = useNavigate()

  return (
    <div className="form-page">
      <Header title="Add Task" showBack />
      <TaskForm
        mode="add"
        initialValues={{
          title: '',
          description: '',
          status: 'pending',
        }}
        onSubmit={(values) => {
          addTask({
            title: values.title,
            description: values.description,
            status: values.status,
          })
          navigate('/')
        }}
        onCancel={() => navigate('/')}
        submitLabel="ADD"
      />
    </div>
  )
}
