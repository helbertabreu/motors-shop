import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { sessionSerializer } from "../serializers/session.serializers";
import { sessionController } from "../controllers/session.controller";

export const sessionRoutes = Router();

sessionRoutes.post(
  "",
  ensureDataIsValidMiddleware(sessionSerializer),
  sessionController
);
