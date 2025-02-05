export default function Button({ onClick, children }) {
  return (
    <button className="cta-button" onClick={onClick}>
      <div>{children}</div>
    </button>
  );
}
