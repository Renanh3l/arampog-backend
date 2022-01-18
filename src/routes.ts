import { Router } from "express";

import UserController from "./app/controllers/UserController";

const router = Router();

router.get("/users", UserController.index);
router.post("/users", UserController.store);

router.get("/queue", UserController.listQueue);

export default router;
