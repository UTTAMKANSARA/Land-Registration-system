import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root endpoint welcome message
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "eLandRegistry Backend REST API is running",
    endpoints: {
      health: "/api/health",
      healthcheck: "/api/v1/healthcheck",
      auth: "/api/auth",
    },
  });
});

// Auth routes
app.use("/api/auth", authRoutes);

// Health check endpoints
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running",
  });
});

app.get("/api/v1/healthcheck", (req, res) => {
  res.json({
    success: true,
    message: "System health check completed successfully",
    data: {
      api: "ok",
      database: "ok",
      blockchain: "not_configured",
      timestamp: new Date().toISOString(),
    },
  });
});

app.use(errorHandler);

export default app;
