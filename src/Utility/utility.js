export const makeStringCapitalize = (text) => {
  if (!text) return "";
  return text[0].toUpperCase() + text.slice(1);
};
