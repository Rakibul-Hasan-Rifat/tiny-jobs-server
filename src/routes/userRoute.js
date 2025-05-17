import { Router } from "express";
import { deleteUser, getUsers, postUser, putUser } from "../controllers/userControllers.js";

const userRouter = Router();

userRouter
  .route("/users")
  .all((req, res, next) => next())
  .get(getUsers)
  .post(postUser)
  .put(putUser)
  .delete(deleteUser);

export default userRouter;
