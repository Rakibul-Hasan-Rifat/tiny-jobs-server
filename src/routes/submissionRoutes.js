import { Router } from "express";
import {
  getSubmittedTasks,
  getSubmittedTasksByBuyer,
  submitTask,
} from "../controllers/submissionControllers.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const submissionRouter = Router();

submissionRouter
  .route("/buyer/submission")
  .all(verifyToken)
  .get(getSubmittedTasksByBuyer);

submissionRouter
  .route("/submission")
  .all(verifyToken, verifyAdmin)
  .get(getSubmittedTasks)
  .post(submitTask);

export default submissionRouter;
