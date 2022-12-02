import { Router } from "express";
import userRouter from "./user";
import fileRouter from "./file";

const router = Router();

router.use(userRouter);
router.use(fileRouter);

export default router;