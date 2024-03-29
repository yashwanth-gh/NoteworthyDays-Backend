import { Router } from "express";
import { changePasswordValidation } from "../middlewares/authDataValidation.middleware.js";
import {verifyJWT} from '../middlewares/verifyJWT.middleware.js';
import userControllers from "../controllers/user.controller.js";


const userRouter = Router();

//~ --------- PRIVATE ROUTES ---------
userRouter.route("/change-password").post([verifyJWT,changePasswordValidation],userControllers.changeCurrentPassword)
userRouter.route("/change-fullname").patch(verifyJWT,userControllers.changeUserFullname)
userRouter.route("/delete-account").delete(verifyJWT,userControllers.deleteUserAccount)

export default userRouter;