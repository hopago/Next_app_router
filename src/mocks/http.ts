import { createMiddleware } from "@mswjs/http-middleware";
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { handlers } from "./handlers";

const app = express();
const port = 8181;

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(createMiddleware(...handlers));
app.use(cookieParser());

app.listen(port, () => console.log(`Mock server listening on port: ${port}`));
