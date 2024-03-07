import { Router } from "express";
import { AuthenticateWithGoogleOAuth, createNewAccountController,  } from "../controllers/user.controller.js";
import { signupValidation } from "../middlewares/authDataValidation.middleware.js";

const router = Router();

router.route("/signup").post(signupValidation,createNewAccountController);

router.route("/oauth/google").get(AuthenticateWithGoogleOAuth);


export default router;