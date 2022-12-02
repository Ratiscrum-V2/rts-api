import { Router } from "express";
import userRouter from "./user";
import fileRouter from "./file";
import questionRouter from "./question";

const router = Router();

router.use(userRouter);
router.use(fileRouter);
router.use(questionRouter);

export default router;