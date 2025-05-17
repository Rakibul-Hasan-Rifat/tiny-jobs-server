import { Router } from "express";
import { getUserInfo } from "../controllers/roleController.js";

const roleRouter = Router();

roleRouter
  .route("/role/:email")
  .all((req, res, next) => next())
  .get(getUserInfo);

export default roleRouter;
