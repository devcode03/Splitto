export default function Button({ onClick, disabled, style, children }) {
  return (
    <button
      className="cta-button"
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
}
