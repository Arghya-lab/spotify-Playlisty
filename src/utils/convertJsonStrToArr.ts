export default function convertJsonStrToArr(input: string) {
  const inputSongsArr = JSON.parse(input);
  return inputSongsArr.map((inpSong: string) => inpSong.trim()).filter(Boolean);
}
