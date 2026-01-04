import { memo } from "react";

const Button = memo(function Button({ onClick, disabled, style, children }) {
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
});

export default Button;
