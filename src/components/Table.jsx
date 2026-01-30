import clsx from "clsx";
import { lowerCase } from "lodash";

const Table = ({ header, data, renderRow }) => {
  return (
    <table className="min-w-full table-auto bg-white text-sm select-text">
      <thead className="whitespace-nowrap select-none">
        <tr>
          {header.map((header, idx) => (
            <th
              className={clsx(
                "p-2  z-10 text-gray-500 text-[14px] font-semibold bg-[#EEFBF8]",
                idx === 0 && "rounded-l-lg",
                idx === header.length - 1 && "rounded-r-lg",
                lowerCase(header) === "action" ? "text-center" : "text-start",
              )}
              key={idx}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data?.map(renderRow)}</tbody>
    </table>
  );
};

export default Table;
