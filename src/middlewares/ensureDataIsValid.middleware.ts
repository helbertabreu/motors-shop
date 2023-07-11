import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import { AppError } from "../errors/appError";

export const ensureDataIsValidMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const validatedData = await schema
      .validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      })
      .catch((err) => {
        throw new AppError(err.errors, 400);
      });

    req.body = validatedData;

    return next();
  };
