import { Router } from "express";
import { createComment, deleteComment, getComment, updateComment } from "../../controllers/Comment";
import { LoadComment } from "../../middlewares/loaders/CommentLoader";
import MethodNotAllowed from "../../middlewares/MethodNotAllowed";

const router = Router();

router.route("/comment")
    .post(createComment)
	.all(MethodNotAllowed);

router.route("/comment/:commentId") 
    .all(LoadComment)
    .get(getComment)
    .put(updateComment)
    .delete(deleteComment)
    .all(MethodNotAllowed);

export default router;