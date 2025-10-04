import { Router } from "express";
import { userRoute } from "./user";
import { brainRoute } from "./brain";
import { contentRoute } from "./content";

const router = Router();

router.use("/user", userRoute);
router.use("/brain", brainRoute);
router.use("/content", contentRoute);

export { router };
