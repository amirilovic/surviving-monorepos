import dotenv from "dotenv";
dotenv.config({ path: process.env.DOTENV_CONFIG_PATH ?? ".env" });

export const config = {
  port: process.env.PORT ?? 3001,
  log: {
    level: process.env.LOG_LEVEL ?? "debug",
  },
};
