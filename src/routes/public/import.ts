import { Router } from "express";
import { importer } from "../../controllers/Importer";
import MethodNotAllowed from "../../middlewares/MethodNotAllowed";

const router = Router();

router.route("/import")
    .post(importer)
	.all(MethodNotAllowed);

export default router;