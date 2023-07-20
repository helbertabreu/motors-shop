import { Request, Response } from "express";
import { sessionService } from "../services/session/session.service";

export const sessionController = async (req: Request, res: Response) => {
  const sessionData = req.body;
  const token = await sessionService(sessionData);

  return res.status(200).json({ token });
};
