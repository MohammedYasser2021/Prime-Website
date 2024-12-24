export const convertNumbersToArabicNumerals = (numbers?: number) => {
  // Check if numbers is undefined or not a valid number
  if (numbers === undefined || isNaN(numbers) || !Number.isFinite(numbers)) {
    return "Invalid input";
  }

  // Convert the number to a string
  const daysString = numbers.toString();

  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

  // Map each digit to its Arabic numeral equivalent
  const result = Array.from(daysString, (char) => {
    if (char === ".") {
      return ","; // Keep the decimal comma as is
    }
    const digit = parseInt(char);
    return isNaN(digit) ? char : arabicNumerals[digit];
  }).join("");

  return result;
};
