import { Router } from "express";
import { loginController, refreshController,updateProfileController } from "./auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

router.post("/login", loginController);
router.post("/refresh", refreshController);
router.patch("/update-profile", authMiddleware, roleMiddleware(["USER", "ORGANIZER", "ADMIN"]), updateProfileController);


export default router;