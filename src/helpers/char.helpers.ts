const _0 = "0".charCodeAt(0);
const _9 = "9".charCodeAt(0);

const a = "a".charCodeAt(0);
const z = "z".charCodeAt(0);

const A = "A".charCodeAt(0);
const Z = "Z".charCodeAt(0);

const _ = "_".charCodeAt(0);

export function isLetter(character: string): boolean {
  const char = character.charCodeAt(0);
  return (a <= char && z >= char) || (A <= char && Z >= char) || char === _;
}

export function isNumber(character: string): boolean {
  const char = character.charCodeAt(0);
  return _0 <= char && _9 >= char;
}
