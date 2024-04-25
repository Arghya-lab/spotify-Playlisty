export default function convertLinesToArr(input: string) {
  const inputSongsArr = input.split("\n");
  return inputSongsArr.map((inpSong) => inpSong.trim()).filter(Boolean);
}
