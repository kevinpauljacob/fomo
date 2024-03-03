import { Router } from "express";
import { addNFTData, getNFTData } from "./controllers/nfts.controller";
import { createEvent, getAllEvents } from "./controllers/event.controller";

const router = Router();

router.get("/api/nfts", getNFTData);
router.post("/api/nfts", addNFTData);
router.get("/api/events", getAllEvents);
router.post("/api/events", createEvent);

export default router;
