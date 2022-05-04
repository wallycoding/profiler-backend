import { Router } from "express";

import auth from "./user/auth";
import profile from "./user/profile";
import staticFiles from "./user/static";

const router = Router();

router.use(staticFiles);
router.use(profile);
router.use(auth);

export default router;
