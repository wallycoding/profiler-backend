import { Router } from "express";

import auth from "./user/auth";
import staticFiles from "./user/static";

const router = Router();

router.use(staticFiles);
router.use(auth);

export default router;
