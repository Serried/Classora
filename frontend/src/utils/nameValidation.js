/**
 * \u0E00-\u0E7F
 */
const THAI_REGEX = /^[\u0E00-\u0E7F\s]+$/;

/**
 * ตัวอักษร, ช่องว่าง, "-", "'", ","
 */
const ENGLISH_REGEX = /^[a-zA-Z\s\-'.]+$/;

export const isValidThaiName = (str) => {
  const s = (str || '').trim();
  return s.length > 0 && THAI_REGEX.test(s);
};

export const isValidEnglishName = (str) => {
  const s = (str || '').trim();
  return s.length > 0 && ENGLISH_REGEX.test(s);
};
