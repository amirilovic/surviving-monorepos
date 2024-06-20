import express from "express";
import { logger, printMessage } from "@shop/logger";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(cors());

app.get("/_manage/info", (_req: express.Request, res: express.Response) => {
  const message = "Everything is awesome!";
  printMessage(message);
  res.status(200).send(message);
});

app.use((_req: express.Request, res: express.Response) => {
  res.status(404).send({ message: "NotFound" });
});

app.use(
  (
    error: Error,
    _req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: express.NextFunction,
  ) => {
    logger.error({ err: error }, "Internal Server Error");
    res.status(500).send({ message: "InternalServerError" });
  },
);

export { app };
