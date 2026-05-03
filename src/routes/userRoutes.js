/*import express from "express";
import {
    register,
    login,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controller/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router; */

import express from "express";

function createUserRouter(userController) {
  const router = express.Router();

  router.post("/users", userController.createUser);
  router.get("/users", userController.getUsers);

  return router;
}

export default createUserRouter;