import clsx from "clsx";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { formatNumber } from "../utils/helper";

export default function Input({
  name,
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  prefix,
  suffix,
  mandatory = false,
  className = "",
  containerClassName = "",
  errorText,
  disabled,
  withoutClear = false,
  withSeparator = false,
  separator = ".",
  ...props
}) {
  const [show, setShow] = useState(false);

  const baseInputClass =
    "text-[14px] w-full px-3 py-2 pr-10 bg-[#FAFAFA] text-gray-600 disabled:text-grey-400 disabled:bg-[#EBEDEC] border border-[#FAFAFA] focus:border-green focus:outline-none rounded-[8px] placeholder:text-[#B2B9B7] disabled:cursor-not-allowed";
  const inputClass = clsx(
    baseInputClass,
    {
      "pl-10": prefix,
      "pr-10": suffix,
      "border-red-500": errorText,
    },
    className,
  );

  const handleClear = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onChange({ target: { name, value: "" } });
  };

  const handleChange = (e) => {
    if (type === "number") {
      const rawValue = e.target.value.replace(/\D/g, "");
      const formatted = withSeparator
        ? formatNumber(rawValue, separator)
        : rawValue;
      e.target.value = formatted;

      onChange({ target: { name, value: rawValue } });
    } else {
      onChange(e);
    }
  };

  const renderInput = () => {
    if (type === "password") {
      return (
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            id={id}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClass}
            {...props}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400">
            {show ? (
              <EyeClosed size={18} onClick={() => setShow(!show)} />
            ) : (
              <Eye size={18} onClick={() => setShow(!show)} />
            )}
          </div>
        </div>
      );
    }

    return (
      <input
        id={id}
        name={name}
        value={
          type === "number" && withSeparator && value
            ? formatNumber(value, separator)
            : (value ?? "")
        }
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClass}
        {...props}
      />
    );
  };

  return (
    <div className={clsx("flex-1 ", containerClassName)}>
      {label && (
        <div className="flex items-center mb-0.5">
          <label htmlFor={id} className="block text-sm text-gray-500">
            {label}
            {mandatory && <span className="text-red-500">*</span>}
          </label>
        </div>
      )}
      <div className="relative overflow-hidden">
        {renderInput()}

        {prefix && (
          <div
            tabIndex={-1}
            className="absolute top-0 left-1 flex items-center text-gray-500 px-2 h-full"
          >
            {prefix}
          </div>
        )}
        {suffix && (
          <div
            tabIndex={-1}
            className="absolute top-0 right-1 flex items-center text-gray-500 border-l border-gray-300 px-2 h-full"
          >
            {suffix}
          </div>
        )}
      </div>
      {errorText && (
        <div className="text-red-500 text-[12px] text-start font-thin">
          {errorText}
        </div>
      )}
    </div>
  );
}
