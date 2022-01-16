import { Router } from "express";

import authMiddleware from "./app/middlewares/authMiddleware";

import UserController from "./app/controllers/UserController";
import AuthController from "./app/controllers/AuthController";

import EnterQueueUseCase from "./app/useCases/EnterQueue/EnterQueueUseCase";

const router = Router();

router.get("/users", authMiddleware, UserController.index);
router.post("/users", UserController.store);

router.post("/auth", AuthController.authenticate);

router.get("/queue", authMiddleware, UserController.listQueue);
router.post("/queue", authMiddleware, EnterQueueUseCase.execute);

export default router;
