import { Router } from "express";
import { getUserRole } from "../controllers/roleController.js";

const roleRouter = Router();

roleRouter
  .route("/role/:email")
  .all((req, res, next) => next())
  .get(getUserRole);

export default roleRouter;
