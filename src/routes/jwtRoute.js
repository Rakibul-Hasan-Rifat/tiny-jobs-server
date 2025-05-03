import { Router } from "express";
import jwtController from "../controllers/jwtController.js";
import verifyToken from "../middlewares/verifyToken.js";

const jwtRouter = Router();

jwtRouter
  .route("/jwt")
  .all((req, res, next) => next())
  .post(jwtController);

export default jwtRouter;
