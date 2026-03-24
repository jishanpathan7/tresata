import { Link } from 'react-router-dom'
import './FloatingAddButton.css'

export function FloatingAddButton() {
  return (
    <Link
      to="/add"
      className="fab"
      aria-label="Add new task"
      title="Add new task"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
    </Link>
  )
}
