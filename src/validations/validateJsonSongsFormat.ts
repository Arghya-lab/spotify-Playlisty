export default function validateJsonSongsFormat(data: string) {
  try {
    const inputSongsArr = JSON.parse(data);
    if (!Array.isArray(inputSongsArr)) return false;
    // Check each item in the array
    for (const item of inputSongsArr) {
      if (typeof item !== "string") {
        return false;
      } // Ensure each item is a string
      if (item.length > 80) {
        return false;
      } // Ensure the length of each string is not more than 80 characters
    }

    return true;
  } catch {
    return false;
  }
}
