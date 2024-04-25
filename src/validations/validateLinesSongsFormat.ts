export default function validateLinesSongsFormat(inp: string) {
  const inputSongsArr = inp.split("\n");

  for (const item of inputSongsArr) {
    if (typeof item !== "string") {
      return false;
    } // Ensure each item is a string
    if (item.length > 80) {
      return false;
    } // Ensure the length of each string is not more than 80 characters
  }
  return true;
}
