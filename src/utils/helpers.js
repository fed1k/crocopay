export function maskCardNumber(value) {
  // Strip all non-digit characters and limit to 16 digits
  const digits = value.replace(/\D/g, "").slice(0, 16);

  // Format in groups of 4 digits
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function maskPhoneNumber(value, countryCode) {
  const digits = value.replace(/\D/g, "");

  switch (countryCode) {
    case "+7": // Russia, Kazakhstan
      return `+7 (${digits.slice(1, 4)}${
        digits.length > 3 ? ") " : ""
      }${digits.slice(4, 7)}${digits.length > 6 ? "-" : ""}${digits.slice(
        7,
        9
      )}${digits.length > 8 ? "-" : ""}${digits.slice(9, 11)}`;
    case "+998": // Uzbekistan
      return `+998 (${digits.slice(3, 5)}${
        digits.length > 4 ? ") " : ""
      }${digits.slice(5, 8)}${digits.length > 7 ? "-" : ""}${digits.slice(
        8,
        10
      )}${digits.length > 9 ? "-" : ""}${digits.slice(10, 12)}`;
    case "+374": // Armenia
      return `+374 (${digits.slice(3, 5)}${
        digits.length > 4 ? ") " : ""
      }${digits.slice(5, 8)}${digits.length > 7 ? "-" : ""}${digits.slice(
        8,
        10
      )}${digits.length > 9 ? "-" : ""}${digits.slice(10, 12)}`;
    case "+992": // Tajikistan
      return `+992 (${digits.slice(3, 5)}${
        digits.length > 4 ? ") " : ""
      }${digits.slice(5, 8)}${digits.length > 7 ? "-" : ""}${digits.slice(
        8,
        10
      )}${digits.length > 9 ? "-" : ""}${digits.slice(10, 12)}`;
    // Add more countries as needed
    default:
      return value; // fallback, no mask
  }
}

// Converts string (like a Firebase doc ID) to a numeric hash
function stringToNumber(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // Basic hash: use character codes
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

// Format a number in thousands (e.g., 2500 → '2.5K')
function formatThousands(num) {
  if (num >= 1_000_000) return Math.round((num / 1_000_000).toFixed(1));
  if (num >= 1_000) return Math.round((num / 1_000).toFixed(1));
  return num.toString();
}

// Full utility: doc ID → numeric hash → readable format
export function docIdToReadableNumber(docId) {
  const numericHash = stringToNumber(docId);
  return formatThousands(numericHash);
}
