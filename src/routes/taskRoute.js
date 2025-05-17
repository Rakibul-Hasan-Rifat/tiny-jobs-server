import { Router } from "express";
import {
  deleteSingleTask,
  deleteTask,
  getSingleTask,
  getTasksForAdmin,
  getTasksForBuyer,
  getTasksForWorker,
  postTask,
} from "../controllers/taskControllers.js";
import verifyToken from "../middlewares/verifyToken.js";

const taskRouterWorker = Router();
const taskRouterBuyer = Router();
const taskRouterAdmin = Router();
const singleTaskRouter = Router();

taskRouterWorker
  .route("/worker/tasks")
  .all((req, res, next) => next())
  .get(getTasksForWorker);

taskRouterBuyer
  .route("/buyer/tasks")
  .all(verifyToken)
  .get(getTasksForBuyer)
  .post(postTask);

taskRouterAdmin
  .route("/admin/tasks")
  .all((req, res, next) => next())
  .get(getTasksForAdmin)
  .post(postTask)
  .delete(deleteTask)

singleTaskRouter
  .route("/tasks/:taskId")
  .all((req, res, next) => next())
  .get(getSingleTask)
  .delete(deleteSingleTask);

export { taskRouterWorker, taskRouterBuyer, taskRouterAdmin, singleTaskRouter };
