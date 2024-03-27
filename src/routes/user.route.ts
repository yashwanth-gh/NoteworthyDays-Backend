import { Request, Router } from "express";
import { signupValidation,emailValidation, changePasswordValidation } from "../middlewares/authDataValidation.middleware.js";
import {verifyJWT} from '../middlewares/verifyJWT.middleware.js';
import authenticationControllers from "../controllers/user.controller.js";

const router = Router();

//~ --------- PUBLIC ROUTES ---------
router.route("/signup").post(signupValidation,authenticationControllers.createNewAccountController);
router.route("/signin").post(emailValidation,authenticationControllers.loginExistingUserController);
router.route("/oauth/google").get(authenticationControllers.AuthenticateWithGoogleOAuth);
router.route("/refresh-access-token").get(authenticationControllers.refreshAccessToken)
router.route("/send-otp-to-mail").post(emailValidation,authenticationControllers.sendOtpToMail)
router.route("/verify-otp").post(authenticationControllers.verifyOTP)
router.route("/forgot-password").post(authenticationControllers.sendMailToResetPassword)


//~ --------- PRIVATE ROUTES ---------
router.route("/signout").get(verifyJWT,authenticationControllers.logout)
router.route("/change-password").post([verifyJWT,changePasswordValidation],authenticationControllers.changeCurrentPassword)
router.route("/getuser").get(verifyJWT,authenticationControllers.getCurrentUser)
router.route("/get-google-userprofile").get(verifyJWT,authenticationControllers.getGoogleUser)
router.route("/change-fullname").patch(verifyJWT,authenticationControllers.changeUserFullname)
router.route("/delete-account").delete(verifyJWT,authenticationControllers.deleteUserAccount)

export default router;