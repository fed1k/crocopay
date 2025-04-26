import * as cheerio from 'cheerio';
export function maskCardNumber(value) {
  // Strip all non-digit characters and limit to 16 digits
  const digits = value.replace(/\D/g, "").slice(0, 16);

  // Format in groups of 4 digits
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function maskPhoneNumber(value, countryCode) {
  const digits = value.replace(/\D/g, "");

  switch (countryCode) {
    case "+7": { // Russia, Kazakhstan
      const d = digits.slice(1); // exclude country code digit
      let result = "+7";
      if (d.length > 0) result += ` (${d.slice(0, 3)}`;
      if (d.length >= 4) result += `) ${d.slice(3, 6)}`;
      if (d.length >= 7) result += `-${d.slice(6, 8)}`;
      if (d.length >= 9) result += `-${d.slice(8, 10)}`;
      return result;
    }
    case "+998": { // Uzbekistan
      const d = digits.slice(3); // exclude country code digits
      let result = "+998";
      if (d.length > 0) result += ` (${d.slice(0, 2)}`;
      if (d.length >= 3) result += `) ${d.slice(2, 5)}`;
      if (d.length >= 6) result += `-${d.slice(5, 7)}`;
      if (d.length >= 8) result += `-${d.slice(7, 9)}`;
      return result;
    }
    case "+374": // Armenia
    case "+992": { // Tajikistan
      const d = digits.slice(3); // exclude country code digits
      let result = countryCode;
      if (d.length > 0) result += ` (${d.slice(0, 2)}`;
      if (d.length >= 3) result += `) ${d.slice(2, 5)}`;
      if (d.length >= 6) result += `-${d.slice(5, 7)}`;
      if (d.length >= 8) result += `-${d.slice(7, 9)}`;
      return result;
    }
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

export const requisitePercentageCalculator = (country) => {
  const data = {
    payIn: "",
    payOut: "",
  };

  const targetBanks = [
    "Сбербанк",
    "Тинькофф Банк",
    "Альфа-Банк",
    "ВТБ",
    "Газпромбанк",
    "Райффайзен Банк",
    "Росбанк",
    "Банк Открытие",
    "МТС Банк",
    "Почта Банк",
    "Совкомбанк",
    "ЮниКредит Банк",
    "Промсвязьбанк",
    "Росгосстрах Банк",
    "Генбанк",
    "Челябинвест",
    "Банк Солидарность",
    "АБ Россия",
    "Озон банк",
    "Яндекс банк",
    "Kaspi Bank (Казахстан)",
    "Halyk Bank (Казахстан)",
  ];

  const azeb = ["Kapital Bank (Азербайджан)", "PASHA Bank (Азербайджан)", "AMERIA Bank (Армения)", "Ararat Bank (Армения)"];
  const gruz = ["Bank of Georgia (Грузия)", "TBC Bank (Грузия)"];
  const kryg = ["Optima Bank (Кыргызстан)", "KICB (Кыргызстан)"];
  const tj = [
    "ИТБ (Таджикистан)",
    "Амонатбанк (Таджикистан)",
    "Агроинвестбанк (Таджикистан)",
    "ориент банк (Таджикистан)",
    "Душанбе (Таджикистан)",
    "Алиф банк (Таджикистан)",
    "Тавхидбанк (Таджикистан)",
    "Эсхата (Таджикистан)",
    "Спитамен (Таджикистан)",
  ];

  const uz = [
    "Узнацбанк (Узбекистан)",
    "Узпромстройбанк (Узбекистан)",
    "Народный банк (Узбекистан)",
    "Капиталбанк (Узбекистан)",
    "Асакабанк (Узбекистан)",
  ];

  if (targetBanks.includes(country)) {
    data.payIn = "8.5%";
    data.payOut = "3.5%";
  } else if (azeb.includes(country)) {
    data.payIn = "4%";
    data.payOut = "1.5%";
  } else if (gruz.includes(country)) {
    data.payIn = "3%";
    data.payOut = "1%";
  } else if (kryg.includes(country)) {
    data.payIn = "7%";
    data.payOut = "2.5%";
  } else if (tj.includes(country)) {
    data.payIn = "6.5%";
    data.payOut = "2%";
  } else if (uz.includes(country)) {
    data.payIn = "7%";
    data.payOut = "2.5%";
  }

  return data;
};


export async function scrapePrice() {
  try {
    const res = await fetch('https://ru.investing.com/crypto/tether/usdt-rub', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      cache: 'no-store',
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    const raw = $('div[data-test="instrument-price-last"]').text().trim();
    return parseFloat(raw.replace(',', '.'));
  } catch {
    return null;
  }
}

