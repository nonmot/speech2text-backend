import express from "express";
import itemRoutes from "./routes/routes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";

const app = express();
app.use(express.json());

// Allow any origins
app.use(cors());

// Health check
app.get("/", (req, res) => {
  res.status(200).send("OK");
});

// Routes
app.use("/api/v1/", itemRoutes);

// Global error handler
app.use(errorHandler);

export default app;
