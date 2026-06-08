import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.ts";

const port = process.env.PORT;

const app = express();

app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log("Server running on port: ", port);
});
