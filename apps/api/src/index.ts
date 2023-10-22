import { app } from "./app.js";
import { logger } from "@shop/logger";
import { config } from "./config.js";

async function start() {
  app.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}`);
  });
}

process.on("SIGINT", () => {
  logger.info("Interrupted");
  process.exit(0);
});

process.on("uncaughtException", (err) => {
  logger.error({ err }, "uncaughtException");
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  throw error;
});

start();
