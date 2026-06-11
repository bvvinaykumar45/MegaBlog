import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full flex flex-wrap gap-1 items-center">
      {label && (
        <label className="inline-block pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        ref={ref}
        className={`px-3 py-2 w-full rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
