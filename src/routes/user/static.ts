import express, { Router } from "express";
const router = Router();
router.use("/images/user", express.static("./images/user"));
export default router;
