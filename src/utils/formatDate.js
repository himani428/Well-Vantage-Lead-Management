// Consistent, human-friendly date for the UI: "26 July 2025"
export function formatDate(dateInput) {
  if (!dateInput) return "";

  // Accept Date, ISO string, or already-formatted strings
  const d = new Date(dateInput);
  if (!isNaN(d.getTime())) {
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  // Fallback: try parsing the string (e.g., "26/07/2025")
  const parsed = Date.parse(dateInput);
  if (!Number.isNaN(parsed)) {
    return new Date(parsed).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  // If all else fails, return as-is to avoid data loss
  return String(dateInput);
}

// Ensure a value is stored as ISO "YYYY-MM-DD" (for <input type="date">)
export function toISODate(value) {
  if (!value) return "";
  // If it's already YYYY-MM-DD, keep it
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const d = new Date(value);
  if (isNaN(d.getTime())) return "";

  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}
