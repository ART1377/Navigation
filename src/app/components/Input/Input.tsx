"use client";

type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  error?: string;
  as?: "input" | "textarea"; // Add support for textarea
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Input = ({
  label,
  type = "text",
  placeholder,
  className = "",
  error = "",
  as = "input", // Default to "input"
  ...props
}: InputProps) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-primary-dark mb-1">
          {label}
          {props.required && <span className="text-red-500"> *</span>}
        </label>
      )}
      {as === "textarea" ? (
        <textarea
        rows={5}
          placeholder={placeholder}
          className={`w-full p-2 text-dark rounded-lg outline outline-primary-dark focus:outline-[3px] focus:outline-primary-dark placeholder:text-gray-400 ${className} ${
            error
              ? "outline outline-red-500 focus:outline-[3px] focus:outline-red-500"
              : "outline outline-primary-dark focus:outline-[3px] focus:outline-primary-dark"
          }`}
          {...props}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full p-2 text-dark rounded-lg outline outline-primary-dark focus:outline-[3px] focus:outline-primary-dark placeholder:text-gray-400 ${className} ${
            error
              ? "outline outline-red-500 focus:outline-[3px] focus:outline-red-500"
              : "outline outline-primary-dark focus:outline-[3px] focus:outline-primary-dark"
          }`}
          {...props}
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  );
};

export default Input;
