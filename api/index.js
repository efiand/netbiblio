import express from "express";
import { assetsMiddleware, kitMiddleware } from "../build/middlewares.js";

const app = express();
app.use(assetsMiddleware);
app.use(kitMiddleware);

export default app;
