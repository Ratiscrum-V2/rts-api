import { Router } from "express";
import { uploadFile } from "../../controllers/File";
import MethodNotAllowed from "../../middlewares/MethodNotAllowed";

const router = Router();

router.route("/files") 
	.post(uploadFile)
	.all(MethodNotAllowed);

export default router;