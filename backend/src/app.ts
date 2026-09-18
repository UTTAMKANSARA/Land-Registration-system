import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config';
import { requestLogger } from './middleware/logger';
import { notFoundHandler } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';

const app: Express = express();

// Security Middleware
app.use(helmet());

// CORS Middleware
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  }),
);

// Body Parsers & Request Size Limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging Middleware
app.use(requestLogger);

// API v1 Routes Mount Point
app.use('/api/v1', routes);

// 404 Not Found Middleware
app.use(notFoundHandler);

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
