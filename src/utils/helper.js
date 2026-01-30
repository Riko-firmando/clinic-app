export function getInitialName(name) {
  if (!name) return "";

  const parts = name.trim().split(" ").filter(Boolean);

  const initials = parts.map((part) => part[0].toUpperCase());

  if (initials.length > 2) {
    return `${initials[0]}${initials[initials.length - 1]}`;
  }

  return initials.join("");
}

export function formatDateLocal(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
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
