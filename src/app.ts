import "express-async-errors";
import express from "express";
import { handleError } from "./errors/handleError";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use(handleError);

export default app;
