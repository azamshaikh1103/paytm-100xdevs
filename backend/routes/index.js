import express from "express";
import userRouter from "./userRoutes.js";
import accRouter from "./account.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accRouter);

export default router;
