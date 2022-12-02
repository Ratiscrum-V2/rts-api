import { Router } from "express";
import userRouter from "./user";
import fileRouter from "./file";
import questionRouter from "./question";
import commentRouter from "./comment";

const router = Router();

router.use(userRouter);
router.use(fileRouter);
router.use(questionRouter);
router.use(commentRouter);

export default router;