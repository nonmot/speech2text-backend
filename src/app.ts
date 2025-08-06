import express, { Request, Response } from "express";
import itemRoutes from './routes/routes';
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

// Routes
app.use("/api/v1/", itemRoutes);

// Health check
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

// Global error handler
app.use(errorHandler);

export default app;
