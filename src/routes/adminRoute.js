import { Router } from "express";
import {
  getAdminWithdraw,
  getInfoForAdmin,
  patchWithdrawStatus,
} from "../controllers/adminControllers.js";

const adminRouter = Router();

adminRouter
  .route("/admin")
  .all((req, res, next) => next())
  .get(getInfoForAdmin);

adminRouter
  .route("/admin-withdraw")
  .all((req, res, next) => next())
  .get(getAdminWithdraw)
  .patch(patchWithdrawStatus);

export default adminRouter;
