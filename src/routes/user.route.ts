import { Router } from "express";
import { AuthenticateWithGoogleOAuth, createNewAccountController, loginExistingUserController,  } from "../controllers/user.controller.js";
import { signupValidation,signinValidation } from "../middlewares/authDataValidation.middleware.js";

const router = Router();

router.route("/signup").post(signupValidation,createNewAccountController);
router.route("/signin").post(signinValidation,loginExistingUserController);

router.route("/oauth/google").get(AuthenticateWithGoogleOAuth);


export default router;