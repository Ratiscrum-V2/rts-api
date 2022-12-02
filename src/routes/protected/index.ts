import { Router } from "express";
import userRouter from "./user";
import fileRouter from "./file";
import questionRouter from "./question";
import commentRouter from "./comment";
import choiceRouter from "./choice";

const router = Router();

router.use(userRouter);
router.use(fileRouter);
router.use(questionRouter);
router.use(commentRouter);
router.use(choiceRouter);

export default router;