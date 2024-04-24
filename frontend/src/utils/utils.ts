export const capitalizeFirstChar = (str: string) => {
  return str.charAt(0).toUpperCase() + str.substring(1);
};

export function getRandomStringFromArray(stringArray: string[]) {
  if (stringArray.length === 0) {
    throw new Error("You must provide an array of strings");
  }
  const randomIndex = Math.floor(Math.random() * stringArray.length);
  return stringArray[randomIndex];
}
