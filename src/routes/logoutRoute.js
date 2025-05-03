import { Router } from "express";
import logoutController from "../controllers/logoutController.js";

const logoutRouter = Router();

logoutRouter
  .route("/logout")
  .all((req, res, next) => next())
  .post(logoutController);

export default logoutRouter;
