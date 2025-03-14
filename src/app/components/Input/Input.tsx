"use client";

type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>; 

const Input = ({
  label,
  type = "text",
  placeholder,
  className = "",
  error = "",
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
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  );
};

export default Input;
