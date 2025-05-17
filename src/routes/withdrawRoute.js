import { Router } from "express";
import { getWithdraw, postWithdraw } from "../controllers/withdrawControllers.js";
import verifyToken from "../middlewares/verifyToken.js";

const withdrawRouter = Router();

withdrawRouter
  .route("/withdraws")
  .all(verifyToken)
  .get(getWithdraw)
  .post(postWithdraw);

export default withdrawRouter;
