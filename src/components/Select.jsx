import clsx from "clsx";

export default function Select({
  name,
  value,
  onChange,
  options,
  label,
  placeholder,
  mandatory,
}) {
  return (
    <div>
      {label && (
        <div>
          <span className="text-sm text-gray-500">{label}</span>
          {mandatory && <span className="text-red-500">*</span>}
        </div>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={clsx(
          "text-[14px] w-full bg-[#FAFAFA] disabled:text-grey-400 disabled:bg-[#EBEDEC] border border-[#FAFAFA] focus:outline-none  rounded-lg px-3 py-2",
          value ? "text-gray-600" : "text-[#B2B9B7]",
        )}
      >
        <option value="">{placeholder}</option>

        {options.map((item) => (
          <option className="text-gray-600" key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
