import { Router } from "express";
import MethodNotAllowed from "../../middlewares/MethodNotAllowed";

const router = Router();

router.route("/import")
	.all(MethodNotAllowed);

export default router;