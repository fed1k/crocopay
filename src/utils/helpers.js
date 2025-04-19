export function maskCardNumber(value) {
  // Strip all non-digit characters and limit to 16 digits
  const digits = value.replace(/\D/g, "").slice(0, 16);

  // Format in groups of 4 digits
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function maskPhoneNumber(value) {
  // Strip all non-digit characters and limit to 11 digits
  const digits = value.replace(/\D/g, "").slice(0, 11); // Remove non-digit chars, limit to 11 digits

  // Apply the mask based on the number of digits entered
  if (digits.length === 0) {
    return "+7 ";
  }
  if (digits.length <= 1) {
    return "+7 (" + digits;
  }
  if (digits.length <= 4) {
    return "+7 (" + digits.slice(1, 4) + ")";
  }
  if (digits.length <= 7) {
    return "+7 (" + digits.slice(1, 4) + ") " + digits.slice(4, 7);
  }
  if (digits.length <= 9) {
    return (
      "+7 (" +
      digits.slice(1, 4) +
      ") " +
      digits.slice(4, 7) +
      "-" +
      digits.slice(7, 9)
    );
  }
  return (
    "+7 (" +
    digits.slice(1, 4) +
    ") " +
    digits.slice(4, 7) +
    "-" +
    digits.slice(7, 9) +
    "-" +
    digits.slice(9, 11)
  );
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

