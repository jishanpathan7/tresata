import './PersistBanner.css'

interface PersistBannerProps {
  message: string
  onDismiss: () => void
}

export function PersistBanner({ message, onDismiss }: PersistBannerProps) {
  return (
    <div className="persist-banner" role="alert">
      <p className="persist-banner__text">{message}</p>
      <button
        type="button"
        className="persist-banner__dismiss"
        onClick={onDismiss}
      >
        Dismiss
      </button>
    </div>
  )
}
