import express from "express";
import UserController from "./controller";

const UserRouter = express.Router();

UserRouter.get("/", UserController.getUnCheckedUsers);
UserRouter.post("/:id/view", UserController.markAsViewed);

export default UserRouter;
