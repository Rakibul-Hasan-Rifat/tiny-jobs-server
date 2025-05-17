import cors from "cors";
import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import jwtRouter from "./routes/jwtRoute.js";
import userRouter from "./routes/userRoute.js";
import roleRouter from "./routes/roleRoute.js";
import logoutRouter from "./routes/logoutRoute.js";
import { client } from "./mongodb/mongdb.config.js";
import submissionRouter from "./routes/submissionRoutes.js";
import { singleTaskRouter, taskRouterAdmin, taskRouterBuyer, taskRouterWorker } from "./routes/taskRoute.js";
import withdrawRouter from "./routes/withdrawRoute.js";
import adminRouter from "./routes/adminRoute.js";


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
app.use(userRouter);
app.use(roleRouter);
app.use(logoutRouter);
app.use(withdrawRouter);
app.use(taskRouterBuyer);
app.use(taskRouterAdmin);
app.use(taskRouterWorker);
app.use(singleTaskRouter);
app.use(submissionRouter);
app.use(adminRouter);

app.get("/", (req, res) => {
console.log('cookies from home', req.cookies);
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
