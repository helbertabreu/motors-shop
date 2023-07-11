import "express-async-errors";
import express from "express";
import { handleError } from "./errors/handleError";
import cors from "cors";
import { userRoutes } from "./routes/users.routes";
import { sessionRoutes } from "./routes/sessions.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/session", sessionRoutes);
app.use("/users", userRoutes);

app.use(handleError);

export default app;
