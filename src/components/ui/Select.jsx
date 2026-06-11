import { forwardRef, useId } from "react";

function Select({ label, options, className, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full flex gap-1 items-center">
      {label && <label htmlFor={id} className="inline-block pl-1"></label>}
      <select
        id={id}
        ref={ref}
        className={`px-3 py-2 w-full rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 ${className}`}
        {...props}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
