// Convert the first letter of a string to uppercase
export function capitalizeFirstLetter(word: string) {
  return word?.charAt(0).toUpperCase() + word?.slice(1);
}
