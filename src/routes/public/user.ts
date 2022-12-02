import { Router } from "express";
import { enableTwoFactorAuth, login, logWithToken, register, verifyTwoFactorAuth } from "../../controllers/User";
import MethodNotAllowed from "../../middlewares/MethodNotAllowed";

const router = Router();

router.route("/register")
	.post(register)
	.all(MethodNotAllowed);

router.route("/login")
	.post(login)
	.all(MethodNotAllowed);

router.route("/login/2fa")
	.post(logWithToken)
	.all(MethodNotAllowed);

router.route("/user/enable2FA")
	.post(enableTwoFactorAuth)
	.all(MethodNotAllowed);

router.route("/user/verify2FA")
	.post(verifyTwoFactorAuth)
	.all(MethodNotAllowed);

export default router;