import { Router } from "express";
import { AuthenticateWithGoogleOAuth, createNewAccountController,  } from "../controllers/user.controller.js";

const router = Router();

router.route("/signup").post(createNewAccountController);

router.route("/oauth/google").get(AuthenticateWithGoogleOAuth);


export default router;