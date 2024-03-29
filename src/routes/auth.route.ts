import {Router } from "express";
import { signupValidation,emailValidation, changePasswordValidation, passwordValidation } from "../middlewares/authDataValidation.middleware.js";
import {verifyJWT} from '../middlewares/verifyJWT.middleware.js';
import authenticationControllers from "../controllers/auth.controller.js";

const authRouter = Router();

//~ --------- ADMIN PUBLIC ROUTES ---------
authRouter.route("/admin/register").post(signupValidation,authenticationControllers.createNewAdminAccount);

//~ --------- USER PUBLIC ROUTES ---------
authRouter.route("/signup").post(signupValidation,authenticationControllers.createNewUserAccount);
authRouter.route("/signin").post(emailValidation,authenticationControllers.loginExistingUserController);
authRouter.route("/oauth/google").get(authenticationControllers.AuthenticateWithGoogleOAuth);
authRouter.route("/refresh-access-token").get(authenticationControllers.refreshAccessToken)
authRouter.route("/send-otp-to-mail").post(emailValidation,authenticationControllers.sendOtpToMail)
authRouter.route("/verify-otp").post(authenticationControllers.verifyOTP)
authRouter.route("/forgot-password").post(authenticationControllers.sendMailToResetPassword)
authRouter.route("/forgot-reset-password").post(passwordValidation,authenticationControllers.resetPasswordWithToken)


//~ --------- PRIVATE ROUTES ---------
authRouter.route("/signout").get(verifyJWT,authenticationControllers.logout)
authRouter.route("/getuser").get(verifyJWT,authenticationControllers.getCurrentUser)
authRouter.route("/get-google-userprofile").get(verifyJWT,authenticationControllers.getGoogleUser)

export default authRouter;