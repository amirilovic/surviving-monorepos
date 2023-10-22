export function leftPad(value: string, length: number, char: string = " ") {
  return `${char.repeat(length - value.length)}${value}`;
}
