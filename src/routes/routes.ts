import { Router } from "express";
import {
  recognizeAudio,
  keywordSearch,
  listModels,
} from "../controllers/controllers";
import upload from "../middlewares/multerConfig";

const router = Router();

router.post("/recognize", upload.single("file"), recognizeAudio);
router.post("/search", keywordSearch);
router.get("/models", listModels);

export default router;
