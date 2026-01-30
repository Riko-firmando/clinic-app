import { toString } from "lodash";

export const paginate = (data, currentPage, itemsPerPage) => {
  let indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  if (indexOfLastItem > data?.length) {
    indexOfLastItem = data?.length;
  }

  return { indexOfFirstItem, indexOfLastItem, currentItems, totalPages };
};

export function generateRequestId() {
  const now = new Date();

  // Get current date parts
  const day = String(now.getDate()).padStart(2, "0"); // dd
  const month = String(now.getMonth() + 1).padStart(2, "0"); // mm (months are 0-based)
  const year = now.getFullYear(); // yyyy

  // Get epoch time (seconds)
  const epochTime = Math.floor(now.getTime() / 1000);

  // Concatenate the final string
  return `W${day}${month}${year}${epochTime}`;
}

export const formatNumber = (value, separator = ".") => {
  if (value == null) return "";

  const valueStr = String(value);
  const isNegative = valueStr.trim().startsWith("-");
  const digitsOnly = valueStr.replace(/\D/g, "");

  if (!digitsOnly) return isNegative ? "-" : "";

  const formatted = digitsOnly.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return isNegative ? `-${formatted}` : formatted;
};

export const removeDots = (value) => {
  return value.replace(/\./g, "");
};

export const days = Array.from({ length: 31 }, (_, i) => ({
  value: i + 1,
  label: i + 1,
}));

export const hours = Array.from({ length: 24 }, (_, i) => {
  const hour = String(i).padStart(2, "0");
  return {
    value: Number(hour),
    label: `${hour}.00`,
  };
});

export const formattedDate = (
  data,
  withoutDay = false,
  locale = "in-ID",
  month = "long",
  time = false,
  hour12 = false,
) => {
  const date = new Date(data);
  const formatted = date.toLocaleDateString(locale, {
    timeZone: "Asia/Jakarta",
    ...(!withoutDay && { day: "2-digit" }),
    month,
    year: "numeric",
  });
  if (!time) return formatted;
  const formattedTime = date.toLocaleTimeString(locale, {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    hour12,
  });

  return `${formatted} | ${formattedTime}`;
};

export default function TimeDisplay(isoString) {
  const date = new Date(isoString);
  const time = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta", // 🕒 WIB
  });

  return time;
}

export const handleDigitOnlyChange = (maxLength) => (e) => {
  const value = e.target.value.replace(/\D/g, "").slice(0, maxLength);
  e.target.value = value;
  handleChange(e);
};

export function getInitialName(name) {
  if (!name) return "";

  const parts = name.trim().split(" ").filter(Boolean);

  const initials = parts.map((part) => part[0].toUpperCase());

  if (initials.length > 2) {
    return `${initials[0]}${initials[initials.length - 1]}`;
  }

  return initials.join("");
}

export const removeRupiahPrefix = (value) => {
  if (!value) return "";
  return value.replace(/rp\.?\s*/i, ""); // hapus "Rp", "Rp.", atau "rp " di awal
};

export const parseRupiahToNumber = (value) => {
  if (!value) return 0;
  // hapus semua karakter non-digit
  const numeric = value.toString().replace(/\D/g, "");
  return parseInt(numeric, 10) || 0;
};

export const createOptions = (items, labelKey = "name", valueKey = "id") =>
  items.map((item) => ({ label: item[labelKey], value: item[valueKey] }));

export function formatMonthYear(dateString) {
  if (!dateString) return "";

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const date = new Date(dateString);
  if (isNaN(date)) return ""; // invalid date guard

  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${monthName} ${year}`;
}
