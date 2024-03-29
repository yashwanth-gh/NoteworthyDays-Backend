import { Request, Response, Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";
import adminController from "../controllers/admin.controller.js";

const adminRouter = Router();


//~ -------- ALL REQUEST HERE SHOULD BE USE 'verifyJWT' AND 'verifyAdmin' MIDDLEWARE --------

adminRouter.route("/view-pending-admin-requests").get([verifyJWT, verifyAdmin], adminController.viewAllPendingAdminRequests)
adminRouter.route("/approve-admin-request").post([verifyJWT, verifyAdmin], adminController.approvePendingAdminRequest)

export default adminRouter;