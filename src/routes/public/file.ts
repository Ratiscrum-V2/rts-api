import { Router } from "express";
import { getFile } from "../../controllers/File";
import { LoadFileMetadata } from "../../middlewares/loaders/FileMetadataLoader";
import MethodNotAllowed from "../../middlewares/MethodNotAllowed";

const router = Router();

router.route("/files/:fileId")
	.all(LoadFileMetadata)
	.get(getFile)
	.all(MethodNotAllowed);

export default router;