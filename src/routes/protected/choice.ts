import { Router } from "express";
import { createChoice, deleteChoice, getChoice, updateChoice } from "../../controllers/Choice";
import { LoadChoice } from "../../middlewares/loaders/ChoiceLoader";
import MethodNotAllowed from "../../middlewares/MethodNotAllowed";

const router = Router();

router.route("/choice")
    .post(createChoice)
	.all(MethodNotAllowed);

router.route("/choice/:choiceId") 
    .all(LoadChoice)
    .get(getChoice)
    .put(updateChoice)
    .delete(deleteChoice)
    .all(MethodNotAllowed);

export default router;