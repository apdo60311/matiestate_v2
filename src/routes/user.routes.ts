import express from "express";
import * as UserController from "../controllers/user.controller";
import { createUserSelectorMiddleware as auth} from "../middlewares/auth";

const router = express.Router();

// No auth
router.post("/send_sms", UserController.sendSmsController);
router.post("/verify_token", UserController.verifyTokenController);
router.post("/login", UserController.loginController);

// Auth
router.post("/singup",auth, UserController.singUpController);
router.post("/forget_password",auth, UserController.forgetPasswordController);

export default router;