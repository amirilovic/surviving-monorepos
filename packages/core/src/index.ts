export function leftPad(value: string, length: number, char: string = " ") {
  return `${char.repeat(length - value.length)}${value}`;
}

export function cn(...args: (string | false | undefined)[]) {
  return args.filter(Boolean).join(" ");
}
