import { Router } from "express";
import { getItems } from '../controllers/controllers';

const router = Router();

router.get("/", getItems);

export default router;
