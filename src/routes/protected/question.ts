import { Router } from "express";
import { createQuestion, deleteQuestion, getQuestion, updateQuestion } from "../../controllers/Question";
import { LoadQuestion } from "../../middlewares/loaders/QuestionLoader";
import MethodNotAllowed from "../../middlewares/MethodNotAllowed";

const router = Router();

router.route("/question")
    .post(createQuestion)
	.all(MethodNotAllowed);

router.route("/question/:questionId") 
    .all(LoadQuestion)
    .get(getQuestion)
    .put(updateQuestion)
    .delete(deleteQuestion)
    .all(MethodNotAllowed);

export default router;