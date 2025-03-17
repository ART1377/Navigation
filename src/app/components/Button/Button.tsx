"use client";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary-dark" | "primary-main" | "primary-light";
  className?: string;
};

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  variant = "primary-dark",
  className = "",
}: ButtonProps) => {
  const getVariantStyles = () => {
    const baseStyles = {
      "primary-dark": "bg-primary-dark text-white outline outline-primary-dark",
      "primary-main": "bg-primary-main text-white outline outline-primary-main",
      "primary-light":
        "bg-primary-light text-primary-dark outline outline-primary-light",
    };

    const hoverStyles = {
      "primary-dark": "hover:bg-transparent hover:text-primary-dark",
      "primary-main": "hover:bg-transparent hover:text-primary-main",
      "primary-light": "hover:bg-transparent hover:text-dark",
    };

    // Apply hover styles only if the button is not disabled or loading
    const hoverEffect = disabled || loading ? "" : hoverStyles[variant];

    return `${baseStyles[variant]} ${hoverEffect}`;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${getVariantStyles()} ${className} ${
        loading || disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer"
      }`}
    >
      {loading ? "در حال پردازش..." : children}
    </button>
  );
};

export default Button;
