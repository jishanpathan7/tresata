import { useNavigate } from 'react-router-dom'
import './Header.css'

interface HeaderProps {
  title: string
  showBack?: boolean
}

export function Header({ title, showBack = false }: HeaderProps) {
  const navigate = useNavigate()

  return (
    <header
      className={`app-header ${showBack ? 'app-header--sub' : 'app-header--home'}`}
    >
      {showBack ? (
        <button
          type="button"
          className="app-header__back"
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
            />
          </svg>
        </button>
      ) : null}
      <h1 className="app-header__title">{title}</h1>
    </header>
  )
}
