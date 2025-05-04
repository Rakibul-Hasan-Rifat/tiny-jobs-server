import cors from "cors";
import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import jwtRouter from "./routes/jwtRoute.js";
import { client } from "./mongodb/mongdb.config.js";
import logoutRouter from "./routes/logoutRoute.js";
import userRouter from "./routes/userRoute.js";

configDotenv();

const app = express();
const port = process.env.PORT || 4321;

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);
app.use(cookieParser())
app.use(express.json());

app.use(jwtRouter);
app.use(logoutRouter);
app.use(userRouter)

app.get("/", (_, res) => {
  res.send("The app is running");
});

app.listen(port, async () => {
  try {
    client.connect();
    console.log(`The app is running at http://localhost:${port}`);
  } catch (error) {
    console.log(error.message);
  }
});
