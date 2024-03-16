import { Request, Router } from "express";
import { signupValidation,signinValidation, changePasswordValidation } from "../middlewares/authDataValidation.middleware.js";
import {verifyJWT} from '../middlewares/verifyJWT.middleware.js';
import authenticationControllers from "../controllers/user.controller.js";
const router = Router();

//~ --------- PUBLIC ROUTES ---------
router.route("/signup").post(signupValidation,authenticationControllers.createNewAccountController);
router.route("/signin").post(signinValidation,authenticationControllers.loginExistingUserController);
router.route("/oauth/google").get(authenticationControllers.AuthenticateWithGoogleOAuth);
router.route("/refresh-access-token").get(authenticationControllers.refreshAccessToken)

//~ --------- PRIVATE ROUTES ---------
router.route("/signout").get(verifyJWT,authenticationControllers.logout)
router.route("/change-password").post([verifyJWT,changePasswordValidation],authenticationControllers.changeCurrentPassword)
router.route("/getuser").get(verifyJWT,authenticationControllers.getCurrentUser)

//~ ------- TEST ---------
router.route("/test").get(verifyJWT,(req,res)=>{
    const data = req?.user;
    res.json({
        data
    })
})
export default router;