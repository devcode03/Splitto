import { useEffect } from "react";

export default function ErrorPopup({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="error-popup" role="alert">
      <span className="error-popup__msg">{message}</span>
      <button
        className="error-popup__close"
        aria-label="Close error"
        onClick={onClose}
        type="button"
      >
        ×
      </button>
    </div>
  );
}
