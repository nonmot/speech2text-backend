import { Router } from "express";
import { recognizeAudio, listModels } from "../controllers/controllers";
import upload from "../middlewares/multerConfig";

const router = Router();

router.post("/recognize", upload.single("file"), recognizeAudio);
router.get("/models", listModels);

export default router;
