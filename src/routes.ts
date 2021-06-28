import { Router } from "express";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ListUserSenderComplimentsController } from "./controllers/ListUserSenderComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";

import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSenderComplimentsController = new ListUserSenderComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();

router.post("/users", createUserController.handle);
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post("/auth", authenticateUserController.handle);
router.post("/compliments", ensureAuthenticated, createComplimentController.handle)
router.get("/users/compliments/send", ensureAuthenticated, listUserSenderComplimentsController.handle)
router.get("/users/compliments/received", ensureAuthenticated, createComplimentController.handle)

export { router };
