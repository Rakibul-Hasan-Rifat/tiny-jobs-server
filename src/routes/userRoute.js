import { Router } from "express";
import { postUser } from "../controllers/userControllers.js";

const userRouter = Router();

userRouter
  .route("/users")
  .all((req, res, next) => next())
  .post(postUser);

export default userRouter;
