import pino from "pino";
import { leftPad } from "@shop/core";

const logLevel = process.env.LOG_LEVEL ?? "info";

export const logger = pino({
  level: logLevel,
});

export function printMessage(message: string) {
  for (let i = 0; i < message.length; i++) {
    console.log(leftPad(message[i], i + 1));
  }
}
