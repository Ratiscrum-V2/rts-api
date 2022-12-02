import { Router } from "express";
import { getQuestion, getRandomQuestion } from "../../controllers/Question";
import { LoadQuestion } from "../../middlewares/loaders/QuestionLoader";
import MethodNotAllowed from "../../middlewares/MethodNotAllowed";

const router = Router();

router.route("/question/:questionId")
    .all(LoadQuestion)
    .get(getQuestion)
    .all(MethodNotAllowed);

router.route("/question/random")
    .get(getRandomQuestion)
    .all(MethodNotAllowed);


export default router;