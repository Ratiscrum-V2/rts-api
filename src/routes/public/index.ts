import { Router } from "express";
import userRouter from "./user";
import fileRouter from "./file";
import importerRouter from "./import"

const router = Router();

router.use(userRouter);
router.use(fileRouter);
router.use(importerRouter);

export default router;