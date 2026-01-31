import clsx from "clsx";

const Button = ({
  type,
  children,
  onClick,
  disabled,
  secondary,
  className = "",
}) => {
  const btnStyle = clsx(
    "disabled:text-grey-500 disabled:bg-[#DFE1E1] disabled:border-[#DFE1E1] min-w-[120px] text-[14px] font-semibold border border-[#1D9D86] py-2 px-4 rounded-lg transition duration-200 ease-in-out disabled:cursor-not-allowed",
    secondary
      ? "bg-[#EEFBF8] text-[#1D9D86] border-[#1D9D86]"
      : "bg-[#1D9D86] text-white",
    className,
  );

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={btnStyle}
    >
      {children}
    </button>
  );
};

export default Button;
