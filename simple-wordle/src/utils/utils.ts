export function wordToLetterAndIndexMap(lettersArr: string[]) {
  const map = new Map();
  lettersArr.forEach((letter, idx) => {
    const leterIdxes = map.get(letter) || [];
    leterIdxes.push(idx);
    map.set(letter, leterIdxes);
  });
  return map;
}
