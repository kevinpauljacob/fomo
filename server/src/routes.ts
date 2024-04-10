import { Router } from "express";
import { addNFTData, getNFTData } from "./controllers/nfts.controller";
import { createEvent, getAllEvents } from "./controllers/event.controller";
import { register, login } from "./controllers/user.controller";
import { authenticateToken } from "./middlewares/auth.middleware";

const router = Router();

router.post("/api/auth/register", register);
router.post("/api/auth/login", login);

router.get("/api/nfts", authenticateToken, getNFTData);
router.post("/api/nfts", authenticateToken, addNFTData);
router.get("/api/events", authenticateToken, getAllEvents);
router.post("/api/events/create", authenticateToken, createEvent);

export default router;
