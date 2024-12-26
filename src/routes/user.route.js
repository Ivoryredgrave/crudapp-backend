import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

const router = Router();

router.post('/login', userController.login);
router.get('/getAll', userController.getAllUsers);
router.post('/create', userController.createUser);
router.put('/update/:id', userController.updateUser);

export default router;